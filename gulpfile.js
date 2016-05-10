var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('build-html', function() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-css', function() {
    gulp.src('src/sass/style.scss')
        .pipe(plugins.sass.sync().on('error', plugins.sass.logError))
        .pipe(gulp.dest('./dist'))
});

gulp.task('serve', function() {
    gulp.src('dist')
        .pipe(plugins.webserver({
            livereload: true,
            open: "http://localhost:8000/index.html"
        }));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['build-html']);
    gulp.watch('src/sass/**/*.scss', ['build-css']);
});

gulp.task('build', ['build-html', 'build-css']);
gulp.task('dev', ['build', 'serve', 'watch']);