# yum makecache的作用


# yum makecache的作用

疑问：
yum makecache 的作用到底是什么呢?
查看了很多的资料，都说是会从服务器中下载一些信息，但是我做了一个测试。

[root@localhost 7]# yum clean all
[root@localhost 7]# yum install createrepo -y
[root@localhost 7]# yum remove createrepo -y
断网之后
[root@localhost 7]# yum install createrepo -y #安装成功
#发现还是可以安装成功，所以可以判断这时通过缓存安装的。但是为了严谨再执行以下命令。

[root@localhost 7]# yum clean all #清理缓存再安装
[root@localhost 7]# yum install createrepo -y #安装失败

根据上述实验，我们可以判断yum 安装软件包的时候就已经把该软件包缓存起来了，而不需要执行yum makecache 进行额外的缓存。

但是很多资料中都说安装好软件之后需要执行yum makecache 这个命令进行缓存。(不知道是什么原因)

总结：yum安装的时候会将安装包进行缓存，不过最好还是再执行一下yum makecache命令。
