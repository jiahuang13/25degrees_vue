const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src')
        // 这里可以根据需要添加其他的别名
        // 例如：'@components': require('path').resolve(__dirname, 'src/components')
      }
    }
  }
})
