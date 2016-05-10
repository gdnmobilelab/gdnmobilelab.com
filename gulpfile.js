var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('copy-html', function() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('serve', function() {
    gulp.src('dist')
        .pipe(plugins.webserver({
            livereload: true,
            open: "http://localhost:8000/index.html"
        }));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['copy-html']);
})

gulp.task('build', ['copy-html']);
gulp.task('dev', ['build', 'serve', 'watch']);