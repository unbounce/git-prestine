const through = require('through2');
const gutil = require('gulp-util');
const prestine = require('./prestine');

module.exports = () => through.obj((file, enc, cb) => {
  prestine()
    .then(() => cb(null, file))
    .catch(err => cb(new gutil.PluginError('git-prestine/gulp', err.message)))
});
