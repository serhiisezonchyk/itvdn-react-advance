import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import MovieCard from '../../components/movie-card/MovieCard';
import { AuthContext, anonymousUser } from '../../context/AuthContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { fetchNextPage } from '../../store/reducers/movies';
import { useAppDispatch, useAppSelector } from '../../store/utils';

const MoviesPage = () => {
  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);
  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) dispatch(fetchNextPage());
  }, [dispatch, entry?.isIntersecting, hasMorePages]);
  
  return (
    <Container sx={{ py: 8, maxWidth: 'lg' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Now playing
      </Typography>
      <Grid container spacing={4}>
        {movies.map((el) => (
          <Grid item key={el.id} xs={12} sm={6} md={4}>
            <MovieCard movie={el} img={el.img} enableUserActions={loggedIn} />
          </Grid>
        ))}
      </Grid>
      <div ref={targetRef}>{loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}</div>
    </Container>
  );
};

export default MoviesPage;
