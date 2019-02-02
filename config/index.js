'use strict'

const path = require('path')

module.exports = {
    base: {
        //是否开启cssModule
        cssModule: false,
        //cssModule排除得目录，其他css库可以放这里
        cssModuleExcludePath: /public/
    },
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            "/api": {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'   //重写接口
                }
            },
            "/other": {
                target: 'http://adminv2.happymmall.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'   //重写接口
                }
            }
        },

        // Template for save.jsx.html
        index: path.resolve(__dirname, '../public/index.html'),

        host: 'localhost',
        port: '8080',
        autoOpenBrowser: false,
        //是否生成sourceMap
        cssSourceMap: true
    },
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        // Template for save.jsx.html
        index: path.resolve(__dirname, '../public/index.html'),

        // 是否生成sourceMap
        productionSourceMap: false,

        //是否压缩文件
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}