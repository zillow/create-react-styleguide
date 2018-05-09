import path from 'path';
import classProperties from 'babel-plugin-transform-class-properties';
import objectRestSpread from 'babel-plugin-transform-object-rest-spread';
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
                        options: {
                            presets: ['babel-preset-react', 'babel-preset-env'],
                            plugins: [classProperties, objectRestSpread],
                        },
                    },
                },
            ],
        },
    };

    const styleguideConfig = {
        components: 'src/components/**/[A-Z]*.jsx',
        webpackConfig,
    };

    if (options.styleguides && options.styleguides.length) {
        return linkStyleguides(options.styleguides, styleguideConfig);
    }

    return styleguideConfig;
};

export default createStyleguideConfig;
