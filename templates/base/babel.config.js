// eslint-disable-next-line zillow/import/no-extraneous-dependencies
const { babelConfig } = require('create-react-styleguide');

if (process.env.DEBUG) {
    // eslint-disable-next-line no-console
    console.log('babelConfig object:', JSON.stringify(babelConfig, null, 4));
}

module.exports = {
    ...babelConfig,
};
