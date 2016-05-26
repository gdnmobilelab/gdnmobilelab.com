var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    fs = require('fs');

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

gulp.task('publish', function() {
    var aws = JSON.parse(fs.readFileSync('aws.json'));
    var publisher = plugins.awspublish.create({
        params: {
            Bucket: "www.stg.gdnmobilelab.com",
        },
        accessKeyId: aws.key,
        secretAccessKey: aws.secret
    });

    gulp.src('./dist/**/*', {base: 'dist'})
        .pipe(plugins.rename(function(path) {
            path.dirname = 'landing/' + path.dirname;
        }))
        .pipe(publisher.publish({
            'Cache-Control': 'public'
        }))
        .pipe(publisher.cache())
        .pipe(plugins.awspublish.reporter());
});

gulp.task('build', ['build-html', 'build-assets', 'build-css']);
gulp.task('dev', ['build', 'serve', 'watch']);
gulp.task('deploy', ['build', 'publish']);