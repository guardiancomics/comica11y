/**
 *
 * TASKS:
 *
 * 'concat_js': Combine Javascript files into a single file.
 * 'minify_js': Minify the contact Javascript file.
 * 'scripts': Runs 'concat_js' and then 'minify_js'.
 * 'watch_scripts': Watches for any Javascript file changes in either the cutup or WP theme directory.
 *
 * 'sass': Parse the .scss files. Runs auto-prefixer and merges media queries.
 * 'minify_css': Minify the Stylesheet files.
 * 'styles': Runs 'sass' and then 'minify_css'.
 * 'watch_styles': Watches for any stylesheet changes in either the cutup or WP theme directory.
 *
 * 'iconfont': Create icon font files and stylesheets.
 *
 * 'default': Runs 'scripts' and 'styles'.
 * 'watch': Watches for any script or stylesheet changes in either the cutup or WP theme directory.
 *
 *
 * FOR DEVELOPMENT:
 *
 * Run 'gulp watch' to monitor development changes, and create processed assets.
 *
 *
 * FOR PRODUCTION:
 *
 * Currently assumes development build is production ready.
 * TODO: Deployment script will potentially run a production based gulp task prior to updating a live environment.
 *
 *
 * NOTES:
 *
 * This file should sit in the root directory of the project, above the 'cutup' and 'theme' directories.
 *
 * The 'watch' tasks will monitor for file changes in either the 'cutup' or WP 'theme' directory.
 * Upon the file change, a callback function will update the active_directory variable with the directory in which
 * the file change was made (i.e. either 'cutup' or 'theme').
 * Any other tasks triggered by the 'watch' tasks will only action the files specified by the active_directory variable.
 *
 *
 * CODE SECTIONS:
 *
 * - Packages - Load gulp packages.
 * - Helpers - Functions to assist with other tasks.
 * - Javascript Tasks - Defined gulp tasks for processing Javascript files.
 * - Stylesheet Tasks - Defined gulp tasks for processing Stylesheet files.
 * - Global Tasks - Defined gulp tasks for default processing.
 * - Set gulp Tasks - Define the gulp tasks.
 *
 */


/**
 * During gulp task processing, stores the directory name of the currently modified files
 *
 * @type {string}
 */
var active_directory = 'cutup'; // Store the active directory to process (e.g. 'cutup' or 'theme')


/**
 * --------------------------------------------------------------------------
 * PACKAGES
 * --------------------------------------------------------------------------
 *
 */
var gulp = require('gulp');

// Helpers
var pump = require('pump');
var rename = require('gulp-rename');

// Javacsript
var uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');

// Stylesheets
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gcmq = require('gulp-group-css-media-queries');
var cleanCSS = require('gulp-clean-css');

// Icons
var consolidate = require('gulp-consolidate');


/**
 * --------------------------------------------------------------------------
 * HELPERS
 * --------------------------------------------------------------------------
 *
 */

/**
 * Update the active directory for processing tasks
 *
 * @param path
 * @returns {string}
 */
function update_active_directory(path) {

    active_directory = 'cutup';
    return active_directory;
}

/**
 *  Display gulp task errors
 *
 * @param err
 * @param done
 */
function parse_errors(err, done) {

    console.log('\x1b[1m\x1b[41m\x1b[37m%s\x1b[0m', err);
    // console.log(err); // Verbose error logs

    done();
}


/**
 * --------------------------------------------------------------------------
 * JAVASCRIPT TASKS
 * --------------------------------------------------------------------------
 *
 */

/**
 * Gulp task for concatenating Javascript files
 *
 * @param done
 */
var task_concat_js = function(done) {

    pump([
            gulp.src([
                active_directory + '/src/js/**/*.js',
                '!' + active_directory + '/src/js/resources/**'
            ]),
            concat('build.js').on('error', function(err) {
                parse_errors(err, done);
            }),
            gulp.dest(active_directory + '/dist/js')
        ],
        done
    );
};

/**
 * Gulp task for compressing Javascript files
 *
 * @param done
 */
var task_minify_js = function(done) {

    pump([
            gulp.src([
                active_directory + '/dist/js/build.js'
            ], {
                allowEmpty: true
            }),
            uglify().on('error', function(err) {
                parse_errors(err, done);
            }),
            gulp.dest(active_directory + '/dist/js')
        ],
        done
    );
};

/**
 * Gulp task for copying non minified Javascript files into dist folder
 * 
 * Not all JS assets are desirable to be minified. For example: jQuery could be loaded via CDN, so we don't want it rolled into our min.
 * We also have matchMedia js assets that are pollyfil for ie9 and below, these also should not go into build.js
 *
 * @param done
 */
var task_copy_js = function(done) {

    pump([
            gulp.src([
                active_directory + '/src/js/resources/**/*.js'
            ]),
            gulp.dest(active_directory + '/dist/js/resources')
        ],
        done
    );
};

/**
 * Gulp task for processing Javascript files
 *
 * @param done
 */
var task_scripts = function(done) {

    done();
};

/**
 * Gulp task for initialising the 'watch' events for Javascript files
 *
 */
var task_watch_scripts = function(done) {

    var watcher = gulp.watch(
        [
            active_directory + '/src/js/**/*.js'
        ],
        {
            alwaysStat: true
        },
        gulp.series('scripts')
    );

    watcher.on('change', function(path, stats) {

        update_active_directory(path);
        console.log('File ' + path + ' was changed');
    });
};


/**
 * --------------------------------------------------------------------------
 * STYLESHEET TASKS
 * --------------------------------------------------------------------------
 *
 */

/**
 * Gulp task for processing sass files
 *
 * @param done
 */
var task_sass = function(done) {

    pump([
            gulp.src([
                active_directory + '/src/css/*.scss'
            ]),
            sass({
                style: 'expanded',
                sourcemap: false
            }).on('error', function(err){
                parse_errors(err, done);
            }),
            autoprefixer({
                browsers: 'last 3 versions, Explorer > 8, android 4'
            }).on('error', function(err) {
                parse_errors(err, done);
            }),
            gcmq().on('error', function(err) {
                parse_errors(err, done);
            }),
            gulp.dest(active_directory + '/dist/css')
        ],
        done
    );
};

/**
 * Gulp task for minifying stylesheets
 *
 * @param done
 */
var task_minify_css = function(done) {

    pump([
            gulp.src(
                [
                    active_directory + '/dist/css/*.css',
                    '!' + active_directory + '/dist/css/*.min.css'
                ],
                {
                    allowEmpty: true
                }
            ),
            cleanCSS({
                compatibility: 'ie9'
            }).on('error', function(err){
                parse_errors(err, done);
            }),
            rename({
                extname : '.min.css'
            }),
            gulp.dest(active_directory + '/dist/css')
        ],
        done
    );
}

/**
 * Gulp task for copying CSS resources that need referencing such as iconfonts and webfonts
 * 
 * @param done
 */
var task_copy_css_assets = function(done) {

    pump([
            gulp.src([
                active_directory + '/src/css/resources/**/*'
            ]),
            gulp.dest(active_directory + '/dist/css/resources')
        ],
        done
    );
};

/**
 * Gulp task for processing Stylesheet files
 *
 * @param done
 */
var task_styles = function(done) {

    done();
};


/**
 * Gulp task for initialising the 'watch' events for Stylesheet files
 *
 */
var task_watch_styles = function(done) {

    var watcher = gulp.watch(
        [
            active_directory + '/src/css/**/*.scss'
        ],
        {
            alwaysStat: true
        },
        gulp.series('styles')
    );

    watcher.on('change', function(path, stats) {

        update_active_directory(path);
        console.log('File ' + path + ' was changed');
    });
};


/**
 * --------------------------------------------------------------------------
 * GLOBAL TASKS
 * --------------------------------------------------------------------------
 *
 */

/**
 * Gulp task that runs general tasks
 *
 * @param done
 */
var task_default = function(done) {

    done();
};


/**
 * --------------------------------------------------------------------------
 * SET GULP TASKS
 * --------------------------------------------------------------------------
 *
 */

gulp.task('concat_js', task_concat_js);
gulp.task('minify_js', task_minify_js);
gulp.task('copy_js', task_copy_js);
gulp.task('scripts', gulp.series('concat_js', 'minify_js', 'copy_js'), task_scripts);
gulp.task('watch_scripts', task_watch_scripts);

gulp.task('sass', task_sass);
gulp.task('minify_css', task_minify_css);
gulp.task('copy_css', task_copy_css_assets);
gulp.task('styles', gulp.series('sass', 'minify_css', 'copy_css'), task_styles);
gulp.task('watch_styles', task_watch_styles);

gulp.task('watch', gulp.parallel('watch_scripts', 'watch_styles'));
gulp.task('default', gulp.parallel('scripts', 'styles'), task_default);