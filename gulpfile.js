// gulpfile.js
const gulp = require('gulp');
const ts = require('gulp-typescript');

// Compile TypeScript files
gulp.task('compile', () => {
  const tsProject = ts.createProject('tsconfig.json');
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

// Watch for changes in TypeScript files
gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', gulp.series('compile'));
});

// Default Gulp task
gulp.task('default', gulp.series('compile', 'watch'));
