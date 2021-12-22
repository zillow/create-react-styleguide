const MODULE_FORMATS = require('../constants/MODULE_FORMATS');
const NODE_ENVIRONMENTS = require('../constants/NODE_ENVIRONMENTS');
const SUPPORTED_BROWSERS = require('../constants/SUPPORTED_BROWSERS');

const { NODE_ENV, MODULE_FORMAT } = process.env;
const isDev = NODE_ENV === NODE_ENVIRONMENTS.DEV;
const isProduction = NODE_ENV === NODE_ENVIRONMENTS.PROD;
const isTest = NODE_ENV === NODE_ENVIRONMENTS.TEST;

module.exports = {
    presets: [
        [
            'babel-preset-zillow',
            {
                'modules': MODULE_FORMAT === MODULE_FORMATS.ESM ? false : 'auto',

                'targets': isTest ? { node: 'current' } : SUPPORTED_BROWSERS,

                'removePropTypes': {
                    mode: isProduction ? 'remove' : 'wrap',
                    removeImport: isProduction,
                },

                'styled-components': {
                    fileName: false,
                    displayName: isDev,
                    pure: true,
                    ssr: isProduction,
                },
            },
        ],
    ],
    plugins: [
        ['@babel/plugin-transform-runtime'],
        // class-properties has a hard-coded `loose` value of `true` in babel-preset-zillow, and
        // private-methods needs to match. I tried updating babel-preset-zillow to explicitly set
        // `loose` for both plugins, but for some reason we were still getting warnings. Until that
        // can be figured out, we can list the three plugins ourselves here.
        // https://github.com/zillow/javascript/pull/11
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ],
    ignore: isProduction ? ['**/__tests__/**'] : [],
};
