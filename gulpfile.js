const gulp = require("gulp");
const { parallel, series, watch } = require("gulp");
const less = require("gulp-less");
// const sourcemaps = require('gulp-sourcemaps');
// const cssmin = require("gulp-cssmin");
const concat = require('gulp-concat');
const gulpautoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const include = require("gulp-include");
const clean = require("gulp-clean");
const imagemin = require("gulp-imagemin");

const srcDir = "src/";
const buildDir = "build/";

const reloadBrowser = function (done) {
  browserSync.reload();
  done();
};

function reset(cb) {
  return gulp
    .src("./" + buildDir, { allowEmpty: true, read: false })
    .pipe(clean());
}

function bootstrap(cb) {
  gulp
    .src(srcDir + "less/bootstrap.less")
    .pipe(less())
    .pipe(
      gulpautoprefixer({ overrideBrowserslist: ["last 2 versions", ">5%"] })
    )
    // .pipe(
    //   cssmin().on("error", function (err) {
    //     console.log(err);
    //   })
    // )
    .pipe(gulp.dest(buildDir + "css"))
    .pipe(browserSync.stream());
  cb();
}

function css(cb) {
  gulp
    .src(srcDir + "less/**/main.less")
    .pipe(
      less().on("error", function (err) {
        console.log(err);
      })
    )
    .pipe(
      gulpautoprefixer({ overrideBrowserslist: ["last 2 versions", ">5%"] })
    )
    // .pipe(
    //   cssmin().on("error", function (err) {
    //     console.log(err);
    //   })
    // )
    .pipe(gulp.dest(buildDir + "css"))
    .pipe(browserSync.stream());
  cb();
}

function html(cb) {
  gulp
    .src(srcDir + "html/**/*.html")
    .pipe(include())
    // .on("error", console.log)
    .pipe(gulp.dest("./" + buildDir));

  cb();
}

function img(cb) {
  gulp
    .src(srcDir + "img/**/*")
    .pipe(
      imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
    )
    .pipe(gulp.dest(buildDir));
  cb();
}

function vendor(cb) {
  lessToCSS(srcDir + "less/glyphicons-font-awesome-migrate.min.less");
  // lessToCSS(srcDir + "less/theme.less");   // Out of the box theme
  lessToCSS(srcDir + "less/account.less"); // dynamics account page styles
  lessToCSS(srcDir + "less/perform.less"); // dynamics form styles
  cb();
}


function fonts(cb) {
  gulp.src(srcDir + "fonts/**/*").pipe(gulp.dest(buildDir + "fonts"));
  cb();
}

function js(cb) {
  gulp
    .src(srcDir + "js/**/*.js")
    .pipe(concat("main.js"))
    .pipe(include())
    .on("error", console.log)
    // .pipe(gulpif(env.p, uglify()))
    .pipe(gulp.dest(buildDir + "js/"));
  cb();
}

function watching(done) {
  console.log("watching");
  browserSync.init({
    server: {
      baseDir: "build/",
    },
    online: true,
  });

  watch(srcDir + "js/**/*.js", series(js, reloadBrowser));
  watch(srcDir + "less/**/*.less", series(bootstrap, css));
  watch(srcDir + "html/**/*.html", series(html, reloadBrowser));
  done();
}

exports.default = series(
  reset,
  img,
  vendor,
  fonts,
  html,
  bootstrap,
  css,
  js,
  watching
);

exports.build = series(
  reset,
  parallel(img, vendor, fonts, html, bootstrap, css, js)
);


function lessToCSS(path) {
  gulp
    .src(path)
    .pipe(less())
    .on("error", function (error) {
      console.log(error.toString());
      this.emit("end");
    })
    .pipe(gulp.dest(buildDir + "css"));
}
