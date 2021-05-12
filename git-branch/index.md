# Git-Branch分支操作


# Git-Branch分支操作

## 创建分支

```shell
# 根据名称创建分支,并切换分支
git checkout -b {name}
# 示例
git checkout -b zhangsan
# 这条指令是 
git checkout zhangsan 
# 和 
git branch zhangsan 
# 两条指令的结合体
```

## 查看分支

```shell
# 查看所有分支，当前分支为绿色
git branch [-a]
# -a 所有分支
# 创建分支
git branch mybranch
# 切换分支
git checkout mybranch
```



## 修改分支名称

```shell
# 需要将分支br_rename_old修改为br_rename_new，执行如下步骤：
## 1、切换到br_rename_old分支，如果已经在这个分支下，可以不执行此步骤
git checkout br_rename_old
## 2、将代码更新到和远程仓库一致
git pull origin br_rename_old
## 3.1、将本地仓库的br_rename_old的名称修改为br_rename_new
git branch -m br_rename_old br_rename_new
## 3.2、将本地仓库的当前分支的名称修改为br_rename_new
git branch -m br_rename_new
## 4、将远程分支br_rename_old删除
git push origin --delete br_rename_old
## 5、将本地分支push到远程仓库
git push --set-upstream origin br_rename_new
```

## 备份分支

根据git当前提交节点创建分支button-and-input，继承之前所有提交代码

```shell
git branch button-and-input
```

### 方法一

将本地创建的button-and-input分支提交到远程，名字为button-and-input

```shell
git push origin button-and-input:button-and-input
```

## 方法二

正常提交代码流程但最后一步提交到新创建的仓库或之前做过直接可以提交至新创建的远程仓库分支

```shell
git add .
git commit -m "Message"
git push origin button-and-input
```

二者都能达到备份代码目的


## 其他

```shell
合并分支：(merge from) $ git checkout master
$ git merge mybranch (merge from mybranch)
删除本地分支： $ git branch -d mybranch
强制删除分支： $ git branch -D mybranch
列出所有分支： $ git branch
```

## 非绝对必要且明白产生其他后果时才能进行的操作

```shell
# 切换分支 在没有commit时请备份代码或者commit、push后再进行提交否则，会导致当前代码全部丢失
git checkout mybranch
```


