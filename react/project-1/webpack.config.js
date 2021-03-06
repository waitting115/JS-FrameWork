module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        port: 2324,
        open: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: ['react-hot-loader', 'babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    mode: 'development'
}