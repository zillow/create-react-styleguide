import path from 'path';

/**
 * Get configuration from the project crs.config.js file.
 */
export default () => {
    try {
        // eslint-disable-next-line
        return require(path.join(process.cwd(), 'crs.config.js'));
    } catch (e) {
        return {};
    }
};
