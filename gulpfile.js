var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    fs = require('fs'),
    aws = require('aws-sdk'),
    isProduction = (process.argv.indexOf("--production") > -1) ? true : false;

gulp.task('build-html', function() {
    var data = JSON.parse(fs.readFileSync('./src/data.json'));

    gulp.src(['src/**/*.html'])
        .pipe(plugins.hb()
            .data(JSON.parse(fs.readFileSync('./src/data.json')))
            .partials('src/html/*.hbs'))
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
    gulp.watch(['src/**/*.html', 'src/**/*.hbs', 'src/**/*.json'], ['build-html']);
    gulp.watch('src/assets/**/*', ['build-assets']);
    gulp.watch('src/sass/**/*.scss', ['build-css']);
});

gulp.task('publish', function() {
    var publisher = plugins.awspublish.create({
        params: {
            Bucket: (isProduction) ? "www.gdnmobilelab.com" : "www.stg.gdnmobilelab.com"
        },
        credentials: new aws.SharedIniFileCredentials({
            profile: (isProduction) ? 's3_production' : "s3_staging"
        })
    });

    gulp.src('./dist/**/*', {base: 'dist'})
        .pipe(publisher.publish({
            'Cache-Control': 'public'
        }))
        .pipe(publisher.cache())
        .pipe(plugins.awspublish.reporter());
});

gulp.task('build', ['build-html', 'build-assets', 'build-css']);
gulp.task('dev', ['build', 'serve', 'watch']);
gulp.task('deploy', ['build', 'publish']);