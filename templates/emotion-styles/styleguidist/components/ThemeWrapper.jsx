import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../src/themes';

export default props => <ThemeProvider {...props} theme={theme} />;
