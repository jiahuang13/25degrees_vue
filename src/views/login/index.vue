<template>
  <div class="login">
    <el-row :gutter="10">
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 16, offset: 4 }"
        :md="{ span: 12, offset: 6 }"
      >
        <el-tabs v-model="activeName" stretch type="border-card">
          <el-tab-pane label="登入" name="login">
            <!-- 登入 -->
            <div>
              <el-form
                :model="loginForm"
                status-icon
                :rules="rules"
                ref="loginForm"
                label-width="100px"
              >
                <!-- username -->
                <el-form-item label="帳號" prop="username">
                  <el-input
                    type="text"
                    v-model="loginForm.username"
                    placeholder="請輸入帳號"
                    name="username"
                  ></el-input>
                </el-form-item>

                <!-- password -->
                <el-form-item label="密碼" prop="password">
                  <el-input
                    type="password"
                    name="password"
                    v-model="loginForm.password"
                    placeholder="請輸入密碼"
                  ></el-input>
                </el-form-item>

                <el-form-item prop="remember">
                  <el-checkbox v-model="loginForm.remember">記住我</el-checkbox>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="login">登入</el-button>
                  <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>

          <!-- 註冊模塊 -->
          <el-tab-pane label="註冊" name="register">
            <el-form
                :model="registerForm"
                status-icon
                :rules="rules"
                ref="registerForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <!-- username -->
                <el-form-item label="帳號" prop="username">
                  <el-input
                    type="text"
                    v-model="registerForm.username"
                    placeholder="請輸入帳號"
                    name="username"
                  ></el-input>
                </el-form-item>

                <!-- password -->
                <el-form-item label="密碼" prop="password">
                  <el-input
                    type="password"
                    name="password"
                    v-model="registerForm.password"
                    placeholder="請輸入密碼"
                  ></el-input>
                </el-form-item>

                <!-- email -->
                <el-form-item label="電子信箱" prop="email">
                  <el-input
                    type="email"
                    name="email"
                    v-model="registerForm.email"
                    placeholder="請輸入email"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="register">註冊</el-button>
                <el-button @click="resetForm('FG~!form')">重置</el-button>
                </el-form-item>
              </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { registerAPI, getAllUserAPI } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      activeName: 'login',
      loginForm: {
        username: '',
        password: '',
        remember: ''
      },
      registerForm: {
        username: '',
        password: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '請輸入帳號' },
          { pattern: '^[0-9a-zA-Z_]{5,}$', message: '請輸入至少5位數字或英文字母', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          { pattern: '^[0-9a-zA-Z_]{5,}$', message: '請輸入至少5位數字或英文字母', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '請輸入email', trigger: 'blur' }
        ]
      },
      userList: []
    }
  },
  methods: {
    async register () {
      // 比對是否重複註冊
      const res = await getAllUserAPI()
      // console.log(res)
      this.userList = res
      const existUser = this.userList.find(ele => ele.username === this.registerForm.username)
      // console.log(existUser)
      if (existUser) {
        this.$message({
          message: '此帳號已存在，請選用不同帳號進行註冊',
          type: 'error'
        })
      } else {
        // 進行註冊
        await registerAPI(this.registerForm)
        this.$message({
          message: '已完成註冊',
          type: 'success'
        })
        this.$message({
          message: '已完成註冊',
          type: 'success'
        })
        this.activeName = 'login'
        this.loginForm.username = this.registerForm.username
        this.loginForm.password = this.registerForm.password
        this.$refs.registerForm.resetFields()
      }
    },
    async login () {
      await this.$refs.form.validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('user/asyncLogin', this.loginForm)
          this.$message.success('登入成功')
          this.$router.push('/')

          // 記住我與否
          if (this.remember) {
            localStorage.setItem('remember_key', JSON.stringify(this.form))
          } else {
            localStorage.removeItem('remember_key')
          }
        }
      })
    },
    resetForm (form) {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
html {
  background-color: #091b0c;
  .el-row {
    background-color: #091b0c;
    margin: 20vh 0;
  }
}
</style>
