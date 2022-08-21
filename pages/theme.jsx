import { ThemeOptions } from '@mui/material/styles';

import { createTheme } from '@mui/material';

import {
  backgroundColor,
  blackColor,
  complementaryColors,
  infoColor,
  primaryColor,
  secondaryColor,
  sidebarBackgroundColor,
  successColor,
  warningColor,
} from './assets/colors';

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    error: {
      main: complementaryColors.paradisePink,
    },
    warning: {
      main: warningColor,
    },
    success: {
      main: successColor,
    },
    background: {
      default: backgroundColor,
    },
    info: {
      main: infoColor,
    },
    text: {
      primary: blackColor,
    },
  },
  typography: {
    fontFamily: 'Roboto',
    // fontSize: htmlFontSize, // TODO investigate
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'filled', // our SiitInput customisation is based on filled param
      },
    },
    MuiCssBaseline: {
      // styleOverrides: GraphikFonts,
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: sidebarBackgroundColor,
          borderRight: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
