# Kolin：A problem occurred evaluating project ':app'.


# Kolin：A problem occurred evaluating project ':app'.

报错

```shell
Build file 'C:\All_Code\AS_Code\Bottom-Navigation\Material-BottomNavigation\app\build.gradle' line: 2

A problem occurred evaluating project ':app'.
> java.lang.ExceptionInInitializerError (no error message)
```

在项目根目录下的app目录（可能被改为项目名）下的build.gradle文件中发现原来的Kolin插件使用了$，我并未配置Kolin环境，因此找不到

```json
dependencies {
	classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
}
```

访问[Gradle官网仓库](https://plugins.gradle.org/plugin/org.jetbrains.kotlin.kapt)，我修改为最新版本

```json
dependencies {
	classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.5.0-M2"
}
```

编译运行OK
