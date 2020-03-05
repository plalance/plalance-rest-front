const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('@babel/register', {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
});
console.log('.ts files are registered for babel.');

let config = {
    devtool: "source-map",
    entry: ['./src/App.ts', './src/scss/main.scss'],
    output: {
        path: path.resolve(__dirname, './web'),
        publicPath: '/',
        filename: 'main.[hash].js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue']
    },
    devServer: {
        // noInfo: true,
        port: 8000,
        proxy: {
            '/back': {
                target: 'http://localhost:8080/',
                pathRewrite: {'^/back': ''}
            }
        }
    },
    module: {
        rules: [
            // JS Files
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: [/node_modules/]
            },
            // TS Files
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ],
                exclude: [/node_modules/]
            },
            // Vue Files
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: [/node_modules/]
            },
            // SCSS Files
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            context: path.resolve(__dirname, "src/"),
                            outputPath: 'Images/',
                            publicPath: './Images',
                            useRelativePaths: true
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "app.[hash].css",
        }),
        new HtmlWebpackPlugin({
            template: "src/index_template.html",
            filename: "index.html"
        })
    ]
};

module.exports = config;