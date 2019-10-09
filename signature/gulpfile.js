const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

// setup console reporter
const JasmineConsoleReporter = require('jasmine-console-reporter');
const reporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4|Object
    listStyle: 'indent', // "flat"|"indent"
    timeUnit: 'ms',      // "ms"|"ns"|"s"
    timeThreshold: { ok: 500, warn: 1000, oof: 3000 }, // Object|Number
    activity: true,
    emoji: true,         // boolean or emoji-map object
    beep: true
});
 
gulp.task('default', () =>
    gulp.src('dist/**/*[sS]pec.js')
        .pipe(jasmine({
            reporter: reporter
        }))
);