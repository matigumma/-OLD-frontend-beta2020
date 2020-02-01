const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const helpers = require('../helpers');

module.exports = {
    entry: {
        'app': [
            helpers.root('src/index.js')
        ]
    },
    /* devServer: {
        hot: true,
        open: true
    }, */
    output: {
        path: helpers.root('build'),
        publicPath: "/",
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.scss', '.html'],
        alias: {
          'app': 'src'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: helpers.root("src/public/index.html"),
            inject: "body"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};