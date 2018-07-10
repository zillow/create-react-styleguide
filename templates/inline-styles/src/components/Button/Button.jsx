import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
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
        color: '#fff',
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    };

    if (props.outline && props.type === 'primary') {
        styles = Object.assign(styles, {
            color: '#007bff',
            backgroundColor: 'transparent',
            backgroundImage: 'none',
            borderColor: '#007bff',
        });
    } else if (props.outline && props.type === 'secondary') {
        styles = Object.assign(styles, {
            color: '#6c757d',
            backgroundColor: 'transparent',
            backgroundImage: 'none',
            borderColor: '#6c757d',
        });
    } else if (props.type === 'secondary') {
        styles = Object.assign(styles, {
            backgroundColor: '#6c757d',
            borderColor: '#6c757d',
        });
    }

    const { type, outline, ...htmlAttributes } = props;
    return <button type="button" style={styles} {...htmlAttributes} />;
};

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
