const merge = require('webpack-merge')
const config = require('../config')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:16].js'),
        chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
    },
    module: {
      rules: utils.styleLoaders({
          sourceMap: config.build.productionSourceMap,
          extract: true,
          usePostCSS: true,
          cssModule: config.base.cssModule,
          cssModuleExcludePath: config.base.cssModuleExcludePath
      })
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: config.build.index,
            inject: "body",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new CleanWebpackPlugin([config.build.assetsRoot], {allowExternal: true}),
        //导出css
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[hash].css'),
            chunkFilename: utils.assetsPath("css/[id].[hash].css")
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsWebpackPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: true
                    ? {
                        map: {inline: false}
                    }
                    : {}
            })
        ],
        splitChunks: {
            chunks: "all",
            minChunks: 1,
            cacheGroups: {
                framework: {
                    priority: 2000,
                    test: "framework",
                    name: "framework",
                    enforce: true,
                    reuseExistingChunk: true
                },
                vendor: {
                    priority: 10,
                    test: /node_modules/,
                    name: 'vendor',
                    enforce: true,
                    reuseExistingChunk: true
                }
            }
        }
    }
})

if(config.build.productionGzip) {
    //添加gzip压缩插件
    const CompressWebpackPlugin = require('compress-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressWebpackPlugin({
            filename: '[path].gz[query]',  // 压缩后的文件名
            algorithm: 'gzip',             // 算法 默认gzip
            test: new RegExp(              // 针对文件的正则表达式规则，符合规则的文件被压缩
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,  //文件大于这个值的会被压缩
            minRatio: 0.8      //压缩率 默认0.8
        })
    )
}

if(config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig