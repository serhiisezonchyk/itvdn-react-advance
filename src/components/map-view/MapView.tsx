import { Favorite } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import { Map } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { addPopupToMapWidget, createMapWidget } from './mapWidget';
const Greeting = () => {
  return (
    <Box>
      <Typography>Greetings from Ukraine.</Typography>
      <Favorite sx={{ color: '#0056B9' }} />
      <Favorite sx={{ color: '#FFD800' }} />
    </Box>
  );
};
const MapView = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [popupContainer, setPopupContainer] = useState<HTMLDivElement | null>(null); 
  useEffect(() => {
    if (mapRef.current === null) {
      const map = createMapWidget(containerRef.current!);
      mapRef.current = map;
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, []);

  return (
    <Container ref={containerRef} sx={{ width: 800, height: 500, my: 2 }}>
      {popupContainer !== null && createPortal(<Greeting />, popupContainer)}
    </Container>
  );
};
export default MapView;
