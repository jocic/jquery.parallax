/***********************************************************\
|* Website: https://www.djordjejocic.com                   *|
|* Author: Djordje Jocic <office@djordjejocic.com>         *|
|* ------------------------------------------------------- *|
|* Filename: gulpfile.js                                   *|
|* ------------------------------------------------------- *|
|* Copyright (C) 2018                                      *|
\***********************************************************/

/******************\
|* Core Variables *|
\******************/

var browserSync = require("browser-sync");

/******************\
|* GULP Variables *|
\******************/

var gulp        = require("gulp");
var sass        = require("gulp-sass");
var concatenate = require("gulp-concat");
var uglify      = require("gulp-uglify");
var minifyCss   = require("gulp-minify-css");

/*****************\
|* Task: Default *|
\*****************/

gulp.task("default", [
    "build:compile",
    "build:watch"
]);

/***********************\
|* Task: Build Compile *|
\***********************/

gulp.task("build:compile", [
    "build:compile:scripts",
    "build:compile:styles",
    "build:compile:resources"
]);

/*********************\
|* Task: Build Watch *|
\*********************/

gulp.task("build:watch", function() {
    
    // Scripts.
    
    gulp.watch([
        "../src/scripts/**/*.js"
    ], [
        "build:compile:scripts"
    ]);
    
    // Styles.
    
    gulp.watch([
        "../src/styles/**/*.scss"
    ], [
        "build:compile:styles"
    ]);
    
});

/*******************************\
|* Task: Build Compile Scripts *|
\*******************************/

gulp.task("build:compile:scripts", function() {
    
    // Scripts.
    
    gulp.src([
        "../src/scripts/**/*.js"
    ])
    
    // Normal Version.
    
    .pipe(concatenate("parallax.js"))
    .pipe(gulp.dest("../dist/js"))
    .pipe(gulp.dest("../demo/libraries/parallax/latest/js"))
    
    // Minified Version.
    
    .pipe(concatenate("parallax.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("../dist/js"))
    .pipe(gulp.dest("../demo/libraries/parallax/latest/js"))
    
    // Make Browser Reload.
    
    .pipe(browserSync.reload({
        stream : true
    }));
    
});

/******************************\
|* Task: Build Compile Styles *|
\******************************/

gulp.task("build:compile:styles", function() {
    
    // Styles.
    
    gulp.src([
        "../src/styles/**/*.scss"
    ])
    
    // Normal Version.
    
    .pipe(concatenate("parallax.css"))
    .pipe(sass())
    .pipe(gulp.dest("../dist/css"))
    .pipe(gulp.dest("../demo/libraries/parallax/latest/css"))
    
    // Minified Version.
    
    .pipe(concatenate("parallax.min.css"))
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest("../dist/css"))
    .pipe(gulp.dest("../demo/libraries/parallax/latest/css"))
    
    // Make Browser Reload.
    
    .pipe(browserSync.reload({
        stream : true
    }));
    
});

/*********************************\
|* Task: Build Compile Resources *|
\*********************************/

gulp.task("build:compile:resources", function() {
    
    // Images.
    
    gulp.src([
        "../src/images/**/*.png",
        "../src/images/**/*.gif",
        "../src/images/**/*.jpg",
        "../src/images/**/*.jpeg"
    ])
    .pipe(gulp.dest("../dist/images"))
    .pipe(gulp.dest("../demo/libraries/parallax/latest/images"))
    
    // Make Browser Reload.
    
    .pipe(browserSync.reload({
        stream : true
    }));
    
});
