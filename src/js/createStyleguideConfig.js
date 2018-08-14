import path from 'path';
import getCRSConfig from './getCRSConfig';
import linkStyleguides from './linkStyleguides';

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

export default createStyleguideConfig;
