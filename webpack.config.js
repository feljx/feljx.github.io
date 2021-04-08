const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')

// Webpack configurations
module.exports = [
    Config({
        name: 'build',
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
    return {
        entry: './src/index.ts',
        resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.json' ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'src/index.html', to: '' },
                    { from: 'src/CNAME', to: '' }
                ]
            })
        ],
        module: {
            rules: [
                {
                    test: /\.m?(j|t)sx?$/,
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
                }
            ]
        },
        ...moreOptions
    }
}
