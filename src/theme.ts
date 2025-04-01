import { createTheme, ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#3182ce' : '#2c5282', // Light blue for light mode, dark blue for dark mode
      light: mode === 'light' ? '#4299e1' : '#2b6cb0',
      dark: mode === 'light' ? '#2c5282' : '#1a365d',
    },
    secondary: {
      main: '#2c5282', // Blue
      light: '#4299e1',
      dark: '#1a365d',
    },
    background: {
      default: mode === 'light' ? '#f7fafc' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    text: {
      primary: mode === 'light' ? '#2d3748' : '#ffffff',
      secondary: mode === 'light' ? '#4a5568' : '#a0aec0',
    },
    success: {
      main: '#2f855a', // Green
      light: '#48bb78',
      dark: '#22543d',
    },
    info: {
      main: '#3182ce', // Light Blue
      light: '#63b3ed',
      dark: '#2c5282',
    },
    warning: {
      main: '#dd6b20', // Orange
      light: '#ed8936',
      dark: '#9c4221',
    },
    error: {
      main: '#c53030', // Red
      light: '#f56565',
      dark: '#9b2c2c',
    },
    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0 2px 8px rgba(0,0,0,0.05)'
            : '0 2px 8px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.1)'
            : '0 2px 8px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.1)'
            : '0 2px 8px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: mode === 'light'
              ? 'rgba(49, 130, 206, 0.04)'
              : 'rgba(44, 82, 130, 0.04)',
          },
        },
      },
    },
  },
});

export const createAppTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode)); 