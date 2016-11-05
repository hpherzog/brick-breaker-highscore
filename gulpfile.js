
var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('install', function() {
    gulp.src(__dirname + '/cfg/index.template.js')
        .pipe(rename('index.js'))
        .pipe(gulp.dest(__dirname + '/cfg'));
});
