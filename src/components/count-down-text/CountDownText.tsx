import { Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const CountDownText = () => {
  const [count, setCount] = useState<number>(9);
  const intervalRef = useRef<any>();
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((value) => value - 1);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  useEffect(() => {
    if (count === 0) {
      clearInterval(intervalRef.current);
    }
  }, [count]);
  return (
    <Typography variant="h4" align="center">
      Coming soon: {count}
    </Typography>
  );
};

export default CountDownText;
