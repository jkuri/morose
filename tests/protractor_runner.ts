import { execSilent, exec } from './e2e/utils/process';
import { morose, killAllProcesses } from './e2e/utils/process';
import { join } from 'path';
import * as temp from 'temp';

let tempRoot = null;
let exitCode = null;

Promise.resolve()
  .then(() => process.chdir(join(__dirname, '../')))
  .then(() => execSilent('npm',  ['run', 'build:prod']))
  .then(() => execSilent('npm', ['link']))
  .then(() => {
    tempRoot = temp.mkdirSync('morose-e2e-protractor');
    console.log(`Using "${tempRoot}" as temporary directory for e2e protractor tests.`);
  })
  .then(() => morose(tempRoot))
  .then(() => exec('npm', ['run', 'protractor:ci']))
  .then(result => {
    exitCode = result.code;
    return killAllProcesses();
  })
  .then(() => process.exit(exitCode));
