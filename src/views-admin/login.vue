<template>
  <div class="login">
    <el-row>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 16, offset: 4 }"
        :md="{ span: 12, offset: 6 }"
      >
        <div class="logo">
         <img src="@/assets/img/25degrees_logo.png" alt="" />
        </div>
        <el-tabs v-model="activeName" stretch type="border-card">
          <el-tab-pane label="後台管理登入" name="login">
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

                <el-form-item>
                  <el-button type="primary" @click="login">登入</el-button>
                  <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAdminUserAPI } from '@/api/user'
import { setAdminToken } from '@/utils/auth'

export default {
  name: 'adminLoginIndex',
  data () {
    return {
      activeName: 'login',
      loginForm: {
        username: '',
        password: '',
        remember: ''
      },
      rules: {
        username: [
          { required: true, message: '請輸入帳號', trigger: 'blur' },
          {
            pattern: '^[0-9a-zA-Z_]{5,}$',
            message: '請輸入至少5位數字或英文字母',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          {
            pattern: '^[0-9a-zA-Z_]{5,}$',
            message: '請輸入至少5位數字或英文字母',
            trigger: 'blur'
          }
        ]
      },
      userList: []
    }
  },
  methods: {
    async login () {
      const adminUsers = await getAdminUserAPI()
      if (adminUsers.find((ele) => ele.username.toLowerCase() === this.loginForm.username.toLowerCase())) {
        setAdminToken()
        this.$message.success('管理員您好，歡迎登入後台')
        this.$router.push('/admin')
      } else {
        this.$message.error('帳號或密碼錯誤，請重試')
      }
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style>
html, body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}
.login {
  .el-row {
    /* background-color: #091b0c; */
    margin: 10vh 0;
    position: relative;
    .logo {
      width: 10vw;
      margin: 0 auto 30px auto;
      img {
        width: 100%;
      }
    }
    .el-tabs--border-card,
    .el-tabs__nav-scroll {
      border-radius: 10px;
    }
  }
}
</style>
