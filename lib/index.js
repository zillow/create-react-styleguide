const babelConfig = require('./configs/babel.config');
const jestConfig = require('./configs/jest.config');
const prettierConfig = require('./configs/prettier.config');
const rollupConfig = require('./configs/rollup.config');
const createStyleguideConfig = require('./configs/createStyleguideConfig');
const DIRECTORIES = require('./constants/DIRECTORIES');
const MODULE_FORMATS = require('./constants/MODULE_FORMATS');
const NODE_ENVIRONMENTS = require('./constants/NODE_ENVIRONMENTS');

module.exports = {
    babelConfig,
    jestConfig,
    prettierConfig,
    rollupConfig,
    createStyleguideConfig,
    DIRECTORIES,
    NODE_ENVIRONMENTS,
    MODULE_FORMATS,
};
