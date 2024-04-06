import { Pause, PlayArrow } from '@mui/icons-material';
import { Card, CardActions, CardMedia, IconButton } from '@mui/material';
import { useRef, useState } from 'react';

const CounDownVideo = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const togglePlaying = () => {
    const nextPlaying = !isPlaying;
    if (nextPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };
  return (
    <Card>
      <CardMedia>
        <video ref={videoRef} height="500" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
          <source src="https://pexels.com/download/video/3843433" type="video/mp4"></source>
        </video>
      </CardMedia>
      <CardActions>
        <IconButton onClick={togglePlaying}>
          {isPlaying ? <Pause sx={{ height: 38, width: 38 }} /> : <PlayArrow sx={{ height: 38, width: 38 }} />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CounDownVideo;
