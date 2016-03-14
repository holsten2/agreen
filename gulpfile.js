var gulp = require('gulp');
var clean   = require('gulp-clean');
var webpack = require('gulp-webpack');
var merge   = require('merge-stream');


gulp.task('deployStatic', function(){
    return gulp.src('./rest/dev/static/**/*')
        .pipe(gulp.dest('./rest/build/static/'));
});

gulp.task('deployJS', function(){
    return gulp.src('./rest/dev/js/scripts.js')
      .pipe(webpack( require('./webpack.config.js') ))
      .pipe(gulp.dest('./rest/build/js/'));
})

gulp.task('deployVendorJS', function(){
    var libs =
        gulp.src('./rest/dev/libs/*')
            .pipe(gulp.dest('./rest/build/libs'));

    var fonts =
        gulp.src('./rest/dev/font/**/*')
            .pipe(gulp.dest('./rest/build/font'));

    return merge(libs, fonts);
});

gulp.task('watchStatic', function() {
    gulp.watch('./rest/dev/static/**/*', ['deployStatic']);
});

gulp.task('clean', function(){
    return gulp.src('./rest/build/')
        .pipe(clean());
});


gulp.task('build', ['deployStatic', 'deployJS', 'deployVendorJS']);
gulp.task('watch', [ 'deployJS', 'deployVendorJS', 'deployStatic' ,'watchStatic']);

gulp.task('default', ['build']);
