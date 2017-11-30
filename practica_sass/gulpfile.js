let gulp = require('gulp');
let scss = require('gulp-sass');

// gulp.task('compilar', ()=>{
//   return gulp.src('sass/*.scss').pipe(scss({"bundleExec": true})).pipe(gulp.dest('css/index.css'));
// });

gulp.task('compiladorSass', () =>{
  return gulp.src('sass/multi.scss').pipe(scss()).pipe(gulp.dest('css'));
});

gulp.task('compiladorSass:watch', () => {
  return gulp.watch('sass/multi.scss', ['compiladorSass']);
});