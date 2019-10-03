const { createStyleguideConfig } = require('../..');

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
