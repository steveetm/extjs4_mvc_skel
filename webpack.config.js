const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: ["./app.js"],
    output: {
        filename: 'app.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: "eval-source-map",
    resolve: {
        modules: [process.cwd(),'node_modules','app/'],
    },
    module: {
        loaders: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'extjs-loader',
                        options: {
                            sourceMap: false,
                            debug: false,
                            nameSpace: 'App',
                            paths: {
                                'Ext.ux': 'app/lib/ux/',
                                App: 'app/',
                                Ext:false
                            },
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-remove-strict-mode', 'transform-exponentiation-operator'],
                        ignore: ['client/vendor/sdk/ext'],

                    },
                }],
            },
        ]
    },
    devServer: {
        port: 9999
    },

    plugins: [
        new HtmlWebpackPlugin({template: './index.tpl.html'}),
        new CopyWebpackPlugin([
            {
                from: 'config/**/*',
                to: './',
            }
        ])
    ]
};
module.exports = config;