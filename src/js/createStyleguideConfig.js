const path = require('path');
const getCRSConfig = require('./getCRSConfig');
const linkStyleguides = require('./linkStyleguides');

const createStyleguideConfig = (options = getCRSConfig()) => {
    const babelIncludes = options.babelIncludes || [];
    const webpackConfig = {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: [
                        path.join(process.cwd(), 'src'),
                        path.join(process.cwd(), 'styleguidist'),
                    ].concat(babelIncludes),
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ],
        },
    };

    const styleguideConfig = {
        webpackConfig,
    };

    return linkStyleguides(options, styleguideConfig);
};

module.exports = createStyleguideConfig;
