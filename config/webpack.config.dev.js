const path = require('path')
const webpack = require('webpack')
const htmlwebpackplugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.base')
const utils = require('./utils')

const webpackConfig = webpackMerge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].js',
        publicPath: '/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist/'),
        port: utils.port,
        open: false,
        proxy: {
            '/api': {
                target: 'http://partyjo.nextdog.cc/server/weiquan/', 
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    plugins: [
        new htmlwebpackplugin({
            filename: 'index.html',
            template: path.resolve(__dirname, `../${utils.project}/index.html`)
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {

    }
})

module.exports = webpackConfig
