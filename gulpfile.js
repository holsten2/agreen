var gulp = require('gulp');
var clean   = require('gulp-clean');
var webpack = require('gulp-webpack');
var merge   = require('merge-stream');


gulp.task('deployStatic', function(){
    return gulp.src('./rest/dev/static/**/*')
        .pipe(gulp.dest('./rest/build/static/'));
});

// Note that deployJS also watches the JS folder through webpack
gulp.task('deployJS', function(){
    var src =
        gulp.src('./rest/dev/js/scripts.js')
            .pipe(webpack( require('./webpack.config.js') ))
            .pipe(gulp.dest('./rest/build/js/'));

    var sigma =
        gulp.src('./rest/dev/js/sigma*.js')
            .pipe(gulp.dest('./rest/build/libs'));

    return merge(src, sigma);
})

gulp.task('deployMaterialize',function(){
    var fonts =
        gulp.src('./node_modules/materialize-css/dist/font/**/*')
            .pipe(gulp.dest('./rest/build/fonts'));

    var css =
        gulp.src('./node_modules/materialize-css/dist/css/materialize.min.css')
            .pipe(gulp.dest('./rest/build/libs'));

    var js =
        gulp.src('./node_modules/materialize-css/dist/js/materialize.min.js')
            .pipe(gulp.dest('./rest/build/libs'));

    return merge(js, css, fonts);
});

gulp.task('deployJquery',function(){
    return gulp.src('./node_modules/jquery/dist/jquery.min.js')
            .pipe(gulp.dest('./rest/build/libs'));
});

gulp.task('deployVendors', ['deployMaterialize', 'deployJquery']);

gulp.task('watchStatic', function() {
    gulp.watch('./rest/dev/static/**/*', ['deployStatic']);
});

gulp.task('clean', function(){
    return gulp.src('./rest/build/')
        .pipe(clean());
});


gulp.task('build', ['deployStatic', 'deployJS', 'deployVendors']);
gulp.task('watch', [ 'deployJS', 'deployVendors', 'deployStatic' ,'watchStatic']);

gulp.task('default', ['build']);
