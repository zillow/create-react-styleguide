import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_STYLES = {
    cursor: 'pointer',
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

/**
 * A simple wrapper around a native
 * [`button`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) element.
 */
const Button = React.forwardRef(({ variant, outline, ...rest }, ref) => {
    let styles = DEFAULT_STYLES;
    if (outline && variant === 'primary') {
        styles = {
            ...DEFAULT_STYLES,
            color: '#007bff',
            backgroundColor: 'transparent',
            backgroundImage: 'none',
            borderColor: '#007bff',
        };
    } else if (outline && variant === 'secondary') {
        styles = {
            ...DEFAULT_STYLES,
            color: '#6c757d',
            backgroundColor: 'transparent',
            backgroundImage: 'none',
            borderColor: '#6c757d',
        };
    } else if (variant === 'secondary') {
        styles = {
            ...DEFAULT_STYLES,
            backgroundColor: '#6c757d',
            borderColor: '#6c757d',
        };
    }

    return <button type="button" ref={ref} style={styles} {...rest} />;
});

Button.displayName = 'Button';

Button.propTypes = {
    /** Button content */
    children: PropTypes.node.isRequired,
    /** Button variant */
    variant: PropTypes.oneOf(['primary', 'secondary']),
    /** Enable outline buttons */
    outline: PropTypes.bool,
};

Button.defaultProps = {
    variant: 'primary',
    outline: false,
};

export default Button;
