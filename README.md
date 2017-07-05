### git-pristine

A function that returns a rejected promise if you're not on a clean, up-to-date master branch

### Install

```
yarn install git-pristine
```

### Usage

To use just require and call

```js
const pristine = require('git-pristine');

await pristine(); // throws if not clean, up-to-date, master
```

There is also a Gulp plugin for build scripts.

```js
const gulp = require('gulp');
const webpack = require('gulp-webpack');
const pristine = require('git-pristine/gulp');

gulp.task('build', function() {
  return gulp.src('./src/index.js')
    .pipe(pristine()) // task fails if not clean, up-to-date, master
    .pipe(webpack())
    .pipe(gulp.dest('dist/'));
});
```
