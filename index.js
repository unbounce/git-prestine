const pkgUp = require('pkg-up');
const cp = require('child_process');

module.exports = () =>
  pkgUp().then(pkg => {
    const cwd = pkg.split('package.json')[0];

    const exec = cmd =>
      new Promise((resolve, reject) =>
        cp.exec(cmd, { cwd }, (err, stdout) => err ? reject(err) : resolve(stdout))
      );

    return exec('git fetch origin master')
      .then(() => exec('git rev-parse --abbrev-ref HEAD'))
      .then(branch =>
        branch.trim() === 'master' ?
          exec('git status --porcelain') :
          Promise.reject(new Error(`Branch name is ${branch.trim()}`))
      )
      .then(empty => empty === '' ?
        exec('git diff HEAD FETCH_HEAD') :
        Promise.reject(new Error('Branch is not clean'))
      )
      .then(empty =>
        empty === '' ?
          Promise.resolve(true) :
          Promise.reject(new Error('Branch is not up-to-date with origin'))
        );
  });
