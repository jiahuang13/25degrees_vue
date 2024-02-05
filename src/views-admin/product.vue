<template>
  <div class="product">
    <div class="header">
      <h1>商品管理</h1>
      <el-button icon="el-icon-plus" @click="addDialogVisible = true"
        >新增商品</el-button
      >
    </div>

    <el-scrollbar>
      <!-- 表格 -->
      <el-table :data="productList" border style="width: 100%">
        <el-table-column prop="id" label="id" width="70" align="center">
        </el-table-column>
        <el-table-column prop="thumb" label="縮圖" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.url" alt="" width="100px" height="100px" />
          </template>
        </el-table-column>
        <el-table-column
          prop="category"
          label="類別"
          width="100"
          align="center"
          :formatter="formatCategory"
        >
        </el-table-column>
        <el-table-column prop="name" label="商品名" width="150" align="center">
        </el-table-column>
        <el-table-column label="商品介紹" width="400">
          <template slot-scope="scope">
            <div class="overflow-hidden" v-html="scope.row.content"></div>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="庫存" width="50" align="center">
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
        :title="productInfo.name"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="handleClose"
      >
        <el-row>
          <el-col :span="8">
            <div class="image">
              <img :src="productInfo.url" alt="" width="300px" height="auto" />
            </div>
          </el-col>
          <el-col :span="16">
            <h3>商品分類： {{ productInfo.category }}</h3>
            <h3>商品介紹</h3>
            <div v-html="productInfo.content"></div>
            <h3>庫存量：{{ productInfo.count }}</h3>
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
      <el-dialog title="編輯商品" :visible.sync="editDialogVisible" width="70%">
        <el-form
          label-position="right"
          label-width="80px"
          ref="editForm"
          :model="editForm"
          :rules="rules"
          :before-close="handleClose"
        >
          <el-form-item label="商品名稱" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品介紹" prop="content">
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
          <el-form-item label="庫存量" prop="count">
            <el-input v-model="editForm.count"></el-input>
          </el-form-item>
          <el-form-item label="商品類別" prop="category">
            <el-radio-group v-model="editForm.category">
              <el-radio label="essential-oil">精油</el-radio>
              <el-radio label="incense">香氛</el-radio>
              <el-radio label="body-care">身體保養</el-radio>
              <el-radio label="face-care">臉部保養</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateProduct(editForm.id)"
            >確 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 新增商品對話框 -->
      <el-dialog title="新增商品" :visible.sync="addDialogVisible" width="70%">
        <el-form
          label-position="right"
          label-width="80px"
          ref="addForm"
          :model="addForm"
          :rules="rules"
        >
          <el-form-item label="商品名稱" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品介紹" prop="content">
            <quill-editor v-model="addForm.content"></quill-editor>
          </el-form-item>
          <el-form-item label="圖片連結" prop="url">
            <el-input v-model="addForm.url"></el-input>
          </el-form-item>
          <el-form-item label="商品類別" prop="category">
            <el-radio-group v-model="addForm.category">
              <el-radio label="essential-oil">精油</el-radio>
              <el-radio label="incense">香氛</el-radio>
              <el-radio label="body-care">身體保養</el-radio>
              <el-radio label="face-care">臉部保養</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNewProduct">確 定</el-button>
        </span>
      </el-dialog>
    </el-scrollbar>
  </div>
</template>

<script>
import {
  getAllProductAPI,
  getDetailAPI,
  addNewProductAPI,
  deleteProductAPI,
  updateProductAPI
} from '@/api/product'
// 富文本編輯器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'productAdmin',
  data () {
    return {
      productList: [],
      dialogVisible: false,
      addDialogVisible: false,
      editDialogVisible: false,
      productInfo: {},
      addForm: {
        name: '',
        content: '',
        category: '',
        url: ''
      },
      editForm: {
        name: '',
        content: '',
        category: '',
        url: ''
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        content: [{ required: true, message: '必填', trigger: 'blur' }],
        url: [{ required: true, message: '必填', trigger: 'blur' }],
        category: [{ required: true, message: '必填', trigger: 'blur' }]
      }
    }
  },
  components: {
    quillEditor
  },
  async created () {
    const res = await getAllProductAPI()
    // console.log(res)
    this.productList = res
  },
  methods: {
    async updateProduct (id) {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          // 提交資料
          await updateProductAPI(id, this.editForm)
          // 關閉彈框
          this.editDialogVisible = false
          this.$refs.editForm.resetFields()
          // 重新取得商品資料
          const res2 = await getAllProductAPI()
          // console.log(res)
          this.productList = res2
          // 顯示成功提示
          this.$message.success('編輯成功')
        } else {
          this.$message.error('欄位不可為空')
          return false
        }
      })
    },
    formatCategory (row) {
      const map = {
        'essential-oil': '精油',
        incense: '香氛',
        'face-care': '臉部保養',
        'body-care': '身體保養'
      }
      return map[row.category]
    },
    addNewProduct () {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          // 提交資料
          await addNewProductAPI(this.addForm)
          // 關閉彈框
          this.addDialogVisible = false
          this.$refs.addForm.resetFields()
          // 重新取得商品資料
          const res = await getAllProductAPI()
          // console.log(res)
          this.productList = res
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
      this.productInfo = res
    },
    async handleEdit (id) {
      this.editDialogVisible = true
      const res = await getDetailAPI(id)
      // console.log(res)
      this.editForm = res
    },
    handleClose () {},
    async handleDelete (id) {
      const confirm = await this.$confirm('刪除後不可回復，確定刪除商品嗎？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        return false
      })
      if (confirm === 'confirm') {
        await deleteProductAPI(id)
        this.$message.success('商品已刪除')
        const res = await getAllProductAPI()
        this.productList = res
      }
    }
  }
}
</script>

<style>
.product {
  margin: 10px auto;
  width: 80%;
  .header {
    position: relative;
    h1 {
      color: #fff;
      text-align: center;
      font-weight: 100;
      font-size: 30px;
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
