// eslint-disable-next-line zillow/import/no-extraneous-dependencies
const husky = require('husky');

if (!process.env.HUSKY_SKIP_INSTALL) {
    husky.install();
}
