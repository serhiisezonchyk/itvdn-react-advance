import { Container } from '@mui/material';
import CountDownText from '../../components/count-down-text/CountDownText';
import CounDownVideo from '../../components/count-down-video/CounDownVideo';
import MapView from '../../components/map-view/MapView';

const AboutPage = () => {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <CountDownText />
      <CounDownVideo />
      <MapView/>
    </Container>
  );
};

export default AboutPage;
