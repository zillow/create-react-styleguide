import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledButton = styled.button`
    ${props => props.theme.Button};
`;
const Button = props => <StyledButton {...props} />;

Button.propTypes = {
    /** Button content */
    children: PropTypes.node.isRequired,
    /** Button type */
    type: PropTypes.oneOf(['primary', 'secondary']),
    /** Enable outline buttons */
    outline: PropTypes.bool,
};

Button.defaultProps = {
    type: 'primary',
    outline: false,
};

export default Button;
