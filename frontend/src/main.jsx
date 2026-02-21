import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import './index.css'
import App from './App.jsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0c14',
      paper: 'rgba(13,17,23,0.7)',
    },
    primary: {
      main: '#6366f1',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Fix Chrome auto-fill white background block over dark theme
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #1c1e26 inset !important',
            WebkitTextFillColor: '#e6edf3 !important',
            transition: 'background-color 5000s ease-in-out 0s'
          }
        }
      }
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
