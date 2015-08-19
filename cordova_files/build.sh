#!/bin/bash

##init build variable
buildModel=''
bdBranch='eve'

##judge the input param
if [ $# = 1 ]
then
	buildModel=$1
else
	buildModel='test'
fi
##
if [ $buildModel = 'dist' ]
then
	bdBranch='eve-publish'
fi

##echo build model
echo 'YOU BUILD MODEL:' $buildModel
echo 'THE BD BRANCH:' $bdBranch

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
git clone git@git.elenet.me:bpm/mortred.git www/mortred -b $bdBranch &&
cordova build android --release &&
cordova build ios &&
echo 'done.'
##build process