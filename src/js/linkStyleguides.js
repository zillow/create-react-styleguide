const fs = require('fs');
const path = require('path');
const glob = require('glob');

const currentPath = process.cwd();
const README_NAME = 'STYLEGUIDE.md';
const COMPONENTS = 'src/components/**/[A-Z]*.jsx';

const getAuthor = author => {
    if (typeof author === 'string') {
        return author;
    }
    if (author && author.name) {
        return author.name;
    }
    return false;
};

const buildSection = (pkgPath, readmePath, components) => {
    // eslint-disable-next-line
    const pkg = require(pkgPath);
    const section = {
        name: pkg.name,
        components,
        description: `| Version | Homepage | Author |\n| - | - | - |\n| ${
            pkg.version
        } | ${pkg.homepage || 'not specified'} | ${getAuthor(pkg.author) || 'not specified'} |`,
    };
    if (fs.existsSync(readmePath)) {
        section.content = fs.realpathSync(readmePath);
    }
    return section;
};

/**
 *  Modifies the styleguideConfig to include components from each given module in separate sections
 */
const linkStyleguides = (options = {}, styleguideConfig = {}) => {
    const sections = [];

    // Make sure local components exist before adding component
    const files = glob.sync(COMPONENTS);
    if (files.length) {
        sections.push(
            buildSection(
                path.join(currentPath, 'package.json'),
                path.join(currentPath, README_NAME),
                COMPONENTS
            )
        );
    }

    const styleguides = options.styleguides || [];
    styleguides.forEach(module => {
        const modulePath = path.join(currentPath, `node_modules/${module}/`);
        sections.push(
            buildSection(
                path.join(modulePath, 'package.json'),
                path.join(modulePath, README_NAME),
                `node_modules/${module}/${COMPONENTS}`
            )
        );
        styleguideConfig.webpackConfig.module.rules[0].include.push(
            // Use realpath to resolve symlinks
            // https://github.com/webpack/webpack/issues/1643
            fs.realpathSync(path.join(currentPath, `node_modules/${module}/src`))
        );
    });

    // eslint-disable-next-line no-param-reassign
    styleguideConfig.sections = sections;
    return styleguideConfig;
};

module.exports = linkStyleguides;
