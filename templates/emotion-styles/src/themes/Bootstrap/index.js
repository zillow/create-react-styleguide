export default {
    Button: props => ({
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
        color: props.outline ? (props.type === 'primary' ? '#007bff' : '#6c757d') : '#fff',
        backgroundColor: props.outline ? 'transparent' : (props.type === 'primary' ? '#007bff' : '#6c757d'),
        borderColor: props.type === 'primary' ? '#007bff' : '#6c757d',
        '&:hover': {
            color: '#fff',
            backgroundColor: props.outline ? (props.type === 'primary' ? '#007bff' : '#6c757d') : (props.type === 'primary' ? '#0069d9' : '#5a6268'),
            borderColor: props.outline ? (props.type === 'primary' ? '#007bff' : '#6c757d') : (props.type === 'primary' ? '#0062cc' : '#545b62'),
        }
    })
};
