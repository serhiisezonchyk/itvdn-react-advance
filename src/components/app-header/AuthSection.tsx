import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserSettingsMenu from '../user-settings-menu/UserSettingsMenu';
const AuthSection = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname || '/',
      },
    });
  };
  const onLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  return isAuthenticated && user ? (
    <UserSettingsMenu user={user} onLogout={onLogout} onOpenProfile={() => navigate('/profile')} />
  ) : (
    <Button color="inherit" variant="outlined" onClick={onLogin}>
      Log In
    </Button>
  );
};

export default AuthSection;
