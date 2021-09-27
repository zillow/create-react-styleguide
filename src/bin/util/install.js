/**
 * This is a fork of nwb's utils to support a new react styleguide template.
 * https://github.com/insin/nwb/blob/v0.22.0/src/utils.js
 */

const spawn = require('cross-spawn');
const ora = require('ora');
const resolve = require('resolve');

/**
 * Install packages from npm.
 *
 * <options>:
 * // Parsed arguments
 * args?: Object,
 * // Check if packages are resolvable from the cwd and skip installation if
 * // already installed.
 * check?: boolean,
 * // Working directory to install in
 * cwd?: string,
 * // Save dependencies to devDependencies
 * dev?: boolean,
 * // Save dependencies to package.json
 * save?: boolean,
 */
// eslint-disable-next-line consistent-return
module.exports = function install(
    // npm package names, which may be in package@version format
    packages,
    options,
    cb
) {
    const {
        check = false,
        cwd = process.cwd(),
        dev = false,
        save = false,
        legacyPeerDeps = false,
    } = options;

    if (check) {
        // eslint-disable-next-line no-param-reassign
        packages = packages.filter(pkg => {
            // Assumption: we're not dealing with scoped packages, which start with @
            const name = pkg.split('@')[0];
            try {
                resolve.sync(name, { basedir: cwd });
                return false;
            } catch (e) {
                return true;
            }
        });
    }

    if (packages.length === 0) {
        return process.nextTick(cb);
    }

    let npmArgs = ['install', '--silent', '--no-progress', '--no-package-lock'];

    if (legacyPeerDeps) {
        npmArgs.push('--legacy-peer-deps');
    }

    if (save) {
        npmArgs.push(`--save${dev ? '-dev' : ''}`);
    }

    npmArgs = npmArgs.concat(packages);

    const spinner = ora(`Installing ${joinAnd(packages)}`).start();
    const npm = spawn('npm', npmArgs, { cwd, stdio: ['ignore', 'pipe', 'inherit'] });
    npm.on('close', code => {
        if (code !== 0) {
            spinner.fail();
            cb(new Error('npm install failed'));
            return;
        }
        spinner.succeed();
        cb();
    });
};

/**
 * Join multiple items with a penultimate "and".
 */
function joinAnd(array, lastClause = 'and') {
    if (array.length === 0) {
        return '';
    }
    if (array.length === 1) {
        return String(array[0]);
    }
    return `${array.slice(0, -1).join(', ')} ${lastClause} ${array[array.length - 1]}`;
}
