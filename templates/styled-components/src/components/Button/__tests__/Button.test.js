import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import Button from '../Button';
import ThemeBootstrap from '../../../themes/ThemeBootstrap';

describe('Button', () => {
    it('renders a primary button', () => {
        const testRenderer = TestRenderer.create(
            <ThemeProvider theme={ThemeBootstrap}>
                <Button variant="primary">Click Me!</Button>
            </ThemeProvider>
        );
        const tree = testRenderer.toJSON();
        expect(tree).toHaveStyleRule(
            'background-color',
            ThemeBootstrap.Button.primary.backgroundColor
        );
        expect(tree).toMatchSnapshot();
    });

    it('renders a secondary button', () => {
        const testRenderer = TestRenderer.create(
            <ThemeProvider theme={ThemeBootstrap}>
                <Button variant="secondary">Click Me!</Button>
            </ThemeProvider>
        );
        const tree = testRenderer.toJSON();
        expect(tree).toHaveStyleRule(
            'background-color',
            ThemeBootstrap.Button.secondary.backgroundColor
        );
        expect(tree).toMatchSnapshot();
    });

    it('renders a primary outline button', () => {
        const testRenderer = TestRenderer.create(
            <ThemeProvider theme={ThemeBootstrap}>
                <Button variant="primary" outline>
                    Click Me!
                </Button>
            </ThemeProvider>
        );
        const tree = testRenderer.toJSON();
        expect(tree).toHaveStyleRule(
            'background-color',
            ThemeBootstrap.Button.primaryOutline.backgroundColor
        );
        expect(tree).toMatchSnapshot();
    });

    it('renders a secondary outline button', () => {
        const testRenderer = TestRenderer.create(
            <ThemeProvider theme={ThemeBootstrap}>
                <Button variant="secondary" outline>
                    Click Me!
                </Button>
            </ThemeProvider>
        );
        const tree = testRenderer.toJSON();
        expect(tree).toHaveStyleRule(
            'background-color',
            ThemeBootstrap.Button.secondaryOutline.backgroundColor
        );
        expect(tree).toMatchSnapshot();
    });
});
