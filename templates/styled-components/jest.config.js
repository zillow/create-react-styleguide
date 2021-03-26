const { createJestConfig } = require('create-react-styleguide');

module.exports = createJestConfig({
    /* your own config shallowly merged here */
    setupFilesAfterEnv: ['jest-styled-components'],
});
