var pkg = require('./package.json');
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var plugins = require('gulp-load-plugins')({pattern: ['gulp-*', 'gulp.*', 'del', 'merge-stream']});
var config = require('./build.config.js')();
var clangFormatSettings = require('./clang-format.json'); // TODO: it wasn't reading.clang-format for some reason. confirm default file name


var JS_PATTERN = '/**/*.js';
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' */',
  ''].join('\n');



gulp.task('clean', function(){
    return plugins.del([config.output]);
});

gulp.task('build', ['lint'], function(){
    // perform build for each module
    var src = config.src;
    var tasks = getFolders(src).map(function(directory){
        return gulp.src(path.join(src, directory, JS_PATTERN))
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.concat(pkg.name + '-' + directory + '.js'))
            .pipe(plugins.header(banner, {pkg: pkg}))
            .pipe(gulp.dest(config.output));
    });

    // concat all into main.js
    var main = gulp.src(path.join(src, JS_PATTERN))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.concat(pkg.main))
        .pipe(plugins.header(banner, {pkg: pkg}))
        .pipe(gulp.dest(config.output));

    return plugins.mergeStream(tasks, main);
});

gulp.task('lint', function(){
    return gulp.src(path.join(config.src, JS_PATTERN))
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'))
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

gulp.task('release', ['clean', 'build'], function(){
    return gulp.src(path.join(config.output, JS_PATTERN))
        .pipe(gulp.dest(config.release));
})

function getFolders(directory) {
    return  fs.readdirSync(directory)
      .filter(function(file) {
        return fs.statSync(path.join(directory, file)).isDirectory();
    });
}
