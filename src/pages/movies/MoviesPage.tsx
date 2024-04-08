import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { Suspense, lazy, useCallback, useContext, useEffect, useState } from 'react';
import { Filter } from '../../api/tmdb';
import MovieCard from '../../components/movie-card/MovieCard';
import { AuthContext, anonymousUser } from '../../context/AuthContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { fetchNextPage, resetMovies } from '../../store/reducers/movies';
import { useAppDispatch, useAppSelector } from '../../store/utils';
const MoviesFilter = lazy(() => import('../../components/movies-filter/MoviesFilter'));
const MoviesPage = () => {
  const [filters, setFilters] = useState<Filter>();
  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);
  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    dispatch(resetMovies());
  }, [dispatch]);
  useEffect(() => {
    const moviesFilters = filters
      ? {
          keywords: filters.keywords.map((k) => k.id),
          genres: filters.genres,
        }
      : undefined;

    if (entry?.isIntersecting && hasMorePages) dispatch(fetchNextPage(moviesFilters));
  }, [dispatch, entry?.isIntersecting, hasMorePages, filters]);

  const handleAddFavorite = useCallback((id: number) => {
    alert('Not implement');
  }, []);

  return (
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
      <Grid item xs="auto">
        <Suspense fallback={<span>Loading filters</span>}>
          <MoviesFilter
            onSubmit={(f) => {
              dispatch(resetMovies());
              setFilters(f);
            }}
          />
        </Suspense>
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!loading && !movies.length && (
            <Typography variant="h6">No movies were found that match your query.</Typography>
          )}
          <Grid container spacing={4}>
            {movies.map((el, i) => (
              <Grid item key={el.id} xs={12} sm={6} md={4}>
                <MovieCard movie={el} img={el.img} enableUserActions={loggedIn} onAddFavorite={handleAddFavorite} />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>{loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}</div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default MoviesPage;
