<template>
  <div>
    <el-row :gutter="10">
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 16, offset: 4 }"
        :md="{ span: 12, offset: 6 }"
      >
        <el-tabs
          v-model="activeName"
          stretch
          type="border-card"
        >
          <el-tab-pane label="登入" name="login">
            <!-- 登入 -->
            <div>
              <el-form
                :model="form"
                status-icon
                :rules="rules"
                ref="form"
                label-width="100px"
                class="demo-ruleForm"
              >
                <!-- username -->
                <el-form-item label="帳號" prop="username">
                  <el-input
                    type="text"
                    v-model="form.username"
                    placeholder="請輸入帳號"
                    name="username"
                  ></el-input>
                </el-form-item>

                <!-- password -->
                <el-form-item label="密碼" prop="password">
                  <el-input
                    type="password"
                    name="password"
                    v-model="form.password"
                    placeholder="請輸入密碼"
                  ></el-input>
                </el-form-item>

                <el-form-item prop="remember">
                  <el-checkbox v-model="remember">記住我</el-checkbox>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="login"
                    >登入</el-button
                  >
                  <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="註冊" name="register">註冊</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      activeName: 'login',
      form: {
        username: '',
        password: ''
      },
      rules: {}
    }
  },
  methods: {
    async login () {
      await this.$refs.form.validate(async valid => {
        if (valid) {
          await this.$store.dispatch('user/asyncLogin', this.form)
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
      this.$refs[form].resetFields()
    }
  }
}
</script>

<style></style>
