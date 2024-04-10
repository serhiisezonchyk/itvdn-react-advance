import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      Copyright © Movies DB {new Date().getFullYear()}
    </Typography>
  );
};
const HomePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const greeting = isAuthenticated ? `${user?.name}, explore movies today with us!` : 'Explore movies today with us!';
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
      }}
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          Welcome
        </Typography>
        <Typography component="h5" align="center" color="text.primary" paragraph>
          {greeting}
        </Typography>
        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <Button component={RouterLink} to="/movies" variant="contained" color="secondary">
            Explore...
          </Button>
        </Stack>
      </Container>

      <Box sx={{ py: 2 }}>
        <Divider />
        <Copyright />
      </Box>
    </Box>
  );
};

export default HomePage;
