module.exports = {
    presets: [['babel-preset-zillow', { modules: false }]],
    env: {
        cjs: {
            presets: ['babel-preset-zillow'],
        },
        test: {
            presets: [
                [
                    'babel-preset-zillow',
                    {
                        // Fixes "No styles found on passed component"
                        // https://github.com/styled-components/jest-styled-components/issues/294
                        'styled-components': {
                            displayName: false,
                            ssr: false,
                            namespace: 'sc',
                        },
                    },
                ],
            ],
        },
    },
};
