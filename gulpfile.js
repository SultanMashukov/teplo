const { src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const syncBrowser = require('browser-sync').create();
const uglyfy = require('gulp-uglify-es').default();
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const cmq = require('gulp-group-css-media-queries');
const fileInclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const plumber = require('gulp-plumber');


//Создание SVG спрайта из свг файлов.
function createSvgSprite(){
    return src('app/images/svg/**/*.svg')
    .pipe(plumber())
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: "../symbolSprite.svg"  //sprite file name
            }
        },
    }))
    .pipe(dest('app/images/'))
}

//Чиста директории собранного проекта, за исключением папки гита, чтобы не слетала синхронизация с сервом.
function cleanDist(){
    return del('dist/**','!dist/.git/')
    done()
}

function syncronize(){
    syncBrowser.init({
        server : {
            baseDir : 'app/',
        }
    })
}

//Подлкючение html блоков. 
function includeHtml(){
    return src(['app/html/*.html'])
    .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
      }))
    .pipe(dest('app/'))
    
}

//сжатие картинок с созданием копии УЖЕ в папке собранного проекта
function images(){
    return src('app/images/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/images'))
}

//объединение и минификация js скриптов в 1
/* function scripts(){
    return src([
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglyfy)
    .pipe(dest('app/js'))
    .pipe(syncBrowser.stream())
} */

//Препроцесс scss файлов, с автопрефиксом
function styles(){
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle:'expanded'}))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(syncBrowser.stream())
}

//Объединение всех медиазапросов в группы
function mediaQueriesCombine(){
    return src('app/css/style.css')
    .pipe(cmq())
    .pipe(dest('app/css'))
}

//Перемещение всех обработанных файлов в папку собранного проекта
function build(){
    return src([
            'app/css/**/*.css',
            'app/fonts/**/*',
            'app/js/*.js',
            'app/*.html',
        ], 
        {base: 'app'}
    )
    .pipe(dest('dist'))
}

//Отслеживаине изменений файлов
function watching(){
    watch(['app/scss/**/*.scss'],styles)
    //watch(['app/js/**/*.js'],scripts)
    watch(['app/html/**/*.html']).on('change',includeHtml)
    watch(['app/*.html']).on('change',syncBrowser.reload)
}

exports.styles = styles;
exports.watching = watching;
exports.syncronize = syncronize;
//exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.cmq = mediaQueriesCombine;
exports.includeHtml = includeHtml;
exports.svgSprite = createSvgSprite;

exports.build = series(cleanDist,images,mediaQueriesCombine,build);
exports.default = parallel(styles,syncronize,watching);//scripts