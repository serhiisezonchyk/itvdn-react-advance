import { Container } from '@mui/material';
import CountDownText from '../../components/count-down-text/CountDownText';
import CounDownVideo from '../../components/count-down-video/CounDownVideo';

const AboutPage = () => {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <CountDownText />
      <CounDownVideo />
    </Container>
  );
};

export default AboutPage;
