const fs = require('fs');
const path = require('path');
const glob = require('glob');

const currentPath = process.cwd();

/**
 *  Modifies the styleguideConfig to include components from each given module in separate sections
 */
const linkStyleguides = (modules, styleguideConfig = {}) => {
    if (!styleguideConfig.sections) {
        // eslint-disable-next-line no-param-reassign
        styleguideConfig.sections = [];
    }
    if (styleguideConfig.components) {
        const files = glob.sync(styleguideConfig.components);
        if (files.length) {
            styleguideConfig.sections.push({
                name: 'Components',
                components: styleguideConfig.components,
            });
        }
    }
    modules.forEach(module => {
        styleguideConfig.sections.push({
            name: module,
            components: `node_modules/${module}/src/components/**/[A-Z]*.jsx`,
        });
        styleguideConfig.webpackConfig.module.rules[0].include.push(
            // Use realpath to resolve symlinks
            // https://github.com/webpack/webpack/issues/1643
            fs.realpathSync(path.join(currentPath, `node_modules/${module}/src`))
        );
    });
    return styleguideConfig;
};

module.exports = linkStyleguides;
