<template>
  <div class="user">
    <div class="header">
      <h1>會員管理</h1>
      <el-button icon="el-icon-plus" @click="addDialogVisible = true"
        >新增會員</el-button
      >
    </div>

    <el-scrollbar>
      <!-- 表格 -->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="id" width="130" align="center">
        </el-table-column>
        <el-table-column prop="username" label="帳號" align="center">
        </el-table-column>
        <el-table-column prop="password" label="密碼" align="center">
        </el-table-column>
        <el-table-column prop="email" label="電子信箱" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" class="btns">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row.id)"
              >編輯</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row.id)"
              >刪除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 編輯對話框 -->
      <el-dialog title="編輯會員" :visible.sync="editDialogVisible" width="70%">
        <el-form
          label-position="right"
          label-width="80px"
          ref="editForm"
          :model="editForm"
          :rules="rules"
          :before-close="handleClose"
        >
        <el-form-item label="帳號" prop="username">
            <el-input v-model="editForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input v-model="editForm.password"></el-input>
          </el-form-item>
          <el-form-item label="電子信箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUser(editForm.id)"
            >確 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 新增會員對話框 -->
      <el-dialog title="新增會員" :visible.sync="addDialogVisible" width="70%">
        <el-form
          label-position="right"
          label-width="80px"
          ref="addForm"
          :model="addForm"
          :rules="rules"
          :before-close="handleClose"
        >
          <el-form-item label="帳號" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="電子信箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNewArticle">確 定</el-button>
        </span>
      </el-dialog>
    </el-scrollbar>
  </div>
</template>

<script>
import {
  getAllUserAPI,
  getUserAPI,
  registerAPI,
  deleteUserAPI,
  updateUserAPI
} from '@/api/user'

export default {
  name: 'userAdmin',
  data () {
    return {
      userList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      userInfo: {},
      addForm: {
        username: '',
        password: '',
        email: '',
        id: ''
      },
      editForm: {
        username: '',
        password: '',
        email: ''
      },
      rules: {
        username: [{ required: true, message: '必填', trigger: 'blur' }],
        password: [{ required: true, message: '必填', trigger: 'blur' }]
      }
    }
  },
  async created () {
    const res = await getAllUserAPI()
    // console.log(res)
    this.userList = res.sort((a, b) => parseInt(b.id) - parseInt(a.id))
  },
  methods: {
    async updateUser (id) {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          // 提交資料
          await updateUserAPI(id, this.editForm)
          // 關閉彈框
          this.editDialogVisible = false
          this.$refs.editForm.resetFields()
          // 重新取得會員資料
          const res2 = await getAllUserAPI()
          // console.log(res)
          this.userList = res2.sort((a, b) => parseInt(b.id) - parseInt(a.id))
          // 顯示成功提示
          this.$message.success('編輯成功')
        } else {
          this.$message.error('欄位不可為空')
          return false
        }
      })
    },
    addNewArticle () {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          const timestamp = new Date().getTime().toString
          this.addForm.id = timestamp
          // 提交資料
          await registerAPI(this.addForm)
          // 關閉彈框
          this.addDialogVisible = false
          this.$refs.addForm.resetFields()
          // 重新取得會員資料
          const res = await getAllUserAPI()
          // console.log(res)
          this.userList = res.sort((a, b) => parseInt(b.id) - parseInt(a.id))
          // 顯示成功提示
          this.$message.success('新增成功')
        } else {
          this.$message.error('欄位不可為空')
          return false
        }
      })
    },
    async handleEdit (id) {
      this.editDialogVisible = true
      const res = await getUserAPI(id)
      // console.log(res)
      this.editForm = res
    },
    handleClose () {
      this.$confirm('還沒完成編輯，確定要關閉嗎？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.addDialogVisible = false
        this.editDialogVisible = false
      }).catch(() => {
        return false
      })
    },
    async handleDelete (id) {
      const confirm = await this.$confirm('刪除後不可回復，確定刪除會員嗎？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        return false
      })
      if (confirm === 'confirm') {
        await deleteUserAPI(id)
        this.$message.success('會員已刪除')
        const res = await getAllUserAPI()
        this.userList = res
      }
    }
  }
}
</script>

<style>
.user {
  margin: 10px auto;
  width: 80%;
  .header {
    position: relative;
    h1 {
      color: #fff;
      text-align: center;
      font-weight: 100;
      font-size: 20px;
    }
    .el-button {
      position: absolute;
      top: 50px;
      left: 0;
    }
  }
  .btns {
    display: flex;
    flex-direction: column;
  }
  .el-scrollbar {
    padding-top: 30px;
    height: 80vh;
  }
  .overflow-hidden {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
}
</style>
