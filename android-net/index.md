# AndroidStudio网络问题


# AndroidStudio网络问题

## android studio 教你修改Maven仓库地址为国内镜像

android studio 默认国外maven
这我们更改为阿里的maven
打开build.gradle
添加或者修改

```json
allprojects {
repositories {
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven{ url 'https://maven.aliyun.com/repository/jcenter'}
}
}修改buildscript {
repositories {
    maven { url 'https://maven.aliyun.com/repository/google' }
    maven{ url 'https://maven.aliyun.com/repository/jcenter'}
}
dependencies {
    classpath 'com.android.tools.build:gradle:3.2.1'
}

}
```

这里有阿里的仓库http://maven.aliyun.com/mvn/view`可以自行查看和替换，速度都比国外快
如图所示
![1](C:\Program_Green\hugo_extended_0.82.0_Windows-64bit\Original_Md\Android-Net\1.png)

## Android Studio released aar to Jcenter, plug-in could not be found

导入项目控制台报错

> Unknown host 'raw.githubusercontent.com'. You may need to adjust the proxy settings in Gradle.

似乎raw.githubusercontent.com被dns污染了，使用站长工具ping改host做前置代理也无法访问，使用站长工具查ip改host也识别不到，甚至用了魔法，可能AS自己有网络通讯，使用代理依然无效。被迫使用下面的办法（其实可以直接删除，不影响项目运行，据说是文档文件）,该方法适用所有此域名导包问题

1. 获取源码

   有大佬上传到GitHub：[installv1.gradle](https://github.com/nuuneoi/JCenter/blob/master/installv1.gradle)、[bintrayv1.gradle](https://github.com/nuuneoi/JCenter/blob/master/bintrayv1.gradle)，或者使用魔法，浏览器访问（我只使用了这一种办法成功访问了）网址获取

   1. bintrayv1.gradle

      ```json
      apply plugin: 'com.jfrog.bintray'
      version = libraryVersion
      if (project.hasProperty("android")) { // Android libraries
          task sourcesJar(type: Jar) {
              classifier = 'sources'
              from android.sourceSets.main.java.srcDirs
          }
          task javadoc(type: Javadoc) {
              source = android.sourceSets.main.java.srcDirs
              classpath += project.files(android.getBootClasspath().join(File.pathSeparator))
          }
      } else { // Java libraries
          task sourcesJar(type: Jar, dependsOn: classes) {
              classifier = 'sources'
              from sourceSets.main.allSource
          }
      }
      task javadocJar(type: Jar, dependsOn: javadoc) {
          classifier = 'javadoc'
          from javadoc.destinationDir
      }
      artifacts {
          archives javadocJar
          archives sourcesJar
      }
      // Bintray
      Properties properties = new Properties()
      properties.load(project.rootProject.file('local.properties').newDataInputStream())
      bintray {
          user = properties.getProperty("bintray.user")
          key = properties.getProperty("bintray.apikey")
          configurations = ['archives']
          pkg {
              repo = bintrayRepo
              name = bintrayName
              desc = libraryDescription
              websiteUrl = siteUrl
              vcsUrl = gitUrl
              licenses = allLicenses
              publish = true
              publicDownloadNumbers = true
              version {
                  desc = libraryDescription
                  gpg {
                      sign = true //Determines whether to GPG sign the files. The default is false
                      passphrase = properties.getProperty("bintray.gpg.password")
                      //Optional. The passphrase for GPG signing'
                  }
              }
          }
      }
      ```

   installv1.gradle

   ```json
   apply plugin: 'com.github.dcendents.android-maven'
   group = publishedGroupId                               // Maven Group ID for the artifact
   install {
       repositories.mavenInstaller {
           // This generates POM.xml with proper parameters
           pom {
               project {
                   packaging 'aar'
                   groupId publishedGroupId
                   artifactId artifact // Changed case
                   // Add your description here
                   name libraryName
                   description libraryDescription
                   url siteUrl
                   // Set your license
                   licenses {
                       license {
                           name licenseName
                           url licenseUrl
                       }
                   }
                   developers {
                       developer {
                           id developerId
                           name developerName
                           email developerEmail
                       }
                   }
                   scm {
                       connection gitUrl
                       developerConnection gitUrl
                       url siteUrl
                   }
               }
           }
       }
   }
   ```

2. 在项目中手动创建installv1.gradle、bintrayv1.gradle文件，我把他们放在项目目录下的library文件夹中，手动拷贝相关的源码

   ![2](C:\Program_Green\hugo_extended_0.82.0_Windows-64bit\Original_Md\Android-Net\2.jpg)

   

3. 在项目根目录下的app目录（可能被改为项目名）下的build.gradle文件中修改原来的引用（注释或者删除）

   ```json
   //apply from: 'https://raw.githubusercontent.com/nuuneoi/JCenter/master/installv1.gradle'
   //apply from: 'https://raw.githubusercontent.com/nuuneoi/JCenter/master/bintrayv1.gradle'
   apply from: "../library/installv1.gradle"
   apply from: "../library/bintrayv1.gradle"
   ```

4. 重新build即可

   

   ## end
