const path = require('path');
const Tacks = require('tacks');
const tempy = require('tempy');
const { createStyleguideConfig } = require('../..');

const { Dir, File, Symlink } = Tacks;

// normalize cwd in snapshots (from lazy root _or_ fixture tempdir)
const ROOT_CWD = process.cwd();
const ROOT_CWD_REGEXP = new RegExp(ROOT_CWD);

// tempy creates subdirectories with hexadecimal names that are 32 characters long
// the excluded quotes are due to other snapshot serializers mutating the raw input
const TEMP_DIR_REGEXP = /([^\s"]*[\\/][0-9a-f]{32})([^\s"]*)/g;

expect.addSnapshotSerializer({
    test(val) {
        return typeof val === 'string' && (ROOT_CWD_REGEXP.test(val) || TEMP_DIR_REGEXP.test(val));
    },
    serialize(val, config, indentation, depth) {
        const str = val
            .replace(ROOT_CWD_REGEXP, '<CWD>')
            .replace(TEMP_DIR_REGEXP, (match, cwd, subPath) => path.join('<CWD>', subPath));

        // top-level strings don't need quotes, but nested ones do (object properties, etc)
        return depth ? `"${str}"` : str;
    },
});

function setup({ node_modules, ...root } = {}) {
    const cwd = tempy.directory();

    new Tacks(
        Dir({
            ...root,
            node_modules: Dir({
                // eslint-disable-next-line camelcase
                ...node_modules,
                'create-react-styleguide': Dir({
                    'package.json': File({
                        name: 'create-react-styleguide',
                        main: 'src/index.js',
                    }),
                    // facilitate node_modules config files requiring 'create-react-styleguide'
                    'src': Symlink(
                        path.relative(
                            path.join(cwd, 'node_modules/create-react-styleguide'),
                            path.join(ROOT_CWD, 'src')
                        )
                    ),
                }),
            }),
        })
    ).create(cwd);

    process.chdir(cwd);
}

afterEach(() => {
    // this value should not bleed between tests
    delete process.env.creatingStyleguideConfig;

    // always restore original cwd
    process.chdir(ROOT_CWD);
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
        process.env.creatingStyleguideConfig = __dirname;
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
        process.env.creatingStyleguideConfig = __dirname;
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
                "cwd": "<CWD>",
                "exclude": /node_modules/,
                "failOnError": true,
                "include": /\\.\\*/,
                "onDetected": false,
              },
            }
        `);
    });

    it('is not configured in nested executions', () => {
        process.env.creatingStyleguideConfig = __dirname;
        const { webpackConfig } = createStyleguideConfig();
        expect(webpackConfig.plugins).toStrictEqual([]);
    });
});

describe('config.sections', () => {
    it('resolves parent component globs relative to cwd', () => {
        setup({
            'package.json': File({
                name: 'my-default-styleguide',
                version: '1.0.0',
                homepage: 'https://my-default-styleguide.com/',
            }),
            // no root styleguide.config.js necessary because we're calling it below
        });

        const { sections } = createStyleguideConfig();

        // a single top-level section always has an empty object pushed onto it
        // @see https://github.com/styleguidist/react-styleguidist/issues/1137
        expect(sections).toMatchInlineSnapshot(`
            Array [
              Object {
                "description": "| Version | Homepage | Author |
            | - | - | - |
            | 1.0.0 | https://my-default-styleguide.com/ | not specified |",
                "name": "my-default-styleguide",
                "sections": Array [
                  Object {
                    "components": "src/components/**/[A-Z]*.{js,jsx,ts,tsx}",
                    "name": "Components",
                  },
                ],
              },
              Object {},
            ]
        `);
    });

    describe('with linked styleguides', () => {
        it('resolves nested component globs relative to parent cwd', () => {
            setup({
                'node_modules': {
                    'my-linked-styleguide': Dir({
                        'package.json': File({
                            name: 'my-linked-styleguide',
                            version: '2.0.0',
                            author: {
                                name: 'Linked Styleguide Author',
                            },
                        }),
                        // src dir is necessary due to fs.realpathSync() for webpack config
                        'src': Dir(),
                        'styleguide.config.js': File(`
                            const { createStyleguideConfig } = require('create-react-styleguide');

                            module.exports = createStyleguideConfig({
                                sections: [{
                                    name: 'Linked Introduction',
                                    content: 'docs/introduction.md',
                                }, {
                                    name: 'Linked Components',
                                    components: [
                                        'src/components/**/[A-Z]*.{js,jsx}',
                                        'packages/**/src/[A-Z]*.{js,jsx}',
                                    ],
                                }],
                            }, {
                                styleguides: ['my-parent-styleguide'],
                                componentsSection: false,
                            });
                        `),
                    }),
                },
                'package.json': File({
                    name: 'my-parent-styleguide',
                    version: '1.0.0',
                    homepage: 'https://my-parent-styleguide.com/',
                    author: 'Parent Styleguide Author',
                }),
            });

            const { sections } = createStyleguideConfig(
                {
                    sections: [
                        {
                            name: 'Top-Level Introduction',
                            content: 'docs/introduction.md',
                        },
                    ],
                },
                {
                    styleguides: ['my-linked-styleguide'],
                    packageSection: false,
                    componentsSection: false,
                }
            );

            // no empty object is appended when more than one section is configured
            expect(sections).toMatchInlineSnapshot(`
                Array [
                  Object {
                    "content": "docs/introduction.md",
                    "name": "Top-Level Introduction",
                  },
                  Object {
                    "description": "| Version | Homepage | Author |
                | - | - | - |
                | 2.0.0 | not specified | Linked Styleguide Author |",
                    "name": "my-linked-styleguide",
                    "sections": Array [
                      Object {
                        "content": "node_modules/my-linked-styleguide/docs/introduction.md",
                        "name": "Linked Introduction",
                      },
                      Object {
                        "components": Array [
                          "node_modules/my-linked-styleguide/src/components/**/[A-Z]*.{js,jsx}",
                          "node_modules/my-linked-styleguide/packages/**/src/[A-Z]*.{js,jsx}",
                        ],
                        "name": "Linked Components",
                      },
                    ],
                  },
                ]
            `);
        });
    });
});
