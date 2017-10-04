let gulp = require('gulp');
let limpiaCSS = require('gulp-clean-css');
let limpiaJS = require('gulp-uglify');
let compilaSCSS = require('gulp-sass');


gulp.task('minimizarCSS',['compiladorSass'], () => {
    return gulp.src('css/**/*.css').pipe(limpiaCSS()).pipe(gulp.dest('dist'));
});

gulp.task('minimizarJS',() =>{
    return gulp.src('js/**/*.js').pipe(limpiaJS()).pipe(gulp.dest('dist'));
});

gulp.task('compiladorSass', () =>{
    return gulp.src('sass/**/*.scss').pipe(compilaSCSS()).pipe(gulp.dest('css'));
});