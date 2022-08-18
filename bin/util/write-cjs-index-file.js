const { writeFileSync } = require('fs');
const getCurrentPkg = require('./get-current-pkg');

const currentDirectory = process.cwd();
const pkg = getCurrentPkg();
const extension = pkg.type === 'module' ? 'cjs' : 'js';

const commonJsIndexTemplate = `
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod/index.${extension}');
} else {
    module.exports = require('./dev/index.${extension}');
}
`.trim();

module.exports = cb => {
    try {
        writeFileSync(
            `${currentDirectory}/dist/cjs/index.${extension}`,
            `${commonJsIndexTemplate}\n`
        );
        cb();
    } catch (err) {
        cb(err);
    }
};
