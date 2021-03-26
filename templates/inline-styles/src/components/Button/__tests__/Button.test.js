import React from 'react';
import TestRenderer from 'react-test-renderer';
import Button from '../Button';

describe('Button', () => {
    it('renders a primary button', () => {
        const testRenderer = TestRenderer.create(<Button>Click Me!</Button>);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('renders a primary button with outline', () => {
        const testRenderer = TestRenderer.create(<Button outline>Click Me!</Button>);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('renders a secondary button', () => {
        const testRenderer = TestRenderer.create(<Button variant="secondary">Click Me!</Button>);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('renders a secondary button with outline', () => {
        const testRenderer = TestRenderer.create(
            <Button variant="secondary" outline>
                Click Me!
            </Button>
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });
});
