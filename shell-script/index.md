# ShellScript（.sh）脚本语法知识


# ShellScript（.sh）脚本语法知识

## set -e的作用

```shell
#!/bin/bash
set -e
...
command 1
command 2
...
exit 0
```

> 你写的每个脚本都应该在文件开头加上set -e,这句语句告诉bash如果任何语句的执行结果不是true则应该退出。
> 这样的好处是防止错误像滚雪球般变大导致一个致命的错误，而这些错误本应该在之前就被处理掉。如果要增加可读性，可以使用set -o errexit，它的作用与set -e相同。

## 特殊变量（$0、$1、$2、 $?、 $# 、$@、 $*）

shell编程中有一些特殊的变量可以使用。这些变量在脚本中可以作为全局变量来使用。

| **名称** | **说明**                                                     |
| -------- | ------------------------------------------------------------ |
| $0       | 脚本名称                                                     |
| $1-9     | 脚本执行时的参数1到参数9                                     |
| $?       | 脚本的返回值                                                 |
| $#       | 脚本执行时，输入的参数的个数                                 |
| $@       | 输入的参数的具体内容（将输入的参数作为一个多个对象，即是所有参数的一个**列表**） |
| $*       | 输入的参数的具体内容（将输入的参数作为一个单词）             |

**$@与$\*的区别：**

　　**$@与$\*都可以使用一个变量来来表示所有的参数内容，但这两个变量之间有一些不同之处。**

　　**$@：将输入的参数作为一个列表对象**

　　**$\*：将输入的参数作为一个单词**

```shell
#源代码：
echo "脚本的名字是："$0
n=1
echo "使用\$@的参数列表为："$@
for temstr in "$@"
do
        echo "第$n个参数是：" $temstr
        let n+=1
done


n=1
echo "使用\$*的参数列表为："$*
for temstr in "$*"
do
        echo "第$n个参数是：" $temstr
        let n+=1
done
#执行结果：
$ ./test.sh 1 2 3 4
脚本的名字是：./test.sh
使用$@的参数列表为：1 2 3 4
第1个参数是： 1
第2个参数是： 2
第3个参数是： 3
第4个参数是： 4
使用$*的参数列表为：1 2 3 4
第1个参数是： 1 2 3 4
```

在上面的例子中，使用$@与$*是，都是用**双引号**引起来，但**当$\*不使用双引号时，结果与$@的结果相同**。

> 　　原因分析：
>
> 　　当都使用双引号时，我们可以看到参数列表输出都是一样的，说明确实两个变量都可以存储所有的参数内容，也就显示出来两个变量之间的对参数处理的不同，即一个将其作为列表处理，一个讲所有参数作为一个单词处理。
>
> 　　当$*不适用双引号时，执行到for语句时，会首先将$*的值（1 2 3 4 ）取出来，然后循环语句就变成了　for tem in 1 2 3 4 ，最后的输出结果也就变成了列表的循环输出。

------

```shell
#源码：
#!/bin/bash
n=1
for tem in $*
do 
    echo $n is $tem
    let n+=1
done 
```

------

```shell
执行结果：
# ./test.sh 1 2 3 4 
1 is 1
2 is 2
3 is 3
4 is 4
```

 

　　在这里补充一下**单引号、双引号以及没有引号的区别**：

> **单引号：**
>
> 　　可以说是所见即所得：即将单引号内的内容原样输出，或者描述为单引号里面看见的是什么就会输出什么。
>
>  
>
> **双引号：**
>
> 　　把双引号内的内容输出出来；如果内容中有命令，变量等，会先把变量，命令解析出结果，然后在输出最终内容来。
>
> 　　双引号内命令或变量的写法为`命令或变量`或$（命令或变量）。
>
>  
>
> **无引号：**
>
> 　　把内容输出出来，可能不会讲含有空格的字符串视为一个整体输出；
>
> 　　如果内容中有命令、变量等，会先把变量、命令解析结果，然后在输出最终内容来；
>
> 　　如果字符串中带有空格等特殊字符，则不能完整的输出，需要改加双引号，一般连续的字符串，数字，路径等可以用，不过最好用双引号替代之

## Shell脚本IF条件判断和判断条件总结

这里有IF条件判断的语法和常用的判断条件总结,需要的朋友可以参考下

### 前言:

无论什么编程语言都离不开条件判断。SHELL也不例外。

代码如下:

```shell
   if list then
     do something here
   elif list then
     do another thing here
   else
     do something else here
   fi 
```

### **EX:**

代码如下:

```sh
\#!/bin/sh
SYSTEM=`uname -s`  #获取操作系统类型，我本地是linux
if [ $SYSTEM = "Linux" ] ; then   #如果是linux的话打印linux字符串
echo "Linux"
elif [ $SYSTEM = "FreeBSD" ] ; then 
echo "FreeBSD"
elif [ $SYSTEM = "Solaris" ] ; then
echo "Solaris"
else
echo "What?"
fi   #ifend
```



基本上和其他脚本语言一样。没有太大区别。不过值得注意的是。[]里面的条件判断。

### **1、字符串判断**

|     条件     |              解释              |
| :----------: | :----------------------------: |
| str1 = str2  | 当两个串有相同内容、长度时为真 |
| str1 != str2 |    当串str1和str2不等时为真    |
|   -n str1    | 当串的长度大于0时为真(串非空)  |
|   -z str1    |   当串的长度为0时为真(空串)    |
|     str1     |      当串str1为非空时为真      |



### **2、数字的判断**

|     条件      |         解释         |
| :-----------: | :------------------: |
| int1 -eq int2 |     两数相等为真     |
| int1 -ne int2 |     两数不等为真     |
| int1 -gt int2 |   int1大于int2为真   |
| int1 -ge int2 | int1大于等于int2为真 |
| int1 -lt int2 |   int1小于int2为真   |
| int1 -le int2 | int1小于等于int2为真 |



### **3、文件的判断**

|  参数   |                    解释                     |
| :-----: | :-----------------------------------------: |
| -r file |                用户可读为真                 |
| -w file |                用户可写为真                 |
| -x file |               用户可执行为真                |
| -f file |             文件为正规文件为真              |
| -d file |               文件为目录为真                |
| -c file |           文件为字符特殊文件为真            |
| -b file |            文件为块特殊文件为真             |
| -s file |              文件大小非0时为真              |
| -t file | 当文件描述符(默认为1)指定的设备为终端时为真 |



### **4、复杂逻辑判断**

| 参数 | 解释 |
| :--: | :--: |
|  -a  |  与  |
|  -o  |  或  |
|  !   |  非  |



### **结尾**：

语法虽然简单，但是在SHELL里使用的时候，他的功能变得强大了。

==================================================================

### **附 表：**

|            参数             |                             解释                             |
| :-------------------------: | :----------------------------------------------------------: |
|         [ -a FILE ]         |                    如果 FILE 存在则为真。                    |
|         [ -b FILE ]         |           如果 FILE 存在且是一个块特殊文件则为真。           |
|         [ -c FILE ]         |           如果 FILE 存在且是一个字特殊文件则为真。           |
|         [ -d FILE ]         |              如果 FILE 存在且是一个目录则为真。              |
|         [ -e FILE ]         |                    如果 FILE 存在则为真。                    |
|         [ -f FILE ]         |            如果 FILE 存在且是一个普通文件则为真。            |
|         [ -g FILE ]         | 如果 FILE 存在且已经设置了SGID则为真。 [ -h FILE ] 如果 FILE 存在且是一个符号连接则为真。 |
|          [ -k FILE          |           如果 FILE 存在且已经设置了粘制位则为真。           |
|         [ -p FILE ]         |        如果 FILE 存在且是一个名字管道(F如果O)则为真。        |
|         [ -r FILE ]         |               如果 FILE 存在且是可读的则为真。               |
|         [ -s FILE ]         |              如果 FILE 存在且大小不为0则为真。               |
|          [ -t FD ]          |         如果文件描述符 FD 打开且指向一个终端则为真。         |
|         [ -u FILE ]         |       如果 FILE 存在且设置了SUID (set user ID)则为真。       |
|         [ -w FILE ]         |          如果 FILE 如果 FILE 存在且是可写的则为真。          |
|         [ -x FILE ]         |              如果 FILE 存在且是可执行的则为真。              |
|         [ -O FILE ]         |             如果 FILE 存在且属有效用户ID则为真。             |
|         [ -G FILE ]         |             如果 FILE 存在且属有效用户组则为真。             |
|         [ -L FILE ]         |            如果 FILE 存在且是一个符号连接则为真。            |
|         [ -N FILE ]         | 如果 FILE 存在 and has been mod如果ied since it was last read则为真。 |
|         [ -S FILE ]         |             如果 FILE 存在且是一个套接字则为真。             |
|     [ FILE1 -nt FILE2 ]     | 如果 FILE1 has been changed more recently than FILE2, or 如果 FILE1 exists and FILE2 does not则为真。 |
|     [ FILE1 -ot FILE2 ]     | 如果 FILE1 比 FILE2 要老, 或者 FILE2 存在且 FILE1 不存在则为真。 |
|     [ FILE1 -ef FILE2 ]     |      如果 FILE1 和 FILE2 指向相同的设备和节点号则为真。      |
|      [ -o OPTIONNAME ]      |           如果 shell选项 “OPTIONNAME” 开启则为真。           |
|        [ -z STRING ]        |                 “STRING” 的长度为零则为真。                  |
| [ -n STRING ] or [ STRING ] |            “STRING” 的长度为非零 non-zero则为真。            |
|   [ STRING1 == STRING2 ]    | 如果2个字符串相同。 “=” may be used instead of “==” for strict POSIX compliance则为真。 |
|   [ STRING1 != STRING2 ]    |                   如果字符串不相等则为真。                   |
|    [ STRING1 < STRING2 ]    | 如果 “STRING1” sorts before “STRING2” lexicographically in the current locale则为真。 |
|    [ STRING1 > STRING2 ]    | 如果 “STRING1” sorts after “STRING2” lexicographically in the current locale则为真。 |
|      [ ARG1 OP ARG2 ]       | “OP” is one of -eq, -ne, -lt, -le, -gt or -ge. These arithmetic binary operators return true if “ARG1” is equal to, not equal to, less than, less than or equal to, greater than, or greater than or equal to “ARG2”, respectively. “ARG1” and “ARG2” are integers. |




