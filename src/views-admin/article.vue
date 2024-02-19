<template>
  <div class="article">
    <div class="header">
      <h1>專欄文章管理</h1>
      <el-button icon="el-icon-plus" @click="addDialogVisible = true"
        >新增文章</el-button
      >
    </div>

    <el-scrollbar>
      <!-- 表格 -->
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column prop="id" label="id" width="130" align="center">
        </el-table-column>
        <el-table-column prop="title" label="標題" width="150" align="center">
        </el-table-column>
        <el-table-column prop="thumb" label="縮圖" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.url" alt="" width="100px" height="100px" />
          </template>
        </el-table-column>
        <el-table-column label="內容" width="500">
          <template slot-scope="scope">
            <div class="overflow-hidden" v-html="scope.row.content"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class="btns">
          <template slot-scope="scope">
            <el-button
              @click="handleCheck(scope.row.id)"
              type="text"
              size="small"
              >查看</el-button
            >
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

      <!-- 查看對話框 -->
      <el-dialog
        :title="articleInfo.title"
        :visible.sync="dialogVisible"
        width="70%"
      >
        <el-row>
          <el-col :span="8">
            <div class="image">
              <img :src="articleInfo.url" alt="" width="300px" height="auto" />
            </div>
          </el-col>
          <el-col :span="16">
            <h3>內文</h3>
            <div v-html="articleInfo.content"></div>
          </el-col>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >確 定</el-button
            >
          </span>
        </el-row>
      </el-dialog>

      <!-- 編輯對話框 -->
      <el-dialog title="編輯文章" :visible.sync="editDialogVisible" width="70%">
        <el-form
          label-position="right"
          label-width="80px"
          ref="editForm"
          :model="editForm"
          :rules="rules"
          :before-close="handleClose"
        >
          <el-form-item label="標題" prop="title">
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item label="內容" prop="content">
            <quill-editor v-model="editForm.content"></quill-editor>
          </el-form-item>
          <el-form-item label="圖片連結" prop="url">
            <el-input v-model="editForm.url"></el-input>
          </el-form-item>
          <el-form-item label="圖片預覽" prop="url">
            <div class="image">
              <img :src="editForm.url" alt="" width="300px" height="auto" />
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateArticle(editForm.id)"
            >確 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 新增文章對話框 -->
      <el-dialog title="新增文章" :visible.sync="addDialogVisible" width="70%">
        <el-form
          label-position="right"
          label-width="80px"
          ref="addForm"
          :model="addForm"
          :rules="rules"
          :before-close="handleClose"
        >
          <el-form-item label="標題" prop="title">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>
          <el-form-item label="內容" prop="content">
            <quill-editor v-model="addForm.content"></quill-editor>
          </el-form-item>
          <el-form-item label="圖片連結" prop="url">
            <el-input v-model="addForm.url"></el-input>
          </el-form-item>
          <el-form-item label="圖片預覽" prop="url">
            <div class="image">
              <img :src="addForm.url" alt="" width="100px" height="auto" />
            </div>
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
  getAllArticlesAPI,
  getDetailAPI,
  addNewArticleAPI,
  deleteUserAPI,
  updateArticleAPI
} from '@/api/articles'
// 富文本編輯器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'articleAdmin',
  data () {
    return {
      articleList: [],
      dialogVisible: false,
      addDialogVisible: false,
      editDialogVisible: false,
      articleInfo: {},
      addForm: {
        title: '',
        url: '',
        content: '',
        id: ''
      },
      editForm: {
        title: '',
        url: '',
        content: ''
      },
      rules: {
        title: [{ required: true, message: '必填', trigger: 'blur' }],
        content: [{ required: true, message: '必填', trigger: 'blur' }],
        url: [{ required: true, message: '必填', trigger: 'blur' }]
      }
    }
  },
  components: {
    quillEditor
  },
  async created () {
    const res = await getAllArticlesAPI()
    // console.log(res)
    this.articleList = res.sort((a, b) => parseInt(b.id) - parseInt(a.id))
  },
  methods: {
    async updateArticle (id) {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          // 提交資料
          await updateArticleAPI(id, this.editForm)
          // 關閉彈框
          this.editDialogVisible = false
          this.$refs.editForm.resetFields()
          // 重新取得文章資料
          const res2 = await getAllArticlesAPI()
          // console.log(res)
          this.articleList = res2.sort((a, b) => parseInt(b.id) - parseInt(a.id))
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
          await addNewArticleAPI(this.addForm)
          // 關閉彈框
          this.addDialogVisible = false
          this.$refs.addForm.resetFields()
          // 重新取得文章資料
          const res = await getAllArticlesAPI()
          // console.log(res)
          this.articleList = res.sort((a, b) => parseInt(b.id) - parseInt(a.id))
          // 顯示成功提示
          this.$message.success('新增成功')
        } else {
          this.$message.error('欄位不可為空')
          return false
        }
      })
    },
    async handleCheck (id) {
      this.dialogVisible = true
      const res = await getDetailAPI(id)
      // console.log(res)
      this.articleInfo = res
    },
    async handleEdit (id) {
      this.editDialogVisible = true
      const res = await getDetailAPI(id)
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
      const confirm = await this.$confirm('刪除後不可回復，確定刪除文章嗎？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        return false
      })
      if (confirm === 'confirm') {
        await deleteUserAPI(id)
        this.$message.success('文章已刪除')
        const res = await getAllArticlesAPI()
        this.articleList = res
      }
    }
  }
}
</script>

<style>
.article {
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
