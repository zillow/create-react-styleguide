import path from 'path';
import getCRSConfig from './getCRSConfig';
import linkStyleguides from './linkStyleguides';

const createStyleguideConfig = (options = getCRSConfig()) => {
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

    const styleguideConfig = {
        webpackConfig,
    };

    return linkStyleguides(options, styleguideConfig);
};

export default createStyleguideConfig;
