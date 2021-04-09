const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

// Webpack configurations
module.exports = [
    Config({
        name: 'prod',
        mode: 'production',
        output: {
            path: resolve('docs'),
            filename: 'index.js'
        }
    }),
    Config({
        name: 'dev',
        mode: 'development',
        output: {
            path: resolve('dev'),
            filename: 'index.js'
        },
        devtool: 'source-map'
    })
]

// Config factory
function Config (moreOptions) {
    const isDev = moreOptions.name === 'dev'
    // Return configuration
    return {
        // ENTRY AND FILE EXTENSIONS
        entry: './src/index.ts',
        resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.json' ]
        },
        plugins: [
            // STATIC ASSET COPY
            new CopyPlugin({
                patterns: [
                    { from: 'src/index.html', to: '' },
                    { from: 'src/CNAME', to: '' }
                ]
            }),
            // CSS STUFF
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[id].css'
            }),
            // HMR MAGIC
            new HotModuleReplacementPlugin()
        ],
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
                        'style-loader',
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
        // MERGE GIVEN OPTIONS
        ...moreOptions
    }
}
