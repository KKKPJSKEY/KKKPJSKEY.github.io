# CentOS7 Docker启动失败（can't create unix socket /var/run/docker.sock: is a directory）


# CentOS7 Docker启动失败（can't create unix socket /var/run/docker.sock: is a directory）

```shell
# service docker start
Redirecting to /bin/systemctl start docker.service
Job for docker.service failed because the control process exited with error code. See "systemctl status docker.service" and "journalctl -xe" for details.
# systemctl status docker.service
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; disabled; vendor preset: disabled)
  Drop-In: /usr/lib/systemd/system/docker.service.d
           └─flannel.conf
   Active: failed (Result: exit-code) since Wed 2018-08-29 04:54:57 UTC; 20s ago
     Docs: https://docs.docker.com
  Process: 10689 ExecStart=/usr/bin/dockerd (code=exited, status=1/FAILURE)
 Main PID: 10689 (code=exited, status=1/FAILURE)
****** systemd[1]: Starting Docker Application Container Engine...
****** dockerd[10689]: can't create unix socket /var/run/docker.sock: is a directory
****** systemd[1]: docker.service: main process exited, code=exited, status=1/FAILURE
******systemd[1]: Failed to start Docker Application Container Engine.
******systemd[1]: Unit docker.service entered failed state.
******systemd[1]: docker.service failed.
```

## 解决

```shell
# 删除docker.sock
rm -rf   /var/run/docker.sock
# 重新启动即可
service docker restart
```


