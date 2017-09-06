var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
   filename: 'style.css'
});

module.exports = {
    entry: './client/app.js',
    output: {
        path: path.resolve(__dirname, 'rathi'),
        filename: 'bundle.js',
        // publicPath: '/rathi'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            }/*,
            //multiple files copied from src to dest without minification
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ],
                exclude: path.resolve(__dirname, 'src/pages/login.html')
            }*/
        ]
    },
    plugins: [
    // cpoied all files individually
        extractPlugin,
        new HtmlWebpackPlugin({
            template: 'client/pages/login.html',
            title: 'My App',
            filename:'login.html',
        }),
        new HtmlWebpackPlugin({
            template: 'client/pages/admin.html',
            title: 'My App',
            filename:'admin.html'
        }),
        new HtmlWebpackPlugin({
            template: 'client/pages/product.html',
            title: 'My App',
            filename:'product.html'
        }),
        new HtmlWebpackPlugin({
            template: 'client/pages/products.html',
            title: 'My App',
            filename:'products.html'
        }),
        new HtmlWebpackPlugin({
            template: 'client/pages/dashboard.html',
            title: 'My App',
            filename:'dashboard.html'
        }),
        new HtmlWebpackPlugin({
            template: 'client/pages/editProduct.html',
            title: 'My App',
            filename:'editProduct.html'
        }),
        new HtmlWebpackPlugin({
            template: 'client/pages/addProduct.html',
            title: 'My App',
            filename:'addProduct.html'
        }),
        new HtmlWebpackPlugin({
            template: 'client/pages/payment.html',
            title: 'My App',
            filename:'payment.html'
        }),
        new CleanWebpackPlugin(['rathi'])
    ]
};
// npm run build
// npm run build:prod
