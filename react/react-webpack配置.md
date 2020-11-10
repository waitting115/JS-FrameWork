webpack 三大模块：
    1.入口（intry），出口（output）
    2.loader（加载器）
    3.plugins（插件）

webpack -w  （watch） 实时更新，不用每次都去cmd中‘webpack’重新打包，文件保存后自动打包，直接刷新浏览器即可

webpack -p   （）bundle.js文件直接被压缩打包，里面的代码变为一行

webpack -pw  持续监听，并且压缩打包

webpack官网：https://webpack.js.org/

自动支持es6的模块语法

导出对象用export default，只导出变量用export即可

npm init -y 初始化，自动新建package.json文件夹，里面是该项目的一些参数，-y就是在cmd中显示其内容

解析css文件需要style-loader  css-loader 
    cnpm i style-loader -D （-D是 --save-dev的缩写）  (-D标注该模块是开发所需要的，在package.json里面的devDependencies模块中会显示该模块，及其信息)
    cnpm i css-loader -D (同上)

接下来在webpack.config.js中配置相应的模块：
module: {
    rules: [
        {
            test: /\.css$/,//不用加引号
            use: ['style-loader', 'css-loader']//顺序不能反，从右往左解析，先css，后style
        }
    ]
}

react用的是jsx语法，在webpack中需要配置

react三大块：
    react
    react-com
    babel

配置babel：
    babel-core
    babel-loader@7.1.5   
    babel-preset-es2015

    原来 babel-loader版本为8.0.0 不符合修改为7.1.5，不然后面会报错：Error: Cannot find module '@babel/core'

下载：
    cnpm i babel-core babel-loader@7.1.5 babel-preset-es2015 -D

预设：
    需要.babelrc，自己新建该文件(在VSCode中可直接建，在文件夹中可在cmd中建)
    .babelrc文件内容：
        {
            "presets": ["es2015"]
        }

配置webpack.config.js:
    {
        test: /\.js$/,
        use: ["babel-loader"]
    }

配置react：
    react
    react-dom

    babel-preset-react
    react-hot-loader  (热更新)

下载：
    cnpm i react react-dom babel-preset-react react-hot-loader -D

配置webpack.config.js:
    {
        test: /\.js$/,
        use: ['react-hot-loader', 'babel-loader'],//顺序不能反，不然会出错
        exclude: /node_modules/  //排除该文件
    }

预设：
    .babelrc文件内容：
        {
            "presets": [["es2015"], ["react"]]
        }
    
index.html:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
</head>
<body>
    <div id="app"></div>

    <script src="./dist/bundle.js"></script> 需要在#app节点挂载完成后在引入！，不然react找不到相应的节点
</body>
</html>

webpack生产环境：webpack -pw
webpackk开发环境：webpack-dev-server

安装：
    cnpm i webpack-dev-server -g   (全局安装)

验证是否安装成功：
    webpack-dev-server -v

使用：
    webpack-dev-server
然后在localhost:8080就出来了

切换端口：
    webpack-dev-server --port 2323

配置默认端口：
在webpack.config.js中配置：
    devServer: {
        port: 2324
    }

启动server后自动打开浏览器：
在webpack.config.js中配置：
    devServer: {
        port: 2324,
        open: true          (默认是false)
    }

自动刷新：
在webpack.config.js中配置：
    devServer: {
        port: 2324,
        open: true,          (默认是false)
        inline: true
    }

指定服务器文件目录：
在webpack.config.js中配置：
    devServer: {
        port: 2324,
        open: true,          (默认是false)
        inline: true,
        contentBase: './app'    (如果index.js目录地址改变了记得改入口文件地址)
    }