# Docker 容器常见故障排查及处理


# Docker 容器常见故障排查及处理

## Docker是一种相对使用较简单的容器，我们可以通过以下几种方式获取信息：

1、通过docker run执行命令，或许返回信息
2、通过docker logs 去获取日志，做有针对性的筛选
3、通过systemctl status docker查看docker服务状态
4、通过journalctl -u docker.service 查看日志

## 以下是整理的docker容器类问题故障，分为9个类

### 一、启动类故障

#### 1、docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

原因：Docker未正常启动
解决方式：
systemctl start docker

#### 2、can’t create unix socket /var/run/docker.sock: is a directory

原因：docker.sock不能创建
解决方式：
rm -rf /var/run/docker.sock
然后重新启动docker

#### 3、Job for docker.service failed. Failed to start Docker Application

原因：Selinux引起
解决方式：
/etc/sysconfig/selinux , 把 selinux 值改为disabled
重启docker解决

#### 4、docker: Error response from daemon:

/var/lib/docker/overlay/XXXXXXXXXXXXXXXXXXXXXXX: no such file or directory.
原因：docker没有指定目录或文件
解决方式：
systemctl stop docker
rm -rf /var/lib/docker/*
systemctl start docker
重启run镜像启动容器

#### 5、docker: Error response from daemon: Conflict. The container name “XXX” is already in use by container “XXX”. You have to remove (or rename) that container to be able to reuse that name.

原因：docker name重名
解决方式：
改名容器或者删除重建容器

#### 6、Error: Connection activation failed: No suitable device found for this connection

原因：网卡配置问题
解决方式：
重启网卡

#### 7、系统重启后docker无法启动

报错为：docker0: iptables: No chain/target/match by that name
原因：docker服务iptables问题
解决方式：
重启docker服务system restart docker

#### 8、Error starting daemon: error initializing graphdriver: driver not supported

使用overlay2存储驱动启动docker daemon报错
原因：daemon缺少配置
解决方式：
添加配置：
/etc/docker/daemon.json
{“storage-driver”: “overlay2”,
“storage-opts”: [“overlay2.override_kernel_check=true”]}

#### 9、Failed to start docker.service: Unit docker.service is masked.

未知原因：docker 被mask
解决方式：
systemctl unmask docker.service
systemctl unmask docker.socket
systemctl start docker.service

#### 10、Failed to start docker.service: Unit is not loaded properly: Invalid argument.

未知原因：docker服务无法正常load
解决方式：
卸载docker， 删除docker.service
重新安装docker

#### 11、docker-compose启动容器时报错：

/usr/lib/python2.7/site-packages/requests/init.py:80: RequestsDependencyWarning: urllib3 (1.22) or chardet (2.2.1) doesn’t match a supported version! RequestsDependencyWarning)

未知原因：pip相应组件版本不支持
解决方式：
pip uninstall urllib3
pip uninstall chardet
pip install requests

#### 12、docker容器重启故障

强杀docker进程后，重启docker。docker中的容器无法启动并报错
docker restart XXXXXXX Error response from daemon: Cannot restart container XXXXXXX: container “XXXXXXXXXXXXXXXX”: already exists

原因：旧容器未安全退出
解决方式：
docker-containerd-ctr --address /run/docker/containerd/docker-containerd.sock --namespace c rm <容器hash_id>

docker start 容器

#### 13、docker重启错误-重启命令一直卡住

systemctl restart docker 卡住
未知原因：可能是启动的容器数量过多，或者磁盘IO问题
解决方式：
systemctl start docker-cleanup.service
systemctl start docker

### 二、权限问题报错

#### 14、Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock

解决方式：

查看 /var/run/docker.sock所在用户组

将用户重新加入docker组中，usermod -aG docker ${USER}

#### 15、chown socket at step GROUP: No such process

原因：docker无法找到Group组信息，docker组有可能被误删除，

解决方式：

groupadd docker

#### 16、Post http:///var/run/docker.sock/v1.XXX /auth: dial unix /var/run/docker.sock: permission denied. Are you trying to connect to a TLS-enabled daemon without TLS?

原因：非Root用户管理Docker时，权限不足

解决方式：

groupadd docker

usermod -a -G docker user

#### 17、docker commit镜像时报错

Error processing tar file(exit status 1): unexpected EOF

原因：可能是权限问题引起

解决方式：

chmod +x 加一个执行权限

### 三、镜像和仓库问题报错

#### 18、Get https://registry-1.docker.io/v2/: dial tcp: lookup registry-1.docker.io

原因：Docker仓库无法访问

解决方式：

修改Docker仓库源为国内或者自建的仓库源

修改/etc/docker/daemon.json

#### 19、推送本地镜像报错

The push refers to a repository [XXXX] Get https://xxx/v1/_ping: http: server gave HTTP response to HTTPS client

原因：docker registry未采用https服务所致

解决方式：

/etc/docker/daemon.json 文件写入：

{ “insecure-registries”:[""] }

#### 20、/usr/bin/docker-current: Error response from daemon: oci runtime error: container_linux.go: starting container process caused “exec: “/bin/bash”: executable file not found in $PATH”.

原因：Docker镜像自身问题或者Docker引擎版本比较低导致

解决方式：

可以升级Docker版本服务

#### 21、构建镜像，执行chown -R非常慢

原因：Docker使用写时复制策略，所以chown命令执行时，会将上层镜像文件全部复制到当前层，然后再修改权限，再写入文件系统。

解决方式：

不应该使用chown -R 这类大批量修改文件的命令

#### 22、docker build构建镜像的时候报错：

Message from syslogd kernel:unregister_netdevice: waiting for lo to become free. Usage count = 1

原因：docker engine版本过高

解决方式：

docker engine版本需要和docker内部镜像的内核版本匹配

#### 23、docker: Error response from daemon: containerd: container did not start before the specified time-out.ERRO[0133] error getting events from daemon: context canceled

原因：修改完docker root dir，重启后，下载镜像报错

解决方式：

重启docker服务

或者重启服务器

### 四、资源问题报错

#### 25、Docker no space left on device

原因：空间不足

解决方式：清理空间,删除未被使用的容器，镜像等资源

docker system prune -a

#### 26、/var/lib/docker/containers 占用过大

原因：日志文件占用过大

解决方式：

cat /dev/null > *-json.log

或者

增加dockerd启动参数，/etc/docker/daemon.json

{“log-driver”:“json-file”,

“log-opts”: {“max-size”:“2G”, “max-file”:“10”}

#### 27、max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]

原因：系统参数默认配置过小

解决方式：

修改/etc/sysctl.conf里面的vm.max_map_count 调大

#### 28、Got starting container process caused "process_linux.go:301:running exec setns process for init caused “exit status 40"”: unknown.from time to time

原因：可能是cache问题引起

解决方式：

echo 1 > /proc/sys/vm/drop_caches

#### 29、docker本机启动多台容器导致出现后续容器启动失败

原因：查看硬盘空间是否满，如果不是硬盘空间问题引起

解决方式：

vim /etc/sysctl.conf

添加参数 fs.aio-max-nr = 1048576

sysctl -p

#### 30、Docker启动异常，状态反复restarting

Docker logs 容器名，查看异常日志

查看/var/log/messages

原因：内存跑满，引起OOM

解决方式：

释放内存后，再启动容器

### 五、版本不兼容报错

#### 31、overlayfs: Can’t delete file moved from base layer to newly created dir even on ext4

原因：Centos 提供的文件系统 XFS 和 Overlay 兼容问题导致,

解决方式：

这个问题的修复在内核 4.4.6以上

#### 32、docker: Error response from daemon: OCI runtime create failed: container_linux.go:344: starting container process caused “process_linux.go:297: getting the final child’s pid from pipe caused “read init-p: connection reset by peer””: unknown.

原因：Docker版本和操作系统版本不匹配

解决方式：

重新安装和操作系统内核支持的docker 版本

### 六、网络或端口问题报错

#### 33、WARNING: IPv4 forwarding is disabled. Networking will not work.

原因：ipv4网络无法转发

解决方式:

/usr/lib/sysctl.d/00-system.conf

在最后一行添加net.ipv4.ip_forward=1

重启network服务。删除错误的容器，再次创建新容器

#### 34、Creating network “xxxxxxx” with the default driver

原因：docker网关冲突

启动容器、docker-compose启动容器后，断网问题

解决方式：

配置 docker-compose.yml内给启动的容器配置参数network_mode: “bridge”

#### 35、Unable to find a node that satisfies the following conditions [port xxxx]

原因：当容器使用端口映射(docker run -p xxxx:xxxx或 compose模板中的

ports)之后 系统会在宿主机上创建一个port，通过NAT来访问容器的指定port。如果宿主机上的端口被容器或者系统进程占用，就会导致端口分配失败。

解决方式：

清除占用端口的容器或者进程，或调整容器端口映射的宿主机端口避免冲突

#### 36、Error response from daemon: service endpoint with name xxx already

原因：端口已经被占用

解决方式：

重启docker容器

#### 37、docker: Error response from daemon: driver failed programming external connectivity on endpoint XXXXX: Bind for 0.0.0.0:80 failed: port is already allocated

原因：容器端口冲突

解决方式：

更换宿主机绑定端口

### 七、Docker安装报错

#### 38、安装docker报Requires: container-selinux >= 2.9

原因：container-selinux版本低或者是没安装的原因

解决方式：

wget -O /etc/yum.repos.d/CentOS-Base.repo

http://mirrors.aliyun.com/repo/Centos-7.repo

yum install epel-release

yum makecache

yum install container-selinux

#### 39、安装docker-compose时报错

“ImportError: ‘module’ object has no attribute ‘check_specifier’”

原因：setuptools版本问题

解决方式：

升级setuptools到30.1.0版本以上版本

pip install --upgrade setuptools

#### 40、安装docker-compose时报错

DEPRECATION: Python 2.7 will reach the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 won’t be maintained after that date. A future version of pip will drop support for Python 2.7.

原因：python2.7提示升级

解决方式：

pip install -i https://pypi.douban.com/simple docker-compose

### 八、Docker删除报错

#### 41、docker删除容器报错

Error response from daemon:Driver overlay failed to remove root filesystem xxxxx: remove/var/lib/docker/overlay2/xxxxx/merged: device or resource busy

原因：容器挂载数据卷，无法直接删除

解决方式：

grep docker /proc/*/mountinfo | grep xxxxx

kill进程后

再重新删除容器

#### 42、状态dead的容器删除报错

Error response from daemon: Driver aufs failed to remove root filesystem XXXXXXXXXXXXXXXX: aufs: unmount error after retries: /var/lib/docker/aufs/mnt/xxxxxxxx: device or resource busy

原因：dead状态容器无法删除，还在占用资源

解决方式：

docker rm -fv 容器id 过几分钟后会自动删除

#### 43、docker删除镜像报错

Error response from daemon: conflict: unable to remove repository reference “XXXX” (must force) - container XXXX is using its referenced image YYYY

原因：镜像正在被某容器使用

解决方式：

需要删除相关ID容器后，才能删除镜像

#### 44、docker删除镜像报错

Error response from daemon: conflict: unable to delete XXXXXXXXXX (must be forced) - image is referenced in multiple repositories

原因：镜像login push 了远端其他仓库

解决方式：

如果不需要此镜像， docker rmi -f 强删

#### 45、docker删除镜像报错

Error response from daemon: conflict: unable to delete XXX (cannot be forced) - image has dependent child images

原因：存在依赖于父镜像的子镜像

解决方式：

强制删除镜像或者批量删除容器，再删除镜像

### 九、其他报错

#### 46、docker: Error response from daemon: driver failed programming external connectivity on end-point XXXXXXX: (iptables failed: iptables --wait -t filter -A DOCKER ! -i docker0 -o docker0 -p tcp -d 172.17.0.2 --dport 8080 -j ACCEPT: iptables: No chain/target/match by that name.

原因：防火墙问题引起

解决方式：

关闭防火墙，重启docker

#### 47、执行docker info出现如下警告

WARNING: bridge-nf-call-iptables is disabled
WARNING: bridge-nf-call-ip6tables is disabled

原因：配置问题引起，需要启用bridge-nf-call-iptables

解决方式：

vi /etc/sysctl.conf

添加以下内容

net.bridge.bridge-nf-call-ip6tables = 1

net.bridge.bridge-nf-call-iptables = 1

net.bridge.bridge-nf-call-arptables = 1

#### 48、docker数据库相关报错

使用Docker创建mysql容器闪退

Database is uninitialized and password option is not specified

解决方式：

docker run -d -e MYSQL_ROOT_PASSWORD=[密码] -p 3306:3306 mysql镜像

Docker使用规范建议
尽量使用最近1-2年的新的稳定的docker版本

不要去安装今年前很老的版本，大量的bug已经被新版本更新解决掉了

尽量不要去创建非常大的镜像，比如5G10G以上的

镜像要尽量轻量化，去除不必要的软件，数据等

容器内挂载宿主机配置，使用只读

容器需要-v 宿主机的配置文件，尽量使用ro只读

数据要挂载宿主机物理硬盘或存储节点上

不要直接在容器里run，避免容器宕机引起数据丢失

应用日志一定要挂到宿主机上

不要直接打印到容器内，避免只能docker logs方式查看，避免去vulume目录里查看日志

不要只使用latest标签

Tag要有个管理标准，可以根据tag查找对应版本

不要使用容器ip，配置里更不能写死（默认172.17.0.x）

容器重启后，ip很可能会变

尽量不要在单容器内跑多进程

容器不是虚拟机，尽量做到1个容器，1个进程

跨环境镜像保持一致

不论是测试，UAT，生产环境，尽量保持同一个镜像，不要变更，环境变更只需要变更环境变量参数做区分

一定监控docker容器，即使发现问题

建议使用prometheus监控容器

一定要限制docker容器的资源， 尤其是CPU、内存、硬盘空间，甚至是网络等，避免侵占宿主机的硬件资源
