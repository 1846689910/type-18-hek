/**
 *  reference: https://github.com/jantimon/html-webpack-plugin
 *  根据template.html生成所需的index.html, 并且引用合适的bundle.js
 * */
const HtmlWebPackPlugin = require("html-webpack-plugin");
/**
 * reference: https://github.com/johnagan/clean-webpack-plugin
 * 在build bundle.js时，清理原有的文件
 * */
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
    entry: ["babel-polyfill", `${__dirname}/src/index.js`],
    output: {
        path: `${__dirname}/dist`,
        filename: "bundle.[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },{
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            },{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },{
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        emitFile: true,
                        name: './img/[name]-[hash].[ext]', // 这个相对路径是基于`${__dirname}/dist/...`
                    }
                }]
            },{
                test: /fonts\/.*\.(woff|woff2|eot|ttf|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./fonts/[name]-[hash].[ext]`
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([  // the path(s) that should be cleaned
            "dist/*.*"
        ], {  // the clean options to use
            root: `${__dirname}`,
            exclude: [],
            verbose: false
        }),
        new HtmlWebPackPlugin({
            template: "./template/template.html",
            title: "Webpack Test",
            filename: "./index.html"
        })
    ]
};
