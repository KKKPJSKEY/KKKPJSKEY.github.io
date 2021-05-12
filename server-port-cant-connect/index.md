# 云服务器安装软件（端口）连接失败


# 云服务器安装软件（端口）连接失败

> 服务器需要进行控制面板对服务器端口进行放行如3306、8080
>

|                             软件                             |     默认、常用端口     |   协议   |
| :----------------------------------------------------------: | :--------------------: | :------: |
|                      HTTP协议代理服务器                      | 80/8080/3128/8081/9080 |   HTTP   |
|                     SOCKS代理协议服务器                      |          1080          |          |
|                FTP（文件传输）协议代理服务器                 |           21           |          |
|               Telnet（远程登录）协议代理服务器               |           23           |          |
|                                                              |                        |          |
|      HTTP服务器，默认的端口号（木马Executor开放此端口）      |           80           |   tcp    |
|        HTTPS（securely transferring web pages）服务器        |          443           | tcp /udp |
| Telnet（不安全的文本传送）（木马Tiny Telnet Server所开放的端口） |           23           |   tcp    |
| FTP（木马Doly Trojan、Fore、Invisible FTP、WebEx、WinCrash和Blade Runner所开放的端口）； |           21           |   tcp    |
|           TFTP（Trivial File Transfer Protocol ）            |           69           |   udp    |
|        SSH（安全登录）、SCP（文件传输）、端口重定向，        |           22           |   tcp    |
| SMTP Simple Mail Transfer Protocol (E-mail)，（木马Antigen、Email Password Sender、Haebu Coceda、Shtrilitz Stealth、WinPC、WinSpy都开放这个端口）； |           25           |   tcp    |
|              POP3 Post Office Protocol (E-mail)              |          110           |   tcp    |
|                           WebLogic                           |          7001          |          |
|                      WebSphere应用程序                       |          9080          |          |
|                      WebSphere管理工具                       |          9090          |          |
|                            JBOSS                             |          8080          |          |
|                            TOMCAT                            |          8080          |          |
|                       WIN2003远程登陆                        |          3389          |          |
|                  Symantec AV/Filter for MSE                  |          8081          |          |
|                         Mysql数据库                          |          3306          |          |
|                        Oracle 数据库                         |          1521          |          |
|                         ORACLE EMCTL                         |          1158          |          |
|                  Oracle XDB（ XML 数据库）                   |          8080          |          |
|                      Oracle XDB FTP服务                      |          2100          |          |
|                  MS SQL SERVER数据库server                   |          1433          | tcp /udp |
|                  MS SQL*SERVER数据库monitor                  |          1434          | tcp /udp |
|                              QQ                              |          1080          |   udp    |


