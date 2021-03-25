const ThemeBootstrap = {
    colors: {
        blue: '#007bff',
        gray: '#6c757d',
        white: '#fff',
    },
};

ThemeBootstrap.Button = {
    primary: {
        backgroundColor: ThemeBootstrap.colors.blue,
        borderColor: ThemeBootstrap.colors.blue,
        color: ThemeBootstrap.colors.white,

        hoverBackgroundColor: '#0069d9',
        hoverBorderColor: '#0062cc',
        hoverColor: ThemeBootstrap.colors.white,
    },
    secondary: {
        backgroundColor: '#6c747d',
        borderColor: ThemeBootstrap.colors.gray,
        color: ThemeBootstrap.colors.white,

        hoverBackgroundColor: '#5a6268',
        hoverBorderColor: '#545b62',
        hoverColor: ThemeBootstrap.colors.white,
    },
    primaryOutline: {
        backgroundColor: 'transparent',
        borderColor: ThemeBootstrap.colors.blue,
        color: ThemeBootstrap.colors.blue,

        hoverBackgroundColor: ThemeBootstrap.colors.blue,
        hoverBorderColor: ThemeBootstrap.colors.blue,
        hoverColor: ThemeBootstrap.colors.white,
    },
    secondaryOutline: {
        backgroundColor: 'transparent',
        borderColor: ThemeBootstrap.colors.gray,
        color: ThemeBootstrap.colors.gray,

        hoverBackgroundColor: ThemeBootstrap.colors.gray,
        hoverBorderColor: ThemeBootstrap.colors.gray,
        hoverColor: ThemeBootstrap.colors.white,
    },
};

export default ThemeBootstrap;
