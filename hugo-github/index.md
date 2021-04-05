# Hogo创建GitHub Pages


近些年GoLang语言逐渐火爆起来，Golang语言所做的静态博客固然也映入眼帘。相比于动态博客，静态博客的好处不言而喻，开发难度极低，不需要后台和数据库，更不需要昂贵的服务器成本和花费运维成本去维护。应老师要求以及个人未来发展，故学习静态博客的部署。本文因此介绍hugo和GitHub.io的初次使用搭建个人博客

## 1    本地部署blog

### 1.1    快速开始

#### 1.1.1、安装方法介绍

> hugo_GitHub:[https://github.com/gohugoio/hugo](https://github.com/gohugoio/hugo)
>
> Official_Website:[https://gohugo.io/](https://gohugo.io/)

不同的操作系统有着不同的安装方式，官方推荐Linux或者Mac下可以使用brew或者port 进行安装Windows推荐使用Chocolatey或者Scoop进行安装，或者使用GitHub中的源码进行安装，我选择GitHub的Relaeases包进行安装，因为它不需要其他包管理工具进行安装。其他安装方式请参阅官方安装文档

> https://gohugo.io/getting-started/installing

可以使用Git工具进行下载源码，或者使用GitHub自带的Donwload Zip进行下载速度慢的话考虑码云转移仓库加速或csdn相关加速服务~~，甚至孙悟空的魔法~~

```shell
git clone [ssh address][http address]
#示例
git clone git@github.com:gohugoio/hugo.git #SSH
#或者
git clone https://github.com/gohugoio/hugo.git #HTTP
```

#### **1.1.2、我的办法**

![1](/images/hugo-GitHub/1.png)

![2](/images/hugo-GitHub/2.png)

[`https://github.com/gohugoio/hugo/releases`](https://github.com/gohugoio/hugo/releases)此链接选择最新版，选择对应系统版本下载即可（我的是windows）

![3](/images/hugo-GitHub/3.png)

![4](/images/hugo-GitHub/4.png)

下载后进行解压只有三个文件，个人将hugo.exe文件放入bin目录，将网站问建放入sites目录，其他文件放在根目录

在当前目录执行（未配置环境变量）

任意处执行（配置环境变量）

```shell
cd bin
hugo version
```

![5](/images/hugo-GitHub/5.png)

单击环境变量（1），创建HOGO_HOME（2），填写路径（3），在原来Path下（4）添加bin目录（5）

执行命令后有类似返回结果（6）说明安装hugo成功（在系统环境变量中（Windows可以在Cotana直接搜索环境变量））

### 1.2    创建网站

```shell
#返回上一级目录下的网站目录
cd ../sites
hugo new site [site nme]
#示例
hugo new site KKKPJSKEY's-Case-Archives
```

### 1.3    选择主题

在[`https://themes.gohugo.io/`](https://themes.gohugo.io/material-design/)这个网址选择你喜欢的主题

![6](/images/hugo-GitHub/6.png)

[`https://themes.gohugo.io/material-design/`](https://themes.gohugo.io/material-design/)这是我的选择

点击download进入对应的GitHub页面，可以使用Git工具进行下载源码，或者使用GitHub自带的Donwload Zip进行下载速度慢的话考虑码云转移仓库加速或Csdn相关加速服务~~，甚至孙悟空的魔法~~

```shell
#切换到新建的网站目录下
cd KKKPJSKEY's-Case-Archives
git clone [ssh address][http address]
#示例
git clone git@github.com:pdevty/material-design.git themes/material-design #SSH
#或者
git clone https://github.com/pdevty/material-design.git themes/material-design #HTTP
```

（自行下载的压缩请手动解压到theme目录）

### 1.4    配置主题

#### 1.4.1、metadata

![7](/images/hugo-GitHub/7.png)

请将主题目录（1）下的默认配置文件（2）中的内容（3）与网站目录（4）下的默认配置文件（5）中的内容（6）进行整合，以网站目录下的默认配置文件为准，最终成河成（7）的样子即可

#### 1.4.2、其他配置

![8](/images/hugo-GitHub/8.png)

将根目录（1）下的config.toml文件（2）中的内容改为自己网站的内容（3）

我个人主题配置如上图所示，[其他配置请自行参照主题文档进行配置](https://themes.gohugo.io/material-design/)

### 1.5    生成模板MarkDown（带有metadata）

```shell
hugo new [类别]/[文件名]
#示例
hugo new blog/使用hugo、GitHub.io搭建个人静态博客.md
```

执行以上指令即可在以下路径生成对应的文件content/[类别]/[文件名]（生成一次后也可手动在content/[类别]/[文件名]创建文件，手动拷贝对应的metadata）（这里没有切换路径，但必须在网站根目录下进行）

### 1.6编写MarkDown

项目中其他请参照MarkDown语法规范，其中图片需要注意：图片应放到网站根目录下的static中。我为了国立不同静态资源，创建了imags和文章名两级文件夹，图片在MarkDown中应使用，同时使用顺斜杠替换原来反斜杠，

```shell
/[分类名]/[项目名]/图片名.格式  #个人分类法，非强制要求
#示例
/images/hugo-GitHub/1.png
```

同时使用顺斜杠替换原来反斜杠，

### 1.7     本地预览与部署

#### 1.7.1、本地预览

`hugo server [-D]`（这里没有切换路径，但必须在网站根目录下进行）

```shell
Start building sites …

                   | EN
-------------------+-----
  Pages            | 22
  Paginator pages  |  0
  Non-page files   |  9
  Static files     | 33
  Processed images |  0
  Aliases          |  8
  Sitemaps         |  1
  Cleaned          |  0

Built in 52 ms
Watching for changes in C:\Program_Green\hugo_extended_0.82.0_Windows-64bit\sites\KKKPJSKEY's-Case-Archives\{archetypes,content,data,layouts,static,themes}
Watching for config changes in C:\Program_Green\hugo_extended_0.82.0_Windows-64bit\sites\KKKPJSKEY's-Case-Archives\config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

执行后在[`http://localhost:1313/`](https://themes.gohugo.io/material-design/)可以进行访问（-D参数表示无论metadata（1.4.1）是否为true都进行发布，不加参数则只发布为false的项目，下面huge生成静态文件相同）

#### 1.7.2、生成静态文件用于发布

使用`hugo [-D]`生成静态文件，-D参数在1.6.1介绍的功能相同（这里没有切换路径，但必须在网站根目录下进行）

```shell
Start building sites …

                   | EN
-------------------+-----
  Pages            | 15
  Paginator pages  |  0
  Non-page files   |  9
  Static files     | 33
  Processed images |  0
  Aliases          |  5s
  Sitemaps         |  1
  Cleaned          |  0

Total in 167 ms
```

以上结果会在网站根目录下的public下生成静态页面

## 2    GitHub创建仓库

来到GitHub主页[`https://github.com/`](https://github.com/)（自行注册登录）

![9](/images/hugo-GitHub/9.png)

点击左上角新建仓库

![10](/images/hugo-GitHub/10.png)

输入自己的仓库名（1，我已经创建过不能使用相同的名字因此报错，仓库名没有格式限制，请自行发挥），设置仓库分类（2，公有是所有人能看到，私有是只有项目内成员能看到），点击创建即可（3）

## 3    使用Git提交生成的静态页面（1.6.2）

```shell
#切换到网站名字下的public下
cd public
#以下为git指令
##git 初始化
git init
##添加当前目录下的所有文件到暂存区
git add [.][-u][-A][-all]
##提交暂存区的指定文件到仓库区 -m是添加标签（Tag）信息
git commit [-m "{message}"]
##从将本地的分支版本上传到远程并合并。
git push
```

详细Git教程、参数解释在[Git笔记（挖坑）](javascrip:void(0))中，请移步

## 4在GitHub中进行页面展示设置

![11](/images/hugo-GitHub/11.png)

在你的仓库页面点击Settings（1），在新的页面向下滑动找到GitHub Pages下的Branch（2），选择master（3，或自己的分支），在对应的网址即可访问（4）

## 5 结语

至此使用hugo、Github.io搭建个人静态博客彻底完成
