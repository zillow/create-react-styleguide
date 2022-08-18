const { join } = require('path');

module.exports = () => {
    const currentDirectory = process.cwd();

    let pkg = {};

    try {
        // eslint-disable-next-line zillow/import/no-dynamic-require, global-require
        pkg = require(`${join(currentDirectory, 'package.json')}`);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }

    return pkg;
};
