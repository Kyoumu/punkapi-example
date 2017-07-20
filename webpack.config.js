const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Visualizer = require('webpack-visualizer-plugin');
const autoprefixer = require('autoprefixer');
const SpritesmithPlugin = require('webpack-spritesmith');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        build: ['babel-polyfill', 'whatwg-fetch', './src/main']
    },
    output: {
        path: path.resolve(__dirname, './www/build'),
        filename: '[name].js',
        publicPath: '/build/'
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
                            ['env', {'targets': {'browsers': ['last 5 versions', 'ie >= 8']}}],
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
                    loader: 'file-loader'
                }
            },
        ]
    },
    resolve: {
        alias: {
            'sprite.png': path.resolve(__dirname, './src/images/sprite.png')
        }
    },
    plugins: [
        // new Visualizer(),
        new CleanWebpackPlugin(['./www/assets/build']),
        new ExtractTextPlugin('build.css'),
        new webpack.optimize.UglifyJsPlugin(),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, './src/images/sprite'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, './src/images/sprite.png'),
                css: path.resolve(__dirname, './src/styles/_sprite.scss')
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('dev')
            }
        })
    ],
    devServer: { //run webpack-dev-server with -d flag for source maps
        contentBase: path.join(__dirname, 'www'),
        compress: true,
        port: 9000,
        publicPath: '/build/',
        historyApiFallback: true
    }
};