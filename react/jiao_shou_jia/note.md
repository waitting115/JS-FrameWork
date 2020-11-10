react脚手架是一个环境

基于node

就是下一个帮我们配置好了的webpack

安装：

​	cnpm i -g create-react-app

验证：

​	create-react-app --version

使用：

​	create-react-app my-react			（文件名不能使用大写）

(100多兆)

目录：



命令：

- yarn start    启动开发服务器。
- yarn build  将应用程序绑定到用于生产的静态文件中。（打包）
- yarn test    启动测试运行器。（测试）
- yarn eject    删除此工具并复制构建依赖项、配置文件和脚本到app目录。如果你这样做了，你就不能回去了!



首先cd到my-react

然后npm start  / yarn start

如果出以下错误：

~~~npm
 my-react@0.1.0 start C:\Users\11510\Desktop\note-master\ReadyToGoByteDance\JS框架\react\jiao_shou_jia\my-react

> react-scripts start


There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

The react-scripts package provided by Create React App requires a dependency:

  "webpack": "4.42.0"

Don't try to install it manually: your package manager does it automatically.
However, a different version of webpack was detected higher up in the tree:

  C:\Users\11510\node_modules\webpack (version: 4.44.1)

Manually installing incompatible versions is known to cause hard-to-debug issues.

If you would prefer to ignore this check, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
That will permanently disable this message but you might encounter other issues.

To fix the dependency tree, try following the steps below in the exact order:

    1. Delete package-lock.json (not package.json!) and/or yarn.lock in your project folder.
    2. Delete node_modules in your project folder.
    3. Remove "webpack" from dependencies and/or devDependencies in the package.json file in your project folder.
    4. Run npm install or yarn, depending on the package manager you use.

In most cases, this should be enough to fix the problem.
If this has not helped, there are a few other things you can try:

    5. If you used npm, install yarn (http://yarnpkg.com/) and repeat the above steps with it instead.
       This may help because npm has known issues with package hoisting which may get resolved in future versions.

    6. Check if C:\Users\11510\node_modules\webpack is outside your project directory.
       For example, you might have accidentally installed something in your home folder.

    7. Try running npm ls webpack in your project folder.
       This will tell you which other package (apart from the expected react-scripts) installed webpack.

If nothing else helps, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
That would permanently disable this preflight check in case you want to proceed anyway.

P.S. We know this message is long but please read the steps above :-) We hope you find them helpful!

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! my-react@0.1.0 start: `react-scripts start`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the my-react@0.1.0 start script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\11510\AppData\Roaming\npm-cache\_logs\2020-09-29T07_32_50_970Z-debug.log  	 
~~~

解决办法：

在my-react文件中新建.env文件，内容为   SKIP_PREFLIGHT_CHECK=true

即可解决

然后  npm start  /yarn start



Welcome to React



文件：

app.js(汇总组件)  -->  index.js --> index.html

- public	-index.html	 root 	html
- src    App.js     root    js    输出到    index.js