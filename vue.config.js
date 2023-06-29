const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/_var.scss" ;@import "@/assets/styles/_mixins.scss" ;`,
      },
    },
  },
})
