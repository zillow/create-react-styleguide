import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../themes';

export default props => <ThemeProvider {...props} theme={theme} />;
