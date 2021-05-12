# CentOS7下 javac:未找到命令


# CentOS7下 javac:未找到命令

## 问题描述：

在linux下编译java程序，执行javac编译生成class文件时，在centos7终端输入如，javac hello.java 会提示未找到指令，但用java -verison测试环境变量是没问题的。

## 尝试解决：

重新再linux配置环境变量，输入 vi /etc/profile进入，添加以下代码：

```shell
export JAVA_HOME=/usr/local/jdk1.8.0_144
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
```

## 再测试，最后也没有成功

后来在stackoverflow上看到了这个

> 84 down vote accepted You installed the Java Runtime Environment (JRE)
>
> only, which does not contain javac. For javac, you have to install the
>
> OpenJDK Development Environment. You can install java-devel or
>
> java-1.6.0-openjdk-devel, which both include javac.
>
> By the way: you can find out which package provides javac with a yum
>
> search, e.g.
>
> su -c ‘yum provides javac’ Another note: using yum and openjdk is only
>
> one possibility to install the JDK. Many people prefer Sun/Oracle’s
>
> “original” SDK. See How to install Java SDK on CentOS? and links for
>
> alternatives.

大意就是我们用yum来装原生的就行了

在终端输入

```sh
yum install java-devel
```

执行安装，再测试就行了

补充：Vi编辑常用快捷键

```
复制：ctrl+insert
粘贴：shift+insert
```

按Esc保存退出编译，shift+zz退出
