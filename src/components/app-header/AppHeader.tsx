import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import AuthSection from './AuthSection';
import HeaderLink from './HeaderLink';
interface AppHeaderProps {
  onLogin(): void;
  onLogout(): void;
}
const AppHeader = ({ onLogin, onLogout }: AppHeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <img src="./png/logo.png" alt="Logo" width={48} />
        <Typography variant="h6" color="inherit" noWrap>
          Movies DB
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
          </nav>
        </Box>
        <AuthSection onLogin={onLogin} onLogout={onLogout} />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
