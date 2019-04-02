const fs = require('fs');
const path = require('path');

const COMPONENTS = 'src/components/**/[A-Z]*.{js,jsx,ts,tsx}';

const getAuthor = author => {
    if (typeof author === 'string') {
        return author;
    }
    if (author && author.name) {
        return author.name;
    }
    return false;
};

const getPackageInfo = pkg => ({
    name: pkg.name,
    description: `| Version | Homepage | Author |\n| - | - | - |\n| ${
        pkg.version
    } | ${pkg.homepage || 'not specified'} | ${getAuthor(pkg.author) || 'not specified'} |`,
});

const resolvePaths = (section, basePath) => {
    if (section.sections) {
        section.sections.forEach(s => {
            resolvePaths(s, basePath);
        });
    }
    ['content', 'components'].forEach(key => {
        if (section[key]) {
            // eslint-disable-next-line no-param-reassign
            section[key] = path.join(basePath, section[key]);
        }
    });
};

/**
 *  Modifies the styleguideConfig to include components from each given module in separate sections
 */
const linkStyleguides = (config, opts) => {
    const workingDir = process.cwd();
    const options = {
        packageSection: true,
        packageSectionComponents: false,
        componentsSection: true,
        ...opts,
    };

    // Include the components in a separate section.
    let componentsSection;
    if (options.componentsSection) {
        componentsSection = {
            name: 'Components',
            components: COMPONENTS,
        };
    }

    // Build the sections array. This should either go in the packageSection
    // if it exists, or at the root of the config.
    let sections = [
        ...(config.sections ? config.sections : []),
        ...(componentsSection ? [componentsSection] : []),
    ];
    if (options.packageSection) {
        // eslint-disable-next-line global-require, zillow/import/no-dynamic-require
        const pkg = require(path.join(workingDir, 'package.json'));
        sections = [
            {
                ...getPackageInfo(pkg),
                sections,
            },
        ];

        // Include components in the package section
        if (options.packageSectionComponents) {
            sections[0].components = COMPONENTS;
        }
    }

    const styleguides = options.styleguides || [];
    styleguides.forEach(module => {
        const basePath = path.join(workingDir, `node_modules/${module}`);

        // Update the working directory to the basePath to grab the correct
        // pacakage.json info.
        process.chdir(basePath);

        // eslint-disable-next-line global-require, zillow/import/no-dynamic-require
        const styleguide = require(path.join(basePath, 'styleguide.config.js'));
        const linkedSections = styleguide.sections || [];
        linkedSections.forEach(section => resolvePaths(section, basePath));
        sections = sections.concat(linkedSections);

        config.webpackConfig.module.rules[0].include.push(
            // Use realpath to resolve symlinks
            // https://github.com/webpack/webpack/issues/1643
            fs.realpathSync(path.join(workingDir, `node_modules/${module}/src`))
        );

        // Reset working dir
        process.chdir(workingDir);
    });

    // Only assign if there are sections, otherwise we won't pick up default config.
    if (sections.length) {
        // eslint-disable-next-line no-param-reassign
        config.sections = sections;
    }

    // https://github.com/styleguidist/react-styleguidist/issues/1137
    if (sections.length === 1) {
        config.sections.push({});
    }

    return config;
};

module.exports = (config, options) => {
    const styleguideConfig = linkStyleguides(
        {
            webpackConfig: {
                module: {
                    rules: [
                        {
                            test: /\.jsx?$/,
                            include: [path.join(process.cwd(), 'src')],
                            use: {
                                loader: 'babel-loader',
                            },
                        },
                    ],
                },
            },
            ...config,
        },
        options
    );

    if (process.env.DEBUG) {
        // eslint-disable-next-line no-console
        console.log('createStyleguideConfig object:', JSON.stringify(styleguideConfig, null, 4));
    }

    return styleguideConfig;
};
