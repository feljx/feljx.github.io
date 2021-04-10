const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

// Webpack configurations
module.exports = [
    // PRODUCTION
    Config({
        name: 'prod',
        mode: 'production',
        output: {
            path: resolve('docs'),
            filename: '[name].js'
        },
        plugins: [
            new CopyPlugin({
                patterns: [ { from: 'src/assets/CNAME', to: '' } ]
            }),
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[id].css'
            }),
            new HtmlWebpackPlugin({
                title: 'Template',
                template: './src/assets/index.html'
            })
        ]
    }),
    // DEVELOPMENT
    Config({
        name: 'dev',
        mode: 'development',
        output: {
            path: resolve('dev'),
            filename: '[name].js'
        },
        devtool: 'source-map',
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Template',
                template: './src/assets/index.html'
            }),
            new HotModuleReplacementPlugin()
        ]
    })
]

// Config factory
function Config (moreOptions) {
    const isDev = moreOptions.name === 'dev'
    // Return configuration
    return {
        // ENTRY
        entry: './src/index.ts',
        // FILE EXTENSIONS
        resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.json' ]
        },
        // MODULE
        module: {
            rules: [
                // LOAD JAVASCRIPT / TYPESCRIPT
                {
                    test: /\.m?(j|t)sx?$/,
                    include: resolve(__dirname, 'src'),
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript',
                                '@babel/preset-react'
                            ]
                        }
                    }
                },
                // LOAD CSS
                // 3 loaders: style-loader, css-loader, postcss-loader
                {
                    test: /\.css$/i,
                    include: resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ]
                }
            ]
        },
        optimization: {
            minimizer: [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
                // `...`,
                new CssMinimizerPlugin()
            ]
        },
        // MERGE GIVEN OPTIONS
        ...moreOptions
    }
}
