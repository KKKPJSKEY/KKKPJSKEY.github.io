# Git仓库初始化


# Git仓库初始化

> 自行在系统环境中安装Git，这里不做介绍

```shell
#Git 本地仓库初始化，生成.git的隐藏文件
git init
# 配置个人信息邮箱、姓名 --global是指全局有效，无论在哪个仓库均有效
## 姓名
git config --global user.name "{name}"
# 示例
git config --global user.name "zhangsan"
## 邮箱
git config --global user.email {email.example.com}
# 示例
git config --global user.name "{zhangsan.qq.com}"
# 查看配置信息
git config --list
# 修改配置信息
# 重新添加一次即可覆盖
# 或
git config --global configName configValue
# 删除
git config  --global --unset configName   (只针对存在唯一值的情况)
```


