// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#6366f1',
            light: '#818cf8',
            dark: '#4f46e5',
        },
        secondary: {
            main: '#fbbf24',
        },
        error: {
            main: '#f43f5e',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#0f172a',
            secondary: '#64748b',
        },
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        h1: {
            fontWeight: 900,
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            lineHeight: 1.1,
        },
        h2: {
            fontWeight: 900,
            fontSize: '2.5rem',
        },
        h3: {
            fontWeight: 800,
            fontSize: '1.6rem',
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    padding: '12px 24px',
                    fontSize: '1.1rem',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        '&:hover fieldset': {
                            borderColor: '#6366f1',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#6366f1',
                        },
                    },
                },
            },
        },
    },
});