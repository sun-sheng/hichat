'use strict';

var Q = require('q');
var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var browserify = require('gulp-browserify');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var replaceHtml = require('gulp-html-replace');
var ngHtml2js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');

//var gulpSync = require('gulp-sync')(gulp);

var liveReload = false;
var serverPort = process.env.PORT || 5001;
var replaceHtmlOptions = {
    css: 'app.bundler.css',
    js: 'app.bundler.js',
    model: {
        src: null,
        tpl: ''
    }
};
var replaceHtmlOptionsModelTpl = '<script type="text/javascript">window.APP_MODEL = "[MODEL]";</script>';
var replaceHtmlDest = './www';

gulp.task('clean', function ()
{
    return gulp.src(
        [
            './www/',
            './cordova/www/'
        ],
        {
            read: false
        }
    ).pipe(
        clean()
    );
});

gulp.task('browserify', function ()
{
    return gulp.src(
        './src/app/index.js'
    ).pipe(
        browserify({
            debug: process.env.MODEL !== 'release'
        })
    ).pipe(
        rename('app.js')
    ).pipe(
        gulp.dest('./src/')
    );
});
//
gulp.task('uglify', ['browserify', 'ng-templates'], function ()
{
    return gulp.src(
        './src/app.js'
    ).pipe(
        ngAnnotate()
    ).pipe(
        uglify()
    ).pipe(
        rename('app.min.js')
    ).pipe(
        gulp.dest('./src/')
    );
});

gulp.task('scss', function ()
{
    return sass('./src/app/index.scss').on('error', function (err)
    {
        console.error('Error!', err.message);
    }).pipe(
        rename('app.css')
    ).pipe(
        gulp.dest('./src/')
    );
});

gulp.task('minify-css', ['scss'], function ()
{
    return gulp.src(
        './src/app.css'
    ).pipe(
        minifyCss()
    ).pipe(
        rename('app.min.css')
    ).pipe(
        gulp.dest('./src/')
    );
});

gulp.task('ng-templates', function ()
{
    gulp.src([
        './src/**/*.html',
        '!./src/index.html'
    ]).pipe(
        minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        })
    ).pipe(
        ngHtml2js({
            moduleName: "app",
            declareModule: false,
            rename: function (templateUrl)
            {
                var dirIndex = templateUrl.lastIndexOf('/') + 1;
                return templateUrl.substr(dirIndex);
            }
        })
    ).pipe(
        concat('app-templates.js')
    ).pipe(
        gulp.dest('./src/')
    )
});

gulp.task('concat-lib-js', function ()
{
    return gulp.src([
        './bower_components/lodash/lodash.js',
        './bower_components/localforage/dist/localforage.js',
        './bower_components/moment/moment.js',
        './bower_components/moment/locale/zh-cn.js',
        './bower_components/framework7/dist/js/framework7.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-forage/src/angular-forage.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-sanitize/angular-sanitize.js'
    ]).pipe(
        concat('lib.js')
    ).pipe(
        gulp.dest('./src/')
    );
});
gulp.task('concat-lib-css', function ()
{
    return gulp.src([
        './bower_components/framework7/dist/css/framework7.css'
    ]).pipe(
        concat('lib.css')
    ).pipe(
        gulp.dest('./src/')
    );
});

gulp.task('concat-all-js', function ()
{
    return gulp.src([
        './bower_components/lodash/lodash.min.js',
        './bower_components/localforage/dist/localforage.min.js',
        './bower_components/moment/min/moment.min.js',
        './bower_components/moment/locale/zh-cn.js',
        './bower_components/framework7/dist/js/framework7.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-forage/dist/angular-forage.min.js',
        './bower_components/angular-animate/angular-animate.min.js',
        './bower_components/angular-sanitize/angular-sanitize.min.js',
        './src/app.min.js',
        './src/app-templates.js'
    ]).pipe(
        concat('app.bundler.js')
    ).pipe(
        gulp.dest('./www/')
    );
});
gulp.task('concat-all-css', function ()
{
    return gulp.src([
        './bower_components/framework7/dist/css/framework7.min.css',
        './src/app.min.css'
    ]).pipe(
        concat('app.bundler.css')
    ).pipe(
        gulp.dest('./www/')
    );
});

gulp.task('copy:release', function ()
{
    return Q.all([
        gulp.src(
            './src/app/images/**/*'
        ).pipe(
            gulp.dest('./www/app/images/')
        ),
        gulp.src([
            './src/app/fonts/**'
        ]).pipe(
            gulp.dest('./www/app/fonts/')
        )
    ]);
});

gulp.task('replace-html', function ()
{
    return gulp.src(
        './src/index.html'
    ).pipe(
        replaceHtml(replaceHtmlOptions)
    ).pipe(
        gulp.dest(replaceHtmlDest)
    );
});

gulp.task('replace-cordova-html:dev', function ()
{
    replaceHtmlOptions.model.tpl = replaceHtmlOptionsModelTpl.replace('[MODEL]', 'DEV');
    replaceHtmlOptions.cordova = 'cordova.js';
    replaceHtmlDest = './cordova/www';
    gulp.start('replace-html');
});
gulp.task('replace-cordova-html:test', function ()
{
    replaceHtmlOptions.model.tpl = replaceHtmlOptionsModelTpl.replace('[MODEL]', 'TEST');
    replaceHtmlOptions.cordova = 'cordova.js';
    replaceHtmlDest = './cordova/www';
    gulp.start('replace-html');
});
gulp.task('replace-cordova-html:dist', function ()
{
    replaceHtmlOptions.model.tpl = replaceHtmlOptionsModelTpl.replace('[MODEL]', 'DIST');
    replaceHtmlOptions.cordova = 'cordova.js';
    replaceHtmlDest = './cordova/www';
    gulp.start('replace-html');
});

gulp.task('watch', function ()
{
    gulp.watch(
        [
            'src/**/*.js',
            '!src/*.js'
        ],
        ['browserify']
    );
    gulp.watch('./src/**/*.scss', ['scss']);
    gulp.watch([
        './src/**/*.html',
        '!./src/index.html'
    ],
    ['ng-templates'])
});

gulp.task('server', function ()
{
    connect.server({
        livereload: liveReload,
        root: './src/',
        port: serverPort
    });
    //
    nodemon({
        script: './server/app.js',
        watch: './server/',
        ext: 'js html',
        env: {'NODE_ENV': 'development'}
    });
});

gulp.task('open-browser', function ()
{
    var options = {
        //app: "google-chrome",
        url: "http://localhost:" + serverPort
    };
    return gulp.src(
        "./src/index.html"
    ).pipe(
        open("", options)
    );
});

gulp.task('dev-base', ['concat-lib-js', 'concat-lib-css', 'browserify', 'ng-templates', 'scss']);

gulp.task('dev', ['dev-base', 'server', 'watch'], function ()
{
    return gulp.start('open-browser');
});

gulp.task('release-base', ['clean', 'minify-css', 'uglify'], function ()
{
    return gulp.start(['concat-all-js', 'concat-all-css', 'copy:release']);
});

gulp.task('release:dev', ['release-base'], function ()
{
    replaceHtmlOptions.model.tpl = replaceHtmlOptionsModelTpl.replace('[MODEL]', 'DEV');
    gulp.start('replace-html');
});
gulp.task('release:test', ['release-base'], function ()
{
    replaceHtmlOptions.model.tpl = replaceHtmlOptionsModelTpl.replace('[MODEL]', 'TEST');
    gulp.start('replace-html');
});
gulp.task('release:dist', ['release-base'], function ()
{
    replaceHtmlOptions.model.tpl = replaceHtmlOptionsModelTpl.replace('[MODEL]', 'DIST');
    gulp.start('replace-html');
});