module.exports = {
    presets: [['babel-preset-zillow', { modules: false }]],
    env: {
        cjs: {
            presets: ['babel-preset-zillow'],
        },
        test: {
            presets: ['babel-preset-zillow'],
        },
    },
};
