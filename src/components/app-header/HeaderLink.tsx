import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HeaderLink = ({ children, to }: { children: React.ReactNode; to: string }) => {
  return (
    <Link component={RouterLink} variant="button" sx={{ my: 1, mx: 1.5 }} color="inherit" to={to}>
      {children}
    </Link>
  );
};
export default HeaderLink;
