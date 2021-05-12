# CentOS7运行Docker报错 Cannot connect to the Docker daemon at unix:///var/run/docker.sock. 


# CentOS7运行Docker报错"Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?"

执行命令：sudo dockerd --debug

> 注意此条指令不能Ctrl+C停止，否则还会出现一样的错误

之后重启docker：systemctl restart docker就可以了



在网上搜了半天，有的是去编辑 /etc/docker/daemon.json 文件，而有的是在 docker.service

如果在 /etc/docker/daemon.json 的解决办法：添加 insecure-registries 即可
sudo vim /etc/docker/daemon.json

```json
{
"registry-mirrors": ["https://zydiol88.mirror.aliyuncs.com"],
"insecure-registries": ["161.17.60.38:85"]
}
```

如果是在 docker.service 解决办法：在 ExecStart 添加 --insecure-registry

```shell
find / -name docker.service -type f
/usr/lib/systemd/system/docker.service

# 在 ExecStart 这行后面加上 -insecure-registry=Harbor登录地址
sudo vim /usr/lib/systemd/system/docker.service
ExecStart=/usr/bin/dockerd --insecure-registry=161.17.60.38:85

sudo systemctl daemon-reload
sudo systemctl restart docker
```

重启完成后重新登录即可

```shell
# 在linux总端登录Harbor：
sudo docker login -u tens -p Tens123456 161.17.60.38:85
```


