import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Button from '..';

describe('Button', () => {
    it('displays a primary button', () => {
        const tree = shallow(<Button>Click Me!</Button>);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('displays a primary button with outline', () => {
        const tree = shallow(<Button outline>Click Me!</Button>);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('displays a secondary button', () => {
        const tree = shallow(<Button type="secondary">⊙_ʘ</Button>);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('displays a secondary button with outline', () => {
        const tree = shallow(
            <Button type="secondary" outline>
                ⊙_ʘ
            </Button>
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});
