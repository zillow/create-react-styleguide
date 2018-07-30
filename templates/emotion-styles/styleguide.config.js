const path = require('path');
const createStyleguideConfig = require('create-react-styleguide').createStyleguideConfig;

module.exports = Object.assign(createStyleguideConfig(), {
    styleguideComponents: {
        Wrapper: path.join(__dirname, 'src/styleguidist/components/ThemeWrapper'),
    },
});
