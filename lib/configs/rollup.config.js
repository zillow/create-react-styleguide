const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const eslint = require('@rollup/plugin-eslint');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { join } = require('path');
const { terser } = require('rollup-plugin-terser');
const DIRECTORIES = require('../constants/DIRECTORIES');
const MODULE_FORMATS = require('../constants/MODULE_FORMATS');
const NODE_ENVIRONMENTS = require('../constants/NODE_ENVIRONMENTS');

const currentDirectory = process.cwd();

let pkg = {};

try {
    // eslint-disable-next-line zillow/import/no-dynamic-require, global-require
    pkg = require(`${join(currentDirectory, 'package.json')}`);
} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
}

const { MODULE_FORMAT, NODE_ENV } = process.env;
const isProduction = NODE_ENV === NODE_ENVIRONMENTS.PROD;
const outputDirectory = isProduction ? DIRECTORIES.PROD : DIRECTORIES.DEV;
const pgkIsModule = pkg.type === 'module';

const getExtension = () => {
    if (MODULE_FORMAT === MODULE_FORMATS.CJS) {
        return pgkIsModule ? '.cjs' : '.js';
    }

    if (MODULE_FORMAT === MODULE_FORMATS.ESM) {
        return pgkIsModule ? '.js' : '.mjs';
    }

    return '.js';
};

module.exports = {
    input: `${currentDirectory}/${DIRECTORIES.SRC}/index.js`,

    output: {
        dir: `${currentDirectory}/${DIRECTORIES.DIST}/${MODULE_FORMAT}/${outputDirectory}`,
        entryFileNames: `[name]${getExtension()}`,
        exports: 'named',
        format: MODULE_FORMAT,
        interop: 'auto',
        preserveModules: true,
        preserveModulesRoot: DIRECTORIES.SRC,
        sourcemap: !isProduction,
        validate: true,
    },

    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        /^@babel\/.*/,
    ],

    plugins: [
        nodeResolve({
            extensions: ['.js', '.jsx'],
        }),
        eslint(),
        commonjs(),
        babel({
            extensions: ['.js', '.jsx'],
            babelHelpers: 'runtime',
        }),
        ...(isProduction ? [terser()] : []),
    ],

    onwarn(warning, warn) {
        const ignoredCodes = ['SOURCEMAP_ERROR', 'THIS_IS_UNDEFINED'];

        if (ignoredCodes.includes(warning.code)) {
            return;
        }

        warn(warning);
    },
};
