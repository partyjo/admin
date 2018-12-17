const path = require('path')
const webpack = require('webpack')
const htmlwebpackplugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.base')
const utils = require('./utils')

const webpackConfig = webpackMerge(webpackBaseConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].js',
        publicPath: utils.publicPath,
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, '../dist')),
        new htmlwebpackplugin({
            filename: 'index.html',
            template: path.resolve(__dirname, `../${utils.project}/index.html`)
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[contenthash:12].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(less)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    }
})

module.exports = webpackConfig
