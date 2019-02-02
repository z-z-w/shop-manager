const path = require("path")
const config = require('../config')
const utils = require('./utils')
const APP_PATH = path.resolve(__dirname, '../app')

module.exports = {
    entry: {
        app: './app/save.jsx',
        framework: ['react', 'react-dom']
    },
    output: {
        path: config.build.assetsRoot,
        filename: "[name].js",
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
      alias: {
          "views": path.resolve(__dirname, '../app/views'),
          "components": path.resolve(__dirname, '../app/components'),
          "assets": path.resolve(__dirname, "../app/assets"),
          "service": path.resolve(__dirname, '../app/service')
      }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                include: APP_PATH
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}