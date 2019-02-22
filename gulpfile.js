const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

sass.compiler = require('node-sass');

const compilesass = () => {
    return src('sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 10 versions'], cascade: false }))
        .pipe(dest('./dist/css'));
}

const compilehtml = () => {
    return src('*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('./dist'))
}

const moveimg = () => {
    return src('img/*')
        .pipe(dest('./dist/img'))
}

exports.watchsass = () => {
    browserSync({
        notify: false,
        server: {
            baseDir: 'dist'
        }
    });

    watch('sass/**/*.scss', compilesass).on('change', reload);
    watch('*.html', compilehtml).on('change', reload);
}
 
exports.default = series(compilesass, compilehtml, moveimg);