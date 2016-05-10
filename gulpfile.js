var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('build-html', function() {
    gulp.src('src/*.mustache')
        .pipe(plugins.mustache('./src/data.json', {
            extension: '.html'
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(plugins.connect.reload());
});

gulp.task('build-assets', function() {
    gulp.src(['src/assets/**/*'], {base: 'src'})
        .pipe(gulp.dest('./dist'))
        .pipe(plugins.connect.reload());
})

gulp.task('build-css', function() {
    gulp.src('src/sass/style.scss')
        .pipe(plugins.sass.sync().on('error', plugins.sass.logError))
        .pipe(gulp.dest('./dist'))
        .pipe(plugins.connect.reload());
});

gulp.task('serve', function() {
    plugins.connect.server({
        root: 'dist',
        livereload: true
    });
    gulp.src('./').
    pipe(plugins.open({uri: 'http://localhost:8080'}));
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*.mustache', 'src/**/*.json'], ['build-html']);
    gulp.watch('src/assets/**/*', ['build-assets']);
    gulp.watch('src/sass/**/*.scss', ['build-css']);
});

gulp.task('build', ['build-html', 'build-assets', 'build-css']);
gulp.task('dev', ['build', 'serve', 'watch']);