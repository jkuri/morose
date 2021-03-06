import { npmPublish, npmLogin, execSilent } from '../../utils/process';
import { createPackageJson } from '../../utils/utils';

export default function() {
  return Promise.resolve()
    .then(() => createPackageJson('package.json', 'test-package', '0.0.1'))
    .then(() => npmLogin('admin', 'blabla', 'foo@bar.com'))
    .then(() => npmPublish())
    .then(() => execSilent(
      'npm', ['owner', 'add', 'developer', 'test-package', '--fetch-retries', '0']))
    .then(res => {
      console.log(res.code);
      console.log(res.stdout);
      console.log(res.stderr);
      if (res.code === 0) {
        return Promise.resolve();
      }
      return Promise.reject('');
    })
    .catch(() => Promise.reject(''));
}
