import gulp from "gulp";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import autoprefixer from "autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import postcss from "gulp-postcss";
import minifyCSS from "gulp-csso";

const sass = gulpSass(nodeSass);

const paths = {
styles: {
src: "assets/scss/styles.scss",
dest: "src/static/styles",
watch: "assets/scss/**/*.scss"
}
};

function styles() {
return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
gulp.watch(paths.styles.watch, gulp.series(styles));
}

const dev = gulp.series(styles, watch);

export default dev;