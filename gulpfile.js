const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
const imagemin = require('gulp-imagemin');
const imageminPngQuant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const plumber = require('gulp-plumber');
const gcmq = require('gulp-group-css-media-queries');
const ghpages = require('gh-pages');
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter');


const fonts = () => {
		src('./src/fonts/**.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('./build/fonts/'));
		return src('./src/fonts/**.ttf')
	  .pipe(ttf2woff())
	  .pipe(dest('./build/fonts/'));
}

const checkWeight = (fontname) => {
	let weight = 400;
	switch (true) {
	  case /Thin/.test(fontname):
		weight = 100;
		break;
	  case /ExtraLight/.test(fontname):
		weight = 200;
		break;
	  case /Light/.test(fontname):
		weight = 300;
		break;
	  case /Regular/.test(fontname):
		weight = 400;
		break;
	  case /Medium/.test(fontname):
		weight = 500;
		break;
	  case /SemiBold/.test(fontname):
		weight = 600;
		break;
	  case /Semi/.test(fontname):
		weight = 600;
		break;
	  case /Bold/.test(fontname):
		weight = 700;
		break;
	  case /ExtraBold/.test(fontname):
		weight = 800;
		break;
	  case /Heavy/.test(fontname):
		weight = 800;
		break;
	  case /Black/.test(fontname):
		weight = 900;
		break;
	  default:
		weight = 400;
	}
	return weight;
}

const cb = () => {}

let srcFonts = './src/scss/_fonts.scss';
let appFonts = './build/fonts/';

const fontsStyle = (done) => {
	let file_content = fs.readFileSync(srcFonts);
  
	fs.writeFile(srcFonts, '', cb);
	fs.readdir(appFonts, function (err, items) {
	  if (items) {
		let c_fontname;
		let style;
		let fontStyle;
		for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					style = items[i].includes('Italic');
					if (style == true) {
						fontStyle = 'italic'
					} else {
						fontStyle = 'normal'
					}
				  fontname = fontname[0];
		  let font = fontname.split('-')[0];
			let weight = checkWeight(fontname);

  
		  if (c_fontname != fontname) {
			fs.appendFile(srcFonts, '@include font-face("' + font + '", "' + fontname + '", "' + weight +'", ' + fontStyle +');\r\n', cb);
		  }
		  c_fontname = fontname;
		}
	  }
	})
  
	done();
  }

const svgSprites = () => {
	return src('./src/img/svg/**.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
				}
			}
		}))
		.pipe(dest('./build/img/svg'))
}

const styles = () => {
	return src('./src/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError()))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(dest('./build/css/'))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./build/css/'))
		.pipe(browserSync.stream());
}

const pug2html = () => {
	return src('./src/*.pug')
    .pipe(plumber())
    .pipe(pugLinter({ reporter: 'default' }))
    .pipe(pug({pretty: true}))
		.pipe(dest('./build'))
		.pipe(browserSync.stream());
}

const imgToApp = () => {
	return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg', './src/img/*.svg'])
    .pipe(dest('./build/img'))
}

const resources = () => {
	return src('./src/resources/**')
		.pipe(dest('./build/resources'))
}

const clean = () => {
	return del(['build/*'])
}

const scripts = () => {
	return src('./src/js/main.js')
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end'); // Don't stop the rest of the task
		})

		.pipe(sourcemaps.init())
		.pipe(uglify().on("error", notify.onError()))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./build/js'))
		.pipe(browserSync.stream());
}

const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: "./build"
		}
	});

	watch('./src/**/*.scss', styles);
	watch('./src/**/*.js', scripts);
	watch('src/**/*.pug', pug2html);
	watch('./src/img/**.jpg', imgToApp);
	watch('./src/img/**.png', imgToApp);
	watch('./src/img/**.jpeg', imgToApp);
	watch('./src/img/**.svg', svgSprites);
	watch('./src/resources/**', resources);
	watch('./src/fonts/**', fonts);
	watch('./src/fonts/**', fontsStyle);
	
}
exports.pug2html = pug2html;
exports.styles = styles;
exports.scripts = scripts;
exports.watchFiles = watchFiles;
exports.fonts = fonts;
exports.fontsStyle = fontsStyle;

exports.default = series(clean, parallel(pug2html, scripts, fonts, resources, imgToApp, svgSprites), fontsStyle, styles, watchFiles);

const images = () => {
    return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg', './src/img/**.gif'])
        .pipe(imagemin([
			imageminPngQuant(),
			mozjpeg()
		]))
        .pipe(dest('./build/img'));
}

const stylesBuild = () => {
	return src('./src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(gcmq())
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(dest('./build/css/'))
}

const scriptsBuild = () => {
	return src('./src/js/main.js')
		.pipe(webpackStream({
				mode: 'development',
				output: {
					filename: 'main.js',
				},
				module: {
					rules: [{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env']
							}
						}
					}]
				},
			}))
			.on('error', function (err) {
				console.error('WEBPACK ERROR', err);
				this.emit('end'); // Don't stop the rest of the task
			})
		.pipe(uglify().on("error", notify.onError()))
		.pipe(dest('./build/js'))
}

exports.build = series(clean, parallel(pug2html, scriptsBuild, fonts, resources, imgToApp, svgSprites), fontsStyle, stylesBuild, images);

//deploy in gh-pages

ghpages.publish('build', {
	message: 'Auto-generated commit'
});