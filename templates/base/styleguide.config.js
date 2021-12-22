const { createStyleguideConfig } = require('create-react-styleguide');

module.exports = createStyleguideConfig({
    /* your own config shallowly merged here */
    sections: [
        {
            name: 'Introduction',
            content: 'docs/introduction.md',
        },
    ],
});
