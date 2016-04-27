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

gulp.task('build', function(){

    // perform build for each module
    var src = config.src;
    var tasks = getFolders(src).map(function(directory){
        return gulp.src(path.join(src, directory, '/**/*.js'))
            .pipe(plugins.eslint())
            .pipe(plugins.eslint.format())
            .pipe(plugins.eslint.failAfterError())
            .pipe(plugins.concat(directory + '.js'))
            .pipe(gulp.dest(config.output));
    });

    return tasks;
});

function getFolders(directory) {
    return  fs.readdirSync(directory)
      .filter(function(file) {
        return fs.statSync(path.join(directory, file)).isDirectory();
    });
}
