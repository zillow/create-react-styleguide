const path = require('path');
const { createStyleguideConfig } = require('create-react-styleguide');

module.exports = createStyleguideConfig({
    /* your own config shallowly merged */
    sections: [
        {
            name: 'Introduction',
            content: 'docs/introduction.md',
        },
    ],
    styleguideComponents: {
        Wrapper: path.join(__dirname, 'src/styleguidist/ThemeWrapper'),
    },
});
