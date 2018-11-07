import React from 'react';
import renderer from 'react-test-renderer';
import Button, { StyledButton } from '../components/Button/Button';
import Bootstrap from '../themes';

describe('Themed Styled Button', () => {
    it('displays a button with requested text', () => {
        const component = renderer.create(<StyledButton theme={Bootstrap}>Click Me!</StyledButton>);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('displays a secondary button with requested text', () => {
        const component = renderer.create(
            <StyledButton theme={Bootstrap} type="secondary">
                ⊙_ʘ
            </StyledButton>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('Themed Button', () => {
    it('displays a button with requested text', () => {
        const component = renderer.create(<Button theme={Bootstrap}>Click Me!</Button>);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('displays a secondary button with requested text', () => {
        const component = renderer.create(
            <Button theme={Bootstrap} type="secondary">
                ⊙_ʘ
            </Button>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
