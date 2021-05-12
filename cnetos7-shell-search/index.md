# CentOS7 查询的几种方式


# CentOS7 查询的几种方式

## 1. find

　　[Java](http://java.chinaitlab.com/)代码

　　find是最常见和最强大的查找命令，你可以用它找到任何你想找的文件。与查询数据库（/var/lib/locatedb）文件不同，find查找磁盘空间

　　find的使用格式如下：

```
$ find <指定目录> <指定条件> <指定动作>
```

　　- <指定目录>: 所要搜索的目录及其所有子目录。默认为当前目录。

　　- <指定条件>: 所要搜索的文件的特征。

　　- <指定动作>: 对搜索结果进行特定的处理。

　　如果什么参数也不加，find默认搜索当前目录及其子目录，并且不过滤任何结果（也就是返回所有文件），将它们全都显示在屏幕上。

　　find的使用实例：

```shell
$ find . -name 'my*'
```

　　搜索当前目录（含子目录，以下同）中，所有文件名以my开头的文件。

```shell
$ find . -name 'my*' -ls
```

　　搜索当前目录中，所有文件名以my开头的文件，并显示它们的详细信息。

```shell
$ find . -type f -mmin -10
```

　　搜索当前目录中，所有过去10分钟中更新过的普通文件。如果不加-type f参数，则搜索普通文件+特殊文件+目录。

根据文件名查询

```shell
find -name [文件名]
```

根据文件夹名查询

```shell
find [文件夹名]
```

## 2. locate

　　[Java](http://java.chinaitlab.com/)代码

　　locate命令其实是"find -name"的另一种写法，但是要比后者快得多，原因在于它不搜索具体目录，而是搜索一个数据库（/var/lib/locatedb），这个数据库中含有本地所有文件信息。Linux系统自动创建这个数据库，并且每天自动更新一次，所以使用locate命令查不到最新变动过的文件。为了避免这种情况，可以在使用locate之前，先使用updatedb命令，手动更新数据库。

　　locate命令的使用实例：

```shell
$ locate /etc/sh
```

　　搜索etc目录下所有以sh开头的文件。

```shell
$ locate ~/m
```

　　搜索用户主目录下，所有以m开头的文件。

```shell
$ locate -i ~/m
```

　　搜索用户主目录下，所有以m开头的文件，并且忽略大小写。

## 3. whereis

　　Java代码

　　whereis命令只能用于程序名的搜索，而且只搜索二进制文件（参数-b）、man说明文件（参数-m）和源代码文件（参数-s）。如果省略参数，则返回所有信息。同locate一样，查询数据库（/var/lib/locatedb）文件

　　whereis命令的使用实例：

```shell
$ whereis grep
```



## 4. which

　　Java代码

　　which命令的作用是，在PATH变量指定的路径中，搜索某个系统命令的位置，并且返回第一个搜索结果。也就是说，使用which命令，就可以看到某个系统命令是否存在，以及执行的到底是哪一个位置的命令。

　　which命令的使用实例：

```shell
$ which grep
```



## 5. type

　　Java代码

　　type命令其实不能算查找命令，它是用来区分某个命令到底是由shell自带的，还是由shell外部的独立二进制文件提供的。如果一个命令是外部命令，那么使用-p参数，会显示该命令的路径，相当于which命令。

　　type命令的使用实例：

```shell
$ type cd
```

　　系统会提示，cd是shell的自带命令（build-in）。

```shell
$ type grep
```

　　系统会提示，grep是一个外部命令，并显示该命令的路径。

```shell
$ type -p grep
```

　　加上-p参数后，就相当于which命令


