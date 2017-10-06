let gulp = require('gulp');
let limpiaCSS = require('gulp-clean-css');
let limpiaJS = require('gulp-uglify');
let compilaSCSS = require('gulp-sass');
let concatJS = require('gulp-concat');
let concatCSS = require('gulp-concat-css');
let clean = require('gulp-clean');
let inject = require('gulp-inject');
let deleteLines = require('gulp-delete-lines');

gulp.task('minimizarCSS',['compiladorSass','unirCSS'], () => {
    return gulp.src('css/all.css').pipe(limpiaCSS()).pipe(gulp.dest('dist/css'));
});

gulp.task('minimizarJS',['unirJS'],() =>{
    return gulp.src('js/all.js').pipe(limpiaJS()).pipe(gulp.dest('dist/js'));
});

gulp.task('compiladorSass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['compiladorSass']);
});

gulp.task('compiladorSass', () =>{
    return gulp.src('sass/**/*.scss').pipe(compilaSCSS()).pipe(gulp.dest('css'));
});

gulp.task('unirJS',()=>{
    return gulp.src(['js/modernizr-2.5.2.min.js','js/jquery-2.1.0.min.js','js/application.js']).pipe(concatJS('all.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('unirCSS',()=>{
   return gulp.src(['css/application.css','http://fonts.googleapis.com/css?family=Didact+Gothic|Ribeye+Marrow'])
       .pipe(concatCSS('all.css')).pipe(gulp.dest('css'));
});

gulp.task('clean', ()=> {
    return gulp.src('dist').pipe(clean());
});

gulp.task('concatClean',()=>{
   return gulp.src(['css/all.css',"js/all.js"]).pipe(clean());
});

gulp.task('injection',['minimizarCSS','minimizarJS','copy'],()=> {
        let target = gulp.src('dist/index.html');
        let sources = gulp.src(['dist/js/*.js', 'dist/css/*.css'], {read: false});
        let filterJs = deleteLines({'filters': [/<script/i]});
        let filterCss = deleteLines({'filters': [/<link/i]});

        return target.pipe(filterJs).pipe(filterCss).pipe(inject(sources,{relative: true})).pipe(gulp.dest('dist'));
});

gulp.task('copy',()=>{
    return gulp.src('index.html').pipe(gulp.dest('dist'));
});

gulp.task('finalStep',['injection'],()=>{
    return gulp.src('img/*').pipe(gulp.dest('dist/img'));
});
