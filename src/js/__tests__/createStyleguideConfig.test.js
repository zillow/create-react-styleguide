const { createStyleguideConfig } = require('../..');

afterEach(() => {
    // this value should not bleed between tests
    delete process.env.creatingStyleguideConfig;
});

describe('config.serverPort', () => {
    afterEach(() => {
        delete process.env.PORT;
    });

    it('is set when process.env.PORT exists', () => {
        process.env.PORT = '12345';
        expect(createStyleguideConfig()).toHaveProperty('serverPort', 12345);
    });

    it('is not set when process.env.PORT does not exist', () => {
        expect(createStyleguideConfig()).not.toHaveProperty('serverPort');
    });
});

describe('webpackConfig.resolve.alias', () => {
    it('is configured at root level', () => {
        expect(createStyleguideConfig()).toHaveProperty('webpackConfig.resolve.alias', {
            'react': expect.stringMatching(/node_modules\/react$/),
            'react-dom': expect.stringMatching(/node_modules\/react-dom$/),
            // missing deps (e.g., styled-components) are merely skipped
        });
    });

    it('is not configured in nested executions', () => {
        process.env.creatingStyleguideConfig = '1';
        expect(createStyleguideConfig()).not.toHaveProperty('webpackConfig.resolve.alias');
    });
});

describe('IE 11 support for styleguidist artifacts', () => {
    it('is configured at root level', () => {
        const { webpackConfig } = createStyleguideConfig();
        expect(webpackConfig.module.rules[1]).toHaveProperty('use.options.presets', [
            [
                '@babel/preset-env',
                {
                    modules: 'commonjs',
                    targets: {
                        ie: '11',
                    },
                },
            ],
        ]);
    });

    it('is not configured in nested executions', () => {
        process.env.creatingStyleguideConfig = '1';
        const { webpackConfig } = createStyleguideConfig();
        expect(webpackConfig.module.rules).toHaveLength(1);
    });
});
