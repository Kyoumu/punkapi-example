const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const SpritesmithPlugin = require('webpack-spritesmith');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
import { PROD_BASE_PATH } from './src/constants';

module.exports = {
    entry: {
        './build/build': ['babel-polyfill', 'whatwg-fetch', './src/main.js']
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].js',
        publicPath: PROD_BASE_PATH
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader', options: {importLoaders: 1}
                    }, {
                        loader: 'postcss-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader', options: {importLoaders: 1}
                    }],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {'targets': {'browsers': ['last 5 versions', 'ie >= 9']}}],
                            'react',
                            'flow'
                        ],
                        plugins: ['transform-object-rest-spread', 'transform-class-properties']
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'build/[hash].[ext]'
                    }
                }
            },
        ]
    },
    resolve: {
        alias: {
            'sprite.png': path.resolve(__dirname, 'src/images/sprite.png')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CleanWebpackPlugin(['docs']),
        new ExtractTextPlugin('build/build.css'),
        new webpack.optimize.UglifyJsPlugin(),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/images/sprite'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/images/sprite.png'),
                css: path.resolve(__dirname, 'src/styles/_sprite.scss')
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        }),
        new HtmlWebpackPlugin({
            filename: '404.html',
            template: 'src/index.ejs',
            inject: false,
            data: {
                css: (PROD_BASE_PATH + 'build/build.css'),
                js: (PROD_BASE_PATH + 'build/build.js')
            }
        })
    ]
};