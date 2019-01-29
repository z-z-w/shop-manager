const path = require('path')
const merge = require('webpack-merge')
const config = require('../config')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
      rules: utils.styleLoaders({
          sourceMap: config.dev.cssSourceMap,
          usePostCSS: true,
          cssModule:config.base.cssModule,
          cssModuleExcludePath:config.base.cssModuleExcludePath
      })
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: config.dev.index,
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: config.dev.host,
        port: config.dev.port,
        contentBase: path.join(__dirname, '../public'),  //本地服务器所加载文件得目录
        compress: true,
        historyApiFallback: true,   //不跳转
        hot: true,
        https: false,
        noInfo: true,
        open: config.dev.autoOpenBrowser,
        proxy: config.dev.proxyTable
    }
})