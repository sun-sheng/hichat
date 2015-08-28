hichat
==========

### 1 搭建项目开发环境

#### 1.1 安装
    * node.js
    * ruby
    * python
    * jdk
    * mongodb
#### 1.2 安装 cordova bower gulp nodemon ruby-sass
    npm install -g cordova bower gulp nodemon
    gem install sass
#### 1.3 安装 android-sdk 
    brew install android-sdk
    android 
    安装以下项目
    Tools/
        Android SDK Tools
        Android SDK Platform-tools
        Android SDK Build-tools
    API 22/
        SDK Platform
    Extras/
        Android Support Repository
        Android Support Library
#### 1.6 初始化
    start mongodb service
    npm install
    bower install
    //
    cordova create cordova org.upsun.hichat Hi.Chat
    cp -rf cordova_files/** cordova
    cd cordova
    cordova platform add android
    //
    cordova plugin add cordova-plugin-device cordova-plugin-dialogs cordova-plugin-inappbrowser cordova-plugin-camera cordova-plugin-file cordova-plugin-file-transfer
    //for debug 
    //cordova-plugin-console
    
    //for android build release       
    cp android_signed_file/** platforms/android/
    
    cd ../
    
### 2.项目开发
    gulp dev

### 3.项目发布
    ./cordova/build.sh dev|test|dist



