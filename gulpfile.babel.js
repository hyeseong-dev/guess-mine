import gulp from "gulp";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import autoprefixer from "autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import postcss from "gulp-postcss";
import minifyCSS from "gulp-csso";
import { deleteAsync } from "del";
import bro from "gulp-browserify";

const sass = gulpSass(nodeSass);

const paths = {
    styles: {
        src: "assets/scss/styles.scss",
        dest: "src/static/styles",
        watch: "assets/scss/**/*.scss"
      },
      js: {
        src: "assets/js/main.js",
        dest: "src/static/js",
        watch: "assets/js/**/*.js"
      }
};

const clean = async () => await deleteAsync(['src/static']);
const js = () =>gulp.src(paths.js.src)
                    .pipe(bro())
                    .pipe(gulp.dest(paths.js.dest));

const styles = () => 
    gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.styles.dest));

const watchFiles = () => {
    gulp.watch(paths.styles.watch, styles);
    gulp.watch(paths.js.watch, js);
  };

const dev = gulp.series(clean, styles, js, watchFiles);

export default dev;