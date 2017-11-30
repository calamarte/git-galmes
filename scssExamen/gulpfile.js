let gulp = require('gulp');
let scss = require('gulp-sass');


gulp.task('compiladorSass', () =>{
  return gulp.src('sass/entregar.scss').pipe(scss()).pipe(gulp.dest('css'));
});

gulp.task('compiladorSass:watch', () => {
  gulp.watch('./sass/*.scss', ['compiladorSass']);
});