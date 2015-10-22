# 前端项目模板

> *目前模板还处在探索阶段*

[TOC]

## 模板说明

本模板目标在于为电子科技大学创联工作室进行中小型项目的web前端开发时提供一个通用的开发模板。模板自身基于`npm` `grunt`和`bower`这三个工具实现项目的初始化、开发过程中的编译和项目发布，并推荐使用`git`来实现项目的管理和多人合作开发。

我们在这个模板中推崇使用*模块化*的方式进行项目开发，无论是`css`还是`JavaScript`，因此在模板设计之初就充分考虑了模块化时的一系列需求。对于`css`我们使用`sass`来进行开发，因为`sass`的mixin、extend、include等一系列特色都十分贴近我们对于模块化开发的需求。而对于`JavaScript`，我们推荐使用AMD规范（requireJS）来对代码进行组织，因此我们默认在项目的开发工具中引入了`grunt-contrib-requirejs`，便于我们在将来使用`r.js`来对项目进行优化。

-------------------------------------------------

## 项目环境

### Node.js以及npm

感谢Node.js，你可以点击[这里][nodejs@git]来访问他们的github，或者直接在[nodejs官方主页][nodejs@download]直接下载编译好的版本。

鉴于某些特殊的原因，我们在使用npm可能会遇到不可抗拒的网络原因，好在国内有着非常优秀的npm仓库镜像源可以很好的解决这个问题，在这里我们使用来自淘宝的镜像源。具体方法如下：

    npm config set registry http://registry.npm.taobao.org

你还可以在[TAONPM][npmmirror]看到镜像服务器的状态和其它的一些资讯。

### grunt

超酷的自动化构建工具，且提供数量庞大的插件来为你自动完成各种各样的任务。在安装了`nodejs`之后，你可以使用以下命令来安装grunt：

    npm install -g grunt-cli

然后你就可以像使用其他命令一样使用grunt了。关于具体的使用方法，可以访问[Grunt中文网][grunt]来获取更多资讯。

### bower

前端包管理工具，免去了我们每次开发项目前四处下载粘贴各种常见库的烦恼（以前这个真的是烦恼），`bower`可以帮我们完成各种前端库的搜索、下载、安装、版本控制等一系列工作。安装方式和`grunt`类似：

    npm install -g bower

关于`bower`的具体使用方法，可以在[bower的主页][bower]找到。

### sass

`sass`是对css语法的扩充，增加了规则、变量、混入、选择器、继承等等特性。但是它的命令行工具是基于`ruby`编写的，因此我们需要先安装`ruby`：

    sudo apt-get install ruby

仍然是某些特殊的原因，我们可能需要变更一下它的默认源：

    gem sources --remove http://rubygems.org
    gem sources --add http://ruby.taobao.org

最后安装sass：

    gem install sass

最后推荐一个[sass教程][sasstutorial]。

--------------------------------------------------------

## 目录结构

> `/`代表项目的根目录
> 只对重要的目录和文件进行解释

### `/node_modules`和`/bower_components`

### `/package.json`

这个文件中应当记录项目相关的信息，区块间以空行分开，第一区块为必填，第二块为选填，第三块为基本信息，通常情况下不进行修改。

### `/Gruntfile.js`

里面包含了grunt任务的配置信息，可以自行修改，我们对它进行了一些基本配置，详见Grunt命令一节

### `/src`

源码文件夹

### `/release`

使用`release`指令后会将`src`中的资源文件压缩打包后按照一定规则放入该文件夹，与`/src`中的目录结构基本一致（可能会有一些文件夹不存在）

### `/src/static`

所有的静态文件都放置于其中，包括`js`、`css`、`sass`、`packages`、字体文件、图片、视频等，只要是项目需要的静态文件都应当分类置于该目录下

### `/src/static/css`、`/src/static/sass`、`/src/static/js` 

这三个目录用于放置相应的代码文件，需要指出的是，在使用`dev`指令后，会将编译出的`.css`以相同的目录结构放置在`css/`目录下。每一个文件夹下还包含了`modules`和`boot`两个文件夹，`modules`用于存放模块文件，而`boot`则存放将模块进行组装和启动的调用文件（通常情况下一个`boot/`下的文件对应了一个页面）。

### `/src/static/packages`

这个目录下放置项目所需要的包文件，不区分是`css`还是`javascript`包，都以包为组织单位放置在相应的目录下。目录结构可能与原项目不一致，因为在某些包中同时包含`css`和`javascript`等不同类型的文件，我们在`Gruntfile`对常用库进行了一些特殊处理以方便我们在项目中进行调用并保证项目的最小化。这个文件夹会在初始化时，将`bower`安装好的包拷贝至此处

--------------------------------------------------------

## Grunt任务

### 概述

我们将整个向项目的开发规划为了三个`grunt`指令，分别是`init`、`dev`和`release`，它们分别对应了项目初始化、项目开发和项目发布三个阶段。对于每一个指令，我们可以向下面这样进行调用：
    
    grunt 指令名

### init指令

`init`指令将帮助我们将安装好的`bower`组件按照一定规则迁移到`/src/static/packages`目录下，我们在`Gruntfile`对一些常用的组件进行了定义，具体参照`get`函数中的`libs`变量。
在自定义规则时，可以调用`get`函数来简化参数设置，`get`函数的三个参数分别代表包名、主要文件所在的文件夹和主要文件名。如果在`libs`中已经定义了这个包则可以只指明包名。

### dev指令

`dev`指令用于将`.sass`文件编译好并按照相同的目录结构存放在`/src/static/css`下

### release指令

`release`指令用于发布`/src`下的内容至`/release`目录下，目前它会做的工作有：

+ 完全按照`/src`的目录结构将所有文件迁移至`/release`目录下，但它不会对`/src/static/sass`（也许还会有less）进行迁移，也不会迁移编译产生的`.map`文件
+ 对`/src/static/css`和`/src/static/js`中的文件先进行压缩（具体压缩参数见`Gruntfile`），再进行迁移


[nodejs@git]: https://github.com/nodejs 'nodejs'
[nodejs@download]: https://nodejs.org/en/download/ 'nodejs download'
[npmmirror]: http://npm.taobao.org 'taobao npm mirror'
[grunt]: http://www.gruntjs.net/ 'grunt'
[bower]: http://bower.io/ 'bower'
[sasstutorial]: http://www.w3cplus.com/sassguide/ 'sasstutorial'