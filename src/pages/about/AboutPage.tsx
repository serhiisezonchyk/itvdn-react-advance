import { Container, Typography } from '@mui/material';
import CountDownText from '../../components/count-down-text/CountDownText';

const AboutPage = () => {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Typography variant="h5" align="center">
        <CountDownText/>
      </Typography>
    </Container>
  );
};

export default AboutPage;
