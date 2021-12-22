const { join } = require('path');
const runSeries = require('run-series');
const { spawn } = require('child_process');
const { rollup } = require('../../util/executables');
const noop = require('../../util/noop');
const copyTemplate = require('../../util/copy-template');
const { DIRECTORIES, MODULE_FORMATS, NODE_ENVIRONMENTS } = require('../../../lib');

const distTemplateDirectory = join(__dirname, `../../../templates/${DIRECTORIES.DIST}`);
const distTargetDirectory = join(process.cwd(), DIRECTORIES.DIST);

const build = ({ env, format, flags, cb }) =>
    spawn(rollup, ['-c', ...flags], {
        stdio: 'inherit',
        env: {
            ...process.env,
            NODE_ENV: env,
            MODULE_FORMAT: format,
        },
    }).on('close', cb);

module.exports = ({ callback = noop, flags }) => {
    const steps = [
        cb => copyTemplate(distTemplateDirectory, distTargetDirectory, {}, cb),
        cb => build({ env: NODE_ENVIRONMENTS.DEV, format: MODULE_FORMATS.ESM, flags, cb }),
        ...(flags.includes('-w')
            ? []
            : [
                  cb =>
                      build({ env: NODE_ENVIRONMENTS.DEV, format: MODULE_FORMATS.CJS, flags, cb }),
                  cb =>
                      build({ env: NODE_ENVIRONMENTS.PROD, format: MODULE_FORMATS.ESM, flags, cb }),
                  cb =>
                      build({ env: NODE_ENVIRONMENTS.PROD, format: MODULE_FORMATS.CJS, flags, cb }),
              ]),
    ];
    runSeries(steps, callback);
};
