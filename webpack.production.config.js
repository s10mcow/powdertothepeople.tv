var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

const DIST_DIR = 'dist/';

loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({fallback: 'style-loader', use : 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'}),
    exclude: ['node_modules']
});

module.exports = {
    entry: [
        './cams/index.js',
        './cams/styles.scss'
    ],
    output: {
        publicPath: './',
        path: path.join(__dirname, 'dist'),
        filename: '[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders
    },
    plugins: [
        new WebpackCleanupPlugin(
            {
                exclude: ["sw.js", "workbox-sw.prod.v2.1.0.js", "workbox-sw.prod.v2.1.0.js.map"],
            }
        ),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './cams/index.html',
            files: {
                css: ['style.css'],
                js: ['bundle.js']
            }
        }),
        new workboxPlugin({
            globDirectory: './dist',
            globPatterns: ['**/*.{html,js,css}'],
            swDest: path.join('dist', 'sw.js')
        })
    ]
};
