### git-prestine

A function that returns a rejected promise if you're not on a clean, up-to-date master branch

### Install

```
yarn install git-prestine
```

### Usage

To use just require and call

```js
const prestine = require('git-prestine');

await prestine(); // throws if not clean, up-to-date, master
```

There is also a Gulp plugin for build scripts.

```js
const gulp = require('gulp');
const webpack = require('gulp-webpack');
const prestine = require('git-prestine/gulp');

gulp.task('build', function() {
  return gulp.src('./src/index.js')
    .pipe(prestine()) // task fails if not clean, up-to-date, master
    .pipe(webpack())
    .pipe(gulp.dest('dist/'));
});
```
