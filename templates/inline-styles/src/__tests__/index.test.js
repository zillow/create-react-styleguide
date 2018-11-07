import React from 'react';
import renderer from 'react-test-renderer';
import Button from '..';

describe('Button', () => {
    it('displays a primary button', () => {
        const component = renderer.create(<Button>Click Me!</Button>);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('displays a primary button with outline', () => {
        const component = renderer.create(<Button outline>Click Me!</Button>);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('displays a secondary button', () => {
        const component = renderer.create(<Button type="secondary">⊙_ʘ</Button>);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('displays a secondary button with outline', () => {
        const component = renderer.create(
            <Button type="secondary" outline>
                ⊙_ʘ
            </Button>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
