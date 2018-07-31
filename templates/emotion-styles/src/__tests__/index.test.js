import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Button, { StyledButton } from '../components/Button/Button';
import Bootstrap from '../themes';

describe('Themed Styled Button', () => {
    it('displays a button with requested text', () => {
        const tree = shallow(<StyledButton theme={Bootstrap}>Click Me!</StyledButton>);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('displays a secondary button with requested text', () => {
        const tree = shallow(
            <StyledButton theme={Bootstrap} type="secondary">
                ⊙_ʘ
            </StyledButton>
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});

describe('Themed Button', () => {
    it('displays a button with requested text', () => {
        const tree = shallow(<Button theme={Bootstrap}>Click Me!</Button>);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('displays a secondary button with requested text', () => {
        const tree = shallow(
            <Button theme={Bootstrap} type="secondary">
                ⊙_ʘ
            </Button>
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});
