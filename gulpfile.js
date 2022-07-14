const gulp = require('gulp');
const browserSync = require('browser-sync').create();


// Просматривать файлы
function watch () {

	browserSync.init({
		ghostMode: false,
		server: {
			baseDir: "./src",
		}
	});

	gulp.watch('./src/**/**/**/**/**/*.*').on('change', browserSync.reload);

}

gulp.task('default', gulp.series(watch));
