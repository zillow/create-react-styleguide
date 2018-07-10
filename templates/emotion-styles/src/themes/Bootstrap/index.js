export default {
    Button: props => {
        let color;
        if (!props.outline) {
            color = '#fff';
        } else if (props.type === 'primary') {
            color = '#007bff';
        } else {
            color = '#6c757d';
        }

        let backgroundColor;
        if (props.outline) {
            backgroundColor = 'transparent';
        } else if (props.type === 'primary') {
            backgroundColor = '#007bff';
        } else {
            backgroundColor = '#6c757d';
        }

        let borderColor;
        if (props.type === 'primary') {
            borderColor = '#007bff';
        } else {
            borderColor = '#6c757d';
        }

        let hoverBackgroundColor;
        if (props.outline) {
            if (props.type === 'primary') {
                hoverBackgroundColor = '#007bff';
            } else {
                hoverBackgroundColor = '#6c757d';
            }
        } else if (props.type === 'primary') {
            hoverBackgroundColor = '#0069d9';
        } else {
            hoverBackgroundColor = '#5a6268';
        }

        let hoverBorderColor;
        if (props.outline) {
            if (props.type === 'primary') {
                hoverBorderColor = '#007bff';
            } else {
                hoverBorderColor = '#6c757d';
            }
        } else if (props.type === 'primary') {
            hoverBorderColor = '#0062cc';
        } else {
            hoverBorderColor = '#545b62';
        }

        return {
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
            transition:
                'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
            color,
            backgroundColor,
            borderColor,
            '&:hover': {
                color: '#fff',
                backgroundColor: hoverBackgroundColor,
                borderColor: hoverBorderColor,
            },
        };
    },
};
