import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#3A7CFD',
        },
        secondary: {
          main: '#8796A5',
        },
        background: {
          default: '#171823',
          paper: '#25273D',
        },
        text: {
          primary: '#C8CBE7',
          secondary: '#5B5E7E',
          disabled: '#4D5067',
        },
      },
    },
    light: {
      palette: {
        background: {
          default: '#FAFAFA',
          paper: '#ffffff',
        },
        text: {
          primary: '#494C6B',
          secondary: '#9495A5',
          disabled: '#D1D2DA',
        },
        primary: {
          main: '#3A7CFD',
        },
        secondary: {
          main: '#aab4be',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Josefin Sans", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
    },
  },
});

export default theme;