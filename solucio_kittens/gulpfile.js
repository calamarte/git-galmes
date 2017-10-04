let gulp = require('gulp');
let limpiaCSS = require('gulp-clean-css');
let limpiaJS = require('gulp-uglify');
let compilaSCSS = require('gulp-sass');
let concatJS = require('gulp-concat');
let concatCSS = require('gulp-concat-css');
let clean = require('gulp-clean');

gulp.task('minimizarCSS',['compiladorSass','unirCSS'], () => {
    return gulp.src('css/all.css').pipe(limpiaCSS()).pipe(gulp.dest('dist'));
});

gulp.task('minimizarJS',['unirJS'],() =>{
    return gulp.src('js/all.js').pipe(limpiaJS()).pipe(gulp.dest('dist'));
});

gulp.task('compiladorSass', () =>{
    return gulp.src('sass/**/*.scss').pipe(compilaSCSS()).pipe(gulp.dest('css'));
});

gulp.task('watch',()=>{
   gulp.watch('sass/**/*.scss',()=>{
      console.log('compilando sass');
   });
});

gulp.task('unirJS',()=>{
    return gulp.src(['js/modernizr-2.5.2.min.js','js/jquery-2.1.0.min.js','js/application.js']).pipe(concatJS('all.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('unirCSS',()=>{
   return gulp.src(['css/application.css','http://fonts.googleapis.com/css?family=Didact+Gothic|Ribeye+Marrow'])
       .pipe(concatCSS('all.css')).pipe(gulp.dest('css'));
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});