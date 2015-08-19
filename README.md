hichat
==========

### 1 搭建项目开发环境

#### 1.1 安装 node.js 和 npm

#### 1.2 安装 cordova bower gulp nodemon
    npm install -g cordova bower gulp nodemon
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
    npm install
    bower install
    //
    cordova create cordova org.upsun.hichat hichat
    cp -rf _cordova/** cordova
    cd cordova
    cordova platform add ios
    cordova platform add android
    //
    cordova plugin add cordova-plugin-device cordova-plugin-dialogs cordova-plugin-inappbrowser cordova-plugin-camera cordova-plugin-file cordova-plugin-file-transfer
    //for 定位
    cordova plugin add cordova-plugin-geolocation https://github.com/eleme/phonegap_baidu_sdk_location#baidu 
    //for 推送
    cordova plugin add https://github.com/phonegap-build/PushPlugin.git https://github.com/eleme/cordova.xinge.git 
    //for bd 系统
    cordova plugin add com.ionic.keyboard
    //for debug 
    //cordova-plugin-console
    
    //for android build release       
    cp android_signed_file/** platforms/android/
    
    cd ../
    
### 2.项目开发
    gulp dev

### 3.项目发布
    ./cordova/build.sh dev|test|dist
    
#### 3.1 ios 发布
    Xcode -> Product -> Archive


