import React from 'react';
import { ThemeProvider } from 'styled-components';
import ThemeBootstrap from '../themes/ThemeBootstrap';

export default props => <ThemeProvider {...props} theme={ThemeBootstrap} />;
