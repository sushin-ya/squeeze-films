import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      lg: 1200,
    },
  },
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: cyan[500],
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.6)',
      secondary: '#33291A',
    },
    background: {
      default: '#F7F6F5',
    },
  },
  typography: {
    fontFamily: "'Roboto','Noto Sans JP','Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '60px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '48px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '34px',
      fontWeight: 700,
    },
    h4: {
      fontSize: '30px',
      fontWeight: 700,
    },
    h5: {
      fontSize: '24px',
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 500,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 300,
    },
    button: {
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        padding: 0,
      },
    },
    MuiFormLabel: {
      root: {
        color: 'rgba(0, 0, 0, 0.6)',
      },
    },
  },
});

export default theme;
