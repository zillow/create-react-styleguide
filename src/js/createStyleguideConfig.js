const fs = require('fs');
const path = require('path');
const resolvePkg = require('resolve-pkg');
const CircularDependencyPlugin = require('circular-dependency-plugin');

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

const isRootConfig = () =>
    // this env var is only _set_ in the root, and read everywhere else with different CWDs
    path.relative(process.env.creatingStyleguideConfig, process.cwd()) === '';

const getPackageInfo = pkg => ({
    name: pkg.name,
    description: `| Version | Homepage | Author |\n| - | - | - |\n| ${pkg.version} | ${
        pkg.homepage || 'not specified'
    } | ${getAuthor(pkg.author) || 'not specified'} |`,
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
                section[key] = path.join(
                    path.relative(process.env.creatingStyleguideConfig, basePath),
                    val
                );
            }
            // components key supports an array of paths
            if (Array.isArray(val)) {
                for (let i = 0; i < val.length; i += 1) {
                    if (typeof val[i] === 'string' && val[i].charAt(0) !== '/') {
                        // eslint-disable-next-line no-param-reassign
                        val[i] = path.join(
                            path.relative(process.env.creatingStyleguideConfig, basePath),
                            val[i]
                        );
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
    if (!isRootConfig()) {
        styleguides = [];
    }

    styleguides.forEach(moduleName => {
        const modulePath = path.join(workingDir, `node_modules/${moduleName}`);
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
                `Warning: could not load configuration for module "${moduleName}", make sure the module is installed and styleguide.config.js is configured correctly\n`
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
    if (isRootConfig() && sections.length === 1) {
        config.sections.push({});
    }

    return config;
};

module.exports = (config, options) => {
    // Monitor and limit the depth at which we link styleguides to direct children only.
    if (typeof process.env.creatingStyleguideConfig === 'undefined') {
        process.env.creatingStyleguideConfig = process.cwd();
    }

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
        plugins: [],
    };

    // only the root should alias singletons or check circularity
    if (isRootConfig()) {
        // IE 11 support for styleguidist-generated artifacts
        webpackConfig.module.rules.push({
            test: /\.jsx?$/,
            include: /node_modules\/(?=(acorn-jsx|estree-walker|regexpu-core|unicode-match-property-ecmascript|unicode-match-property-value-ecmascript|react-dev-utils|ansi-styles|ansi-regex|chalk|strip-ansi)\/).*/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: 'commonjs',
                                targets: {
                                    ie: '11',
                                },
                            },
                        ],
                    ],
                },
            },
        });

        webpackConfig.resolve = {
            alias: ['react', 'react-dom', 'styled-components'].reduce((acc, name) => {
                // resolvePkg does not throw if it cannot resolve, merely returns undefined
                const realPath = resolvePkg(name);

                if (realPath) {
                    acc[name] = realPath;
                }

                return acc;
            }, {}),
        };

        webpackConfig.plugins.push(
            new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: true,
                cwd: process.cwd(),
            })
        );
    }

    const baseConfig = {
        webpackConfig,
        ...config,
    };

    if (process.env.PORT) {
        // the default is 6060, and provided upstream
        baseConfig.serverPort = Number.parseInt(process.env.PORT, 10);
    }

    const styleguideConfig = linkStyleguides(baseConfig, options);

    // istanbul ignore next: irrelevant
    if (process.env.DEBUG) {
        // eslint-disable-next-line global-require
        require('util').inspect.defaultOptions = {
            breakLength: Infinity,
            compact: false,
            // 'colors' defaults to true when TTY is interactive
            depth: 10,
        };

        // eslint-disable-next-line no-console
        console.log(
            'createStyleguideConfig (isRootConfig = %j)\n%O',
            isRootConfig(),
            styleguideConfig
        );

        // inject trailing newline when config is nested
        if (!isRootConfig()) {
            // eslint-disable-next-line no-console
            console.log();
        }
    }

    return styleguideConfig;
};
