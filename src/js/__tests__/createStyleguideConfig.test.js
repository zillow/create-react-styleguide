const { createStyleguideConfig } = require('../..');

// normalize cwd in snapshots
const CWD_REGEXP = new RegExp(process.cwd());

expect.addSnapshotSerializer({
    test(val) {
        return typeof val === 'string' && CWD_REGEXP.test(val);
    },
    serialize(val, config, indentation, depth) {
        const str = val.replace(CWD_REGEXP, '__CWD__');
        // top-level strings don't need quotes, but nested ones do (object properties, etc)
        return depth ? `"${str}"` : str;
    },
});

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

describe('circular-dependency-plugin', () => {
    it('is configured at root level', () => {
        const { webpackConfig } = createStyleguideConfig();
        expect(webpackConfig).toHaveProperty('plugins');
        expect(webpackConfig.plugins[0]).toMatchInlineSnapshot(`
            CircularDependencyPlugin {
              "options": Object {
                "allowAsyncCycles": false,
                "cwd": "__CWD__",
                "exclude": /node_modules/,
                "failOnError": true,
                "include": /\\.\\*/,
                "onDetected": false,
              },
            }
        `);
    });

    it('is not configured in nested executions', () => {
        process.env.creatingStyleguideConfig = '1';
        const { webpackConfig } = createStyleguideConfig();
        expect(webpackConfig.plugins).toStrictEqual([]);
    });
});
