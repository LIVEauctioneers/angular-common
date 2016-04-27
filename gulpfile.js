var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var plugins = require('gulp-load-plugins')({pattern: '*'});
var config = require('./build.config.js')();

gulp.task('default', function(){
    console.log(plugins);
});

gulp.task('clean', function(){
    return plugins.del([config.output]);
});

gulp.task('build', ['lint'], function(){

    // perform build for each module
    var src = config.src;
    var tasks = getFolders(src).map(function(directory){
        return gulp.src(path.join(src, directory, '/**/*.js'))
            .pipe(plugins.concat(directory + '.js'))
            .pipe(gulp.dest(config.output));
    });

    // concat all into main.js
    var main = gulp.src(path.join(src, '/**/*.js'))
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest(config.output));

    return plugins.mergeStream(tasks, main);
});


gulp.task('lint', function(){
    return gulp.src(path.join(config.src, '/**/*.js'))
        .pipe(plugins.jscs())
        .pipe(plugins.jscs.reporter());
});

function getFolders(directory) {
    return  fs.readdirSync(directory)
      .filter(function(file) {
        return fs.statSync(path.join(directory, file)).isDirectory();
    });
}
