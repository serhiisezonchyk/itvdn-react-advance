import { AppBar, CssBaseline, Link, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import styles from './App.module.scss';
import { teal } from '@mui/material/colors';

const defaultTheme = createTheme({palette:{
  primary: teal,
  secondary:{
    main:'#96000f'
  }
}})
function HeaderLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link component={RouterLink} variant="button" sx={{ my: 1, mx: 1.5 }} color="inherit" to={to}>
      {children}
    </Link>
  );
}
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <img className={styles.app_header__logo} src="./png/logo.png" alt="" />
          <Typography variant='h6' color='inherit' noWrap>Movies DB</Typography>
          <nav className={styles.app_header__menu}>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
          </nav>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
