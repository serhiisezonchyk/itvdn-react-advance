import { Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext, anonymousUser } from '../../context/AuthContext';
interface AuthSectionProps {
  onLogin(): void;
  onLogout(): void;
}
const AuthSection = ({ onLogin, onLogout }: AuthSectionProps) => {
  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;
  if (loggedIn)
    return (
      <>
        <Typography>Hello, {user.name}</Typography>
        <Button color="inherit" variant="outlined" sx={{ ml: 2 }} onClick={onLogout}>
          Log Out
        </Button>
      </>
    );
  return (
    <Button color="inherit" variant="outlined" onClick={onLogin}>
      Log In
    </Button>
  );
};

export default AuthSection;
