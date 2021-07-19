const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

// USER CONFIG
const SOURCE_FOLDER = './src'
const ENTRY_FILE = `${SOURCE_FOLDER}/index.js`
const HTML_TEMPLATE = `${SOURCE_FOLDER}/index.html`
// const RANDOM_ASSET = `${SOURCE_FOLDER}/{RANDOM_ASSET}`
const TARGET_FOLDER_PRODUCTION = resolve('docs')
const TARGET_FOLDER_DEVELOPMENT = resolve('dev')

// PRODUCTION SPECIFIC CONFIG DATA
const production = {
    name: 'prod',
    mode: 'production',
    output_folder: TARGET_FOLDER_PRODUCTION,
    plugins: [
        // new CopyPlugin({
        //     patterns: [ { from: RANDOM_ASSET, to: '' } ]
        // }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            title: 'Template',
            template: HTML_TEMPLATE
        })
    ]
}

// DEVELOPMENT SPECIFIC CONFIG DATA
const development = {
    name: 'dev',
    mode: 'development',
    output_folder: TARGET_FOLDER_DEVELOPMENT,
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Template',
            template: HTML_TEMPLATE
        }),
        new HotModuleReplacementPlugin()
    ]
}

// INTERNAL CONSTANTS
const DEVELOPMENT_MODE = 'development'

// MAP CONFIG DATA TO FINISHED CONFIG
const Config = (config_data) => ({
    // MERGE OPTIONS FROM DATA
    name: config_data.name,
    mode: config_data.mode,
    // ENTRY
    entry: ENTRY_FILE,
    // FILE EXTENSIONS
    resolve: {
        extensions: [ '.js', '.json' ]
    },
    // OUTPUT
    output: {
        path: config_data.output_folder,
        filename: '[name].js'
    },
    // PLUGINS
    plugins: config_data.plugins,
    // DEVTOOL OPTION
    devtool: config_data.mode === DEVELOPMENT_MODE ? 'source-map' : false,
    devServer: {
        port: 3000
    },
    // MODULE
    module: {
        rules: [
            // LOAD JAVASCRIPT / TYPESCRIPT
            {
                test: /\.m?(j|t)sx?$/,
                include: resolve(__dirname, SOURCE_FOLDER),
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env' ]
                    }
                }
            },
            // LOAD CSS
            // 3 loaders: style-loader, css-loader, postcss-loader
            {
                test: /\.css$/i,
                include: resolve(__dirname, SOURCE_FOLDER),
                exclude: /(node_modules|bower_components)/,
                use: [
                    config_data.mode === DEVELOPMENT_MODE
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 0
                        }
                    }
                    // 'postcss-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                type: 'asset'
            },
            {
                test: /\.(html)$/,
                use: [ 'html-loader' ]
            }
        ]
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin()
        ]
    }
})

// EXPORT FINISHED WEBPACK CONFIGS
module.exports = [ production, development ].map(Config)
