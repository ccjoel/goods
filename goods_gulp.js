gulp.task('js', ['jshint'], function() {
    var source = pkg.paths.js;
    return gulp.src(source)
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js', {newLine: ';'}))
        // Annotate before uglify so the code get's min'd properly.
        .pipe(ngAnnotate({
            // true helps add where @ngInject is not used. It infers.
            // Doesn't work with resolve, so we must be explicit there
            add: true
        }))
        .pipe(bytediff.start())
        .pipe(uglify({mangle: true}))
        .pipe(bytediff.stop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(pkg.paths.dev));
});

// from https://github.com/johnpapa/angularjs-styleguide
