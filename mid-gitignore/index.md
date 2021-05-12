# 项目中途添加.gitignore不生效


# 项目中途添加.gitignore不生效的办法

## 方法一

```shell
# 清除 缓存区
git rm -r --cached .
# 再执行正常的提交流程即可
# 我的 gitignore
**/*.md
```

## 方法二

删除.git文件，重新执行

```shell
# 初始化
git init
```

即可
