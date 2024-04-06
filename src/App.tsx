import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { teal } from '@mui/material/colors';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './components/app-header/AppHeader';
import { AuthContext, AuthInfo, anonymousUser } from './context/AuthContext';

const defaultTheme = createTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#96000f',
    },
  },
});
const fakeAuth: AuthInfo = {
  user: {
    name: 'Serhii',
  },
};
function App() {
  const [auth, setAuth] = useState<AuthInfo>({ user: anonymousUser });
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthContext.Provider value={auth}>
        <AppHeader onLogin={() => setAuth(fakeAuth)} onLogout={() => setAuth({ user: anonymousUser })} />
        <main>
          <Outlet />
        </main>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
