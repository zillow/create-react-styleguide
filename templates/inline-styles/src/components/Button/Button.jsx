import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        let styles = {
            display: 'inline-block',
            fontWeight: '400',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            userSelect: 'none',
            border: '1px solid transparent',
            padding: '.375rem .75rem',
            fontSize: '1rem',
            lineHeight: '1.5',
            borderRadius: '.25rem',
            transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
            color: '#fff',
            backgroundColor: '#007bff',
            borderColor: '#007bff'
        };

        if (this.props.outline && this.props.type == 'primary') {
            styles = Object.assign(styles, {
                color: '#007bff',
                backgroundColor: 'transparent',
                backgroundImage: 'none',
                borderColor: '#007bff'
            });
        } else if (this.props.outline && this.props.type == 'secondary') {
            styles = Object.assign(styles, {
                color: '#6c757d',
                backgroundColor: 'transparent',
                backgroundImage: 'none',
                borderColor: '#6c757d'
            });
        } else if (this.props.type === 'secondary') {
            styles = Object.assign(styles, {
                backgroundColor: '#6c757d',
                borderColor: '#6c757d'
            });
        }

        return <button style={styles} {...this.props} />;
    }
}
