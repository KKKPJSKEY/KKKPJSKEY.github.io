# Apache:No match for argument: httpd


# Apache:No match for argument: httpd

## 找到yum.conf

```
[root@d78acc291c9e var]# find / -name yum.conf
/etc/yum.conf
```

## 注释掉exclude那行，也可只删除httpd

```
[main]
gpgcheck=1
installonly_limit=3
clean_requirements_on_remove=True
best=True
#exclude=httpd nginx php mysql mairadb python-psutil python2-psutil
```

```
//重新安装yum install httpd -y
systemctl enable httpd
systemctl start httpd
systemctl status httpd
```

　　Active: **active (running)**

　　Status: "Started, listening on: port 80"

```
[root@d78acc291c9e var]# httpd -v
Server version: Apache/2.4.37 (centos)
Server built:   Dec 23 2019 20:45:34
```

![1](./1.png)
