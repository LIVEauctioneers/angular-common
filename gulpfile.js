var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var plugins = require('gulp-load-plugins')({pattern: '*'});
var config = require('./build.config.js')();
var clangFormatSettings = require('./clang-format.json'); // TODO: it wasn't reading.clang-format for some reason. confirm default file name

var JS_PATTERN = '/**/*.js';

gulp.task('clean', function(){
    return plugins.del([config.output]);
});

gulp.task('build', ['lint'], function(){

    // perform build for each module
    var src = config.src;
    var tasks = getFolders(src).map(function(directory){
        return gulp.src(path.join(src, directory, JS_PATTERN))
            .pipe(plugins.concat(directory + '.js'))
            .pipe(gulp.dest(config.output));
    });

    // concat all into main.js
    var main = gulp.src(path.join(src, '/**/*.js'))
        .pipe(plugins.concat(config.main))
        .pipe(gulp.dest(config.output));

    return plugins.mergeStream(tasks, main);
});

gulp.task('lint', function(){
    return gulp.src(path.join(config.src, JS_PATTERN))
        .pipe(plugins.clangFormat.checkFormat(clangFormatSettings, undefined, {verbose: true, fail: true}));
});

gulp.task('format', function(){
    return gulp.src(path.join(config.src, JS_PATTERN))
        .pipe(plugins.clangFormat.format(clangFormatSettings))
        .on('warning', function(e) {
           process.stdout.write(e.message);
           process.exit(1);
        })
        .pipe(gulp.dest(config.src));
});


function getFolders(directory) {
    return  fs.readdirSync(directory)
      .filter(function(file) {
        return fs.statSync(path.join(directory, file)).isDirectory();
    });
}
