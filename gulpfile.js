var gulp = require('gulp');
var concat = require('gulp-concat');
var sourceMaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

// Other vars.
var appLocation = 'public/app';

// Merges all Angular.js scripts into a single minified file.
gulp.task('merge-ng-scripts', function () {
    gulp.src([
        appLocation + '/**/*.module.js',
        appLocation + '/**/*.config.js',
        appLocation + '/**/*.js'
    ])
    .pipe(sourceMaps.init())
    .pipe(concat('public/app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('.'))
});

// Main task which watches all Angular.js files for changes.
gulp.task('watch', ['merge-ng-scripts'], function () {
    gulp.watch(appLocation + '/**/*.js', ['merge-ng-scripts'])
});