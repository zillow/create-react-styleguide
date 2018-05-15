import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const StyledButton = styled('button')(props => props.theme.Button);

export default class Button extends React.Component {
    static propTypes = {
        /** Button content */
        children: PropTypes.node.isRequired,
        /** Button type */
        type: PropTypes.oneOf(['primary', 'secondary']),
        /** Enable outline buttons */
        outline: PropTypes.bool
    };
    static defaultProps = {
        type: 'primary'
    };

    render() {
        return <StyledButton {...this.props} />;
    }
}
