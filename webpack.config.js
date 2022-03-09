const path = require('path')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: Object.assign({
        index: './src/index.js'
    },
        fs.readdirSync(path.join(__dirname, 'src')).reduce((entries, dir) => {
            const fullDir = path.join(__dirname, 'src', dir)
            if (fs.statSync(fullDir).isDirectory() && fs.existsSync(path.join(fullDir, 'index.js'))) {
                const entry = path.join(fullDir, 'index.js')
                entries[dir] = [entry]
            }

            return entries
        }, {})),
    // entry: './src/index.js',
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader'
            }
        ]
    },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/*.d.ts', to: '[name].[ext]' },
        { from: 'package.json' }
      ]
    })
  ],
    devtool: 'source-map'
}
