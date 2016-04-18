const gulp          = require('gulp')
const browserSync   = require('browser-sync').create()
const reload        = browserSync.reload
const uglifyCSS     = require('gulp-uglifycss')
const uglifyJS      = require('gulp-uglify')
const concat        = require('gulp-concat')
const rm            = require('gulp-rm')

const VENDOR_JS = [
  'node_modules/angular/angular.js',
  'node_modules/angular-route/angular-route.js',
  'node_modules/jquery/dist/jquery.js',
  'node_modules/materialize-css/dist/js/materialize.js',
]

gulp.task('default', ['watch'])

/** 
  Common config
*/

gulp.task('copy-static', ['copy-partials', 'copy-index'])

gulp.task('copy-index', () => gulp
  .src('app/index.html')
  .pipe(gulp.dest('build'))
)

gulp.task('copy-partials', () => gulp
  .src('app/partials/*.html', {
    base: 'app/partials'
  })
  .pipe(gulp.dest('build/partials'))
)

gulp.task('clean', () => gulp
    .src('build/**/*', { read: false })
    .pipe(rm())
)

/** 
  Development config
*/

gulp.task('dev', ['clean', 'copy-static', 'dev:js', 'dev:vendor-js', 'dev:css'])

gulp.task('dev:js', () => gulp
    .src('app/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'))
)

gulp.task('dev:vendor-js', () => gulp
    .src(VENDOR_JS)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build'))
)

gulp.task('dev:css', () => gulp
    .src([
      'assets/stylesheets/*.css',
      'assets/stylesheets/**/*.css'
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build'))
)

gulp.task('browser-sync', ['dev'], () => browserSync
    .init({
      server: {
        baseDir: 'build',
        routes: {
          '/static': 'static'
        },
      },
    })
)

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('app/**/*.html', ['copy-static'])
  gulp.watch('app/**/*.js', ['dev:js', 'dev:vendor-js'])
  gulp.watch('assets/stylesheets/**/*.css', ['dev:css'])
  gulp.watch('build/*').on('change', reload)
})

/** 
  Production config
*/

gulp.task('build', ['clean', 'copy-static', 'build:js', 'build:css'])

gulp.task('build:js', () => gulp
    .src('app/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglifyJS())
    .pipe(gulp.dest('build'))
)

gulp.task('build:vendor-js', () => gulp
    .src(VENDOR_JS)
    .pipe(concat('vendor.js'))
    .pipe(uglifyJS())
    .pipe(gulp.dest('build'))
)

gulp.task('build:css', () => gulp
    .src([
      'assets/stylesheets/*.css',
      'assets/stylesheets/**/*.css'
    ])
    .pipe(concat('style.css'))
    .pipe(uglifyCSS())
    .pipe(gulp.dest('build'))
)