const pkgUp = require('pkg-up');
const cp = require('child_process');

const fetch = 'git fetch origin master';
const currentBranchName = 'git rev-parse --abbrev-ref HEAD';
const porcelain = 'git status --porcelain';
const upToDate = 'git diff HEAD FETCH_HEAD';

module.exports = () =>
  pkgUp().then(pkg => {
    const cwd = pkg.split('package.json')[0];

    const exec = cmd =>
      new Promise((resolve, reject) =>
        cp.exec(cmd, { cwd }, (err, stdout) => err ? reject(err) : resolve(stdout))
      );

    return exec(fetch).then(() => exec(currentBranchName))
      .then(branch =>
        branch.trim() === 'master' ?
          exec(porcelain) :
          Promise.reject(new Error(`Branch name is ${branch.trim()}`))
      )
      .then(empty => empty === '' ?
        exec(upToDate) :
        Promise.reject(new Error('Branch is not clean'))
      )
      .then(empty =>
        empty === '' ?
          Promise.resolve(true) :
          Promise.reject(new Error('Branch is not up-to-date with origin'))
        );
  });
