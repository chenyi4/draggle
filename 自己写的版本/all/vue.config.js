const webpack = require('webpack')
module.exports = {
  configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        })
      ]
  },
  devServer: {
    port: 8081,
    proxy: {
      '/': {
        // target: 'http://10.12.42.65:8080', //文路的接口
        // target: 'http://10.12.42.127:8090/', //王欣的接口
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: {
            
        }
      }
    }
   },
  // pwa: {
  //   iconPaths: {
  //     favicon32     : './src/assets/logo.png',
  //     favicon16     : './src/assets/logo.png',
  //     appleTouchIcon: './src/assets/logo.png',
  //     maskIcon      : './src/assets/logo.png',
  //     msTileImage   : './src/assets/logo.png'
  //   }
  // },
  productionSourceMap:false,
  publicPath: './'
}