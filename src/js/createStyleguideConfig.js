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
        const val = section[key];
        if (val) {
            if (typeof val === 'string' && val.charAt(0) !== '/') {
                // eslint-disable-next-line no-param-reassign
                section[key] = path.join(basePath, val);
            }
            // components key supports an array of paths
            if (Array.isArray(val)) {
                for (let i = 0; i < val.length; i += 1) {
                    if (typeof val[i] === 'string' && val[i].charAt(0) !== '/') {
                        // eslint-disable-next-line no-param-reassign
                        val[i] = path.join(basePath, val[i]);
                    }
                }
            }
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

    let styleguides = options.styleguides || [];

    // Only link styleguides one level deep,
    // i.e. do not link styleguides from a linked styleguide
    if (process.env.creatingStyleguideConfig > 2) {
        styleguides = [];
    }

    styleguides.forEach(module => {
        const modulePath = path.join(workingDir, `node_modules/${module}`);
        const configPath = path.join(modulePath, 'styleguide.config.js');

        let styleguideConfig;
        if (fs.existsSync(configPath)) {
            // Update the working directory to the childPath to grab the correct pacakage.json info.
            process.chdir(modulePath);

            try {
                // eslint-disable-next-line global-require, zillow/import/no-dynamic-require
                styleguideConfig = require(configPath);
            } catch (error) {
                // could not load styleguide.config.js
            }
        }

        if (!styleguideConfig) {
            // eslint-disable-next-line no-console
            console.warn(
                `Warning: could not load configuration for module "${module}", make sure the module is installed and styleguide.config.js is configured correctly\n`
            );
            return;
        }

        const linkedSections = styleguideConfig.sections || [];
        linkedSections.forEach(section => resolvePaths(section, modulePath));
        sections = sections.concat(linkedSections);

        config.webpackConfig.module.rules[0].include.push(
            // Use realpath to resolve symlinks
            // https://github.com/webpack/webpack/issues/1643
            fs.realpathSync(path.join(modulePath, 'src'))
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
    // Monitor and limit the depth at which we link styleguides to direct children only.
    process.env.creatingStyleguideConfig = process.env.creatingStyleguideConfig || 0;
    process.env.creatingStyleguideConfig += 1;

    const webpackConfig = {
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
    };

    const baseConfig = {
        webpackConfig,
        ...config,
    };

    const styleguideConfig = linkStyleguides(baseConfig, options);

    if (process.env.DEBUG) {
        // eslint-disable-next-line no-console
        console.log('createStyleguideConfig object:', JSON.stringify(styleguideConfig, null, 4));
    }

    return styleguideConfig;
};
