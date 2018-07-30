import theme from '..';

describe('Bootstrap theme', () => {
    it('primary button', () => {
        const styles = theme.Button({
            type: 'primary',
        });
        expect(styles).toMatchSnapshot();
    });

    it('primary button with outline', () => {
        const styles = theme.Button({
            type: 'primary',
            outline: true,
        });
        expect(styles).toMatchSnapshot();
    });

    it('secondary button', () => {
        const styles = theme.Button({
            type: 'secondary',
        });
        expect(styles).toMatchSnapshot();
    });

    it('secondary button with outline', () => {
        const styles = theme.Button({
            type: 'secondary',
            outline: true,
        });
        expect(styles).toMatchSnapshot();
    });
});
