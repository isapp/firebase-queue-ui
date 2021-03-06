const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');
const mocha = require('gulp-mocha');
const browserify = require('browserify');
const gutil = require('gulp-util');
const sass = require('node-sass');
const path = require('path');
const dotenv = require('dotenv');
const vueify = require('vueify');
const superstatic = require('superstatic');
const watchify = require('watchify');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.cssimport({
      extensions: ['css'],
      includePaths: [path.resolve('node_modules')]
    }))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js', {read: false})
    .pipe($.plumber())
    .pipe($.tap( (file) => {
      gutil.log('bundling ' + file.path);

      bundler = browserify({
        entries: [file.path],
        debug: true,
        cache: {},
        packageCache: {}
      });

      bundler
        .transform('babelify', { presets: ['es2015'] })
        .transform(vueify);

      file.contents = bundler.bundle();
    }))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js', {
    fix: true
  })
    .pipe(gulp.dest('app/scripts'));
});

gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js', {
    fix: true,
    env: {
      mocha: true
    }
  })
    .pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('public'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('public/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('public'));
});

gulp.task('dotenv', () => {
  return gulp.src('.env')
    .pipe($.dotenv())
    .pipe($.rename('env.json'))
    .pipe(gulp.dest('app'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'public']));

gulp.task('serve', () => {
  runSequence(['clean'], ['styles', 'scripts', 'fonts', 'dotenv'], () => {
    browserSync({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/node_modules': 'node_modules'
        },
        middleware: [
          superstatic({
            stack: 'strict',
            config: require('./firebase-dev.json')
          })
        ]
      }
    });

    gulp.watch([
      'app/*.html',
      'app/images/**/*',
      '.tmp/fonts/**/*',
      '.env',
      'app/*.json'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('.env', ['dotenv']);
  });
});

gulp.task('serve:public', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['public']
    },
    middleware: [
      superstatic({
        stack: 'strict',
        config: require('./firebase.json')
      })
    ]
  });
});

gulp.task('test', () =>
  gulp.src('test/spec/**/*.js', {read: false})
    .pipe(mocha({reporter: 'xunit-file'}))
);

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras', 'dotenv'], () => {
  return gulp.src('public/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('watch', ['serve']);

gulp.task('default', () => {
  runSequence(['clean'], 'build');
});
