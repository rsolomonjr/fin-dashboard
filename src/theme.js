import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c1c1c', // Dark gray for primary color
    },
    secondary: {
      main: '#f5f5f5', // Light gray for secondary color
    },
    background: {
      default: '#f0ead6', // eggshell background
      paper: '#ffffff', // White background for cards
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
});

export default theme;