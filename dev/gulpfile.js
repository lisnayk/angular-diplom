var gulp = require('gulp');
var g_scss = require('gulp-sass');
var g_jade = require('gulp-jade');
var g_min_css = require('gulp-minify-css');
var g_min_js = require('gulp-jsmin');
var g_rename = require('gulp-rename');
var browserSync = require('browser-sync');
var imageop = require('gulp-image-optimization');

gulp.task('jade', [], function() {
    gulp.src('./jade/*.jade')
        .pipe(g_jade({
            pretty: true
        }).on('error', console.error))
        .pipe(gulp.dest('../html/'))
        .pipe(browserSync.reload({
            stream: true
        }));

    gulp.src('./capp/**/*.jade')
        .pipe(g_jade({
            pretty: true
        }).on('error', console.error))
        .pipe(gulp.dest('../html/capp/'))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src('./app/**/*.jade')
        .pipe(g_jade({
            pretty: true
        }).on('error', console.error))
        .pipe(gulp.dest('../html/app/'))
        .pipe(browserSync.reload({
            stream: true
        }));

});

/*gulp.task('scss', [], function() {
    gulp.src('./scss/style.scss')
    .pipe(g_scss().on('error', console.log))
    .pipe(g_min_css().on('error', console.log))
    //.pipe(g_rename().on('error', console.log))
    .pipe(g_rename('style.min.css'))
    .pipe(gulp.dest('../html/assets/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});*/
gulp.task('styles', function() {
    gulp.src('./scss/**/*.scss')
        .pipe(g_scss().on('error', console.log))
        .pipe(gulp.dest('../html/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('app', function() {
    gulp.src('./capp/**/*.js')
        //.pipe(g_scss().on('error', console.log))
        .pipe(gulp.dest('../html/capp'))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src('./app/**/*.js')
        //.pipe(g_scss().on('error', console.log))
        .pipe(gulp.dest('../html/app'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('js', [], function() {
    gulp.src('./js/*.js')
        //.pipe(g_min_js().on('error', console.log))
        //.pipe(g_rename().on('error', console.log))
        //.pipe(g_rename('script.min.js'))
        .pipe(gulp.dest('../html/assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('images', function(cb) {
    gulp.src(['./img/**/*.png', './img/**/*.jpg', './img/**/*.gif', './img/**/*.jpeg']).pipe(
        imageop({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })
    ).pipe(gulp.dest('../html/assets/images')).on('end', cb).on('error', cb);
});

gulp.task('watch', [], function() {
    gulp.watch('./capp/**/*.js', ['app']);
    gulp.watch('./app/**/*.js', ['app']);
    gulp.watch('./scss/**/*.scss', ['styles']);
    gulp.watch('./jade/**/*.jade', ['jade']);
    gulp.watch('./capp/**/*.jade', ['jade']);
    gulp.watch('./app/**/*.jade', ['jade']);
    gulp.watch('./js/**/*.js', ['js']);
});

gulp.task('move', [], function() {
    //gulp.src('./img/*').pipe(gulp.dest('../html/assets/images'))
    gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('../html/assets/js/'));
    gulp.src('./node_modules/bootstrap/dist/js/*.js').pipe(gulp.dest('../html/assets/js/'));
    gulp.src('./node_modules/bootstrap/dist/css/*.css').pipe(gulp.dest('../html/assets/css/'));
    gulp.src('./node_modules/bootstrap/dist/fonts/**/*.*').pipe(gulp.dest('../html/assets/fonts/'));
    gulp.src('./fonts/**/*.*').pipe(gulp.dest('../html/assets/fonts/'));

    gulp.src('./node_modules/angular/angular.js').pipe(gulp.dest('../html/app/lib/'));
    gulp.src('./node_modules/angular-resource/angular-resource.js').pipe(gulp.dest('../html/app/lib/'));
    gulp.src('./node_modules/angular-flash-alert/dist/angular-flash.min.js').pipe(gulp.dest('../html/app/lib/'));

    gulp.src('./node_modules/admin-lte/**/*.*').pipe(gulp.dest('../html/assets/admin-lte/'));



});

gulp.task('default', ['styles', 'app', 'jade', 'js', 'watch', 'move', 'images'], function() {
    browserSync.init({
        server: '../html'
    });
});
