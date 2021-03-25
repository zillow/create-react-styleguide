import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ButtonMixin } from '../../mixins/ButtonMixin';

export const StyledButton = styled.button`
    ${ButtonMixin}
`;

/**
 * A simple wrapper around a native
 * [`button`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) element.
 */
const Button = React.forwardRef((props, ref) => <StyledButton ref={ref} {...props} />);

Button.displayName = 'Button';

Button.propTypes = {
    /** Button content */
    children: PropTypes.node.isRequired,
    /** Button type */
    variant: PropTypes.oneOf(['primary', 'secondary']),
    /** Enable outline buttons */
    outline: PropTypes.bool,
};

Button.defaultProps = {
    variant: 'primary',
    outline: false,
};

export default Button;
