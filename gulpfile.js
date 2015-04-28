var gulp = require('gulp'),
    header = require('gulp-header'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    minify = require('gulp-minify-css'),
    modernizr = require('gulp-modernizr'),
    watch = require('gulp-watch'),
    pkg = require('./package.json'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;

var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

//
//
// JS building



gulp.task('fonts', function(){
    return gulp.src('bower_components/fontawesome/fonts/*')
        .pipe(gulp.dest('dist/web/fonts'));
});

gulp.task('modernizr', function () {
    return gulp.src('./src/**/*.js')
        .pipe(modernizr('modernizr-custom.min.js', {
            "extra": {
                "shiv": false,
                "load": false,
                "cssclasses": false
            },
            "uglify": true,
            "tests": ['fontface', 'localstorage', 'canvas', 'hashchange'],
            "parseFiles": true,
            "matchCommunityTests": false,
            "customTests": []
        }))
        .pipe(gulp.dest("lib/modernizr"));
});

gulp.task('js-deps', ['modernizr'], function () {
    return gulp.src([
        'bower_components/ng-file-upload/angular-file-upload-shim.min.js',
        'lib/modernizr/modernizr-custom.min.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-messages/angular-route.js',
        'bower_components/angular-material/angular-material.js',
        'bower_components/angular-busy/angular-busy.js',
        'bower_components/ng-file-upload/angular-file-upload.js',
        'bower_components/angular-locker/dist/angular-locker.js',
        'bower_components/angular-touch/angular-touch.js',
        'bower_components/angular-translate/angular-translate.js',
        'bower_components/async/lib/async.js'

    ])
        .pipe(concat('ng-ito-dataviewer-dependencies.min.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('./dist/web/js/'))
});

function jsPipe(src, destPath) {
    return src.pipe(concat('ng-ito-dataviewer-frontend.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(destPath))
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(destPath));
}

gulp.task('js-web', function () {
    return jsPipe(gulp.src([
        //'configuration.js',
        //'./src/shared/js/**/*.js',
        './src/web/js/**/*.js'
    ]), './dist/web/js/');
});


//
//
// CSS building

function cssPipe(src, destPath) {
    return src.pipe(less())
        .pipe(minify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename({
            basename: 'ng-ito-dataviewer'
        }))
        .pipe(gulp.dest(destPath))
        .pipe(reload({stream: true}));
}

gulp.task('css-web', function () {
    return cssPipe(gulp.src('./src/web/less/site.less'), './dist/web/css/');
});


//
//
// HTML building

function htmlPipe(src, destPath) {
    return src.pipe(jade())
        .pipe(gulp.dest(destPath));
}

gulp.task('html-web', function () {
    return htmlPipe(gulp.src(['./src/shared/jade/**/*.jade', './src/web/jade/**/*.jade']), './dist/web/');

});

//
//
// Watch tasks

gulp.task('watch-web', function () {
    watch(['src/web/js/**/*.js', 'src/shared/js/**/*.js', 'configuration.js'], function () {
        gulp.start('js-web');
    }).on('change', reload);
    watch('src/web/less/**/*.less', function () {
        gulp.start('css-web');
    }).on('change', reload);
    watch(['src/web/jade/**/*.jade', 'src/shared/jade/**/*.jade'], function () {
        gulp.start('html-web');
    }).on('change', reload);
});

gulp.task('web', [
    'fonts',
    'js-deps',
    'js-web',
    'css-web',
    'html-web'
]);

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./dist/web/"
    });

});


gulp.task('default', ['web','watch-web','serve']);