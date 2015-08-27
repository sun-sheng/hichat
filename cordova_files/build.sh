#!/bin/bash

##init build variable
buildModel=''

##judge the input param
if [ $# = 1 ]
then
	buildModel=$1
else
	buildModel='test'
fi

##echo build model
echo 'YOU BUILD MODEL:' $buildModel

##let you choose continue or stop
echo 'y or n'
read answer

##judge if continue or not
if [ $answer = 'n' ]
then
	echo 'you stop building'
	exit
else
	echo 'continue...'
fi
#begin building
echo 'begin building...'

##build process
rm -rf cordova/www &&
gulp release:$buildModel &&
cp -rf www cordova/
gulp replace-cordova-html:$buildModel &&
cd cordova &&
cordova build android --release &&
echo 'done.'
##build process