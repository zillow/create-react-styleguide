const { createJestConfig } = require('../..');

describe('createJestConfig', () => {
    it('shallow merges config', () => {
        const config = createJestConfig({
            setupFilesAfterEnv: [],
        });
        expect(config.setupFilesAfterEnv).toStrictEqual([]);
        expect(config).toMatchSnapshot();
    });

    it('can be called without arguments', () => {
        const config = createJestConfig();
        expect(config).toMatchSnapshot();
    });

    describe('mocked process.env', () => {
        const OLD_ENV = process.env;

        beforeEach(() => {
            jest.resetModules();
            process.env = { ...OLD_ENV };
        });

        afterEach(() => {
            process.env = OLD_ENV;
        });

        it('logs config with DEBUG=true', () => {
            process.env.DEBUG = 'true';
            const mock = jest.spyOn(global.console, 'log').mockImplementation(() => {});
            createJestConfig();
            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock.mock.calls[0][0]).toBe('createJestConfig object:');
        });
    });
});
