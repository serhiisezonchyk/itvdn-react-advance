import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { Suspense, lazy, useCallback, useContext, useState } from 'react';
import MovieCard from '../../components/movie-card/MovieCard';
import { AuthContext, anonymousUser } from '../../context/AuthContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { MovieFilters, MoviesQuery, useGetConfigurationQuery, useGetMoviesQuery } from '../../services/tmdb';
import { useAuth0 } from '@auth0/auth0-react';
const MoviesFilter = lazy(() => import('../../components/movies-filter/MoviesFilter'));

const initialQuery: MoviesQuery = {
  page: 1,
  filters: {},
};
const MoviesPage = () => {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);

  const { user, isAuthenticated } = useAuth0()

  const movies = data?.results ?? [];
  const hasMorePages = data?.hasMorePages;

  const formatImage = (path?: string) =>
    path && configuration ? `${configuration?.images.base_url}w780${path}` : undefined;

  const onIntersect = useCallback(() => {
    if (hasMorePages) setQuery((q) => ({ ...q, page: q.page + 1 }));
  }, [hasMorePages]);
  const [targetRef] = useIntersectionObserver({ onIntersect });

  const handleAddFavorite = useCallback((id: number) => {
    alert('Not implement');
  }, []);

  return (
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
      <Grid item xs="auto">
        <Suspense fallback={<span>Loading filters</span>}>
          <MoviesFilter
            onSubmit={(filters) => {
              const moviesFilters = {
                keywords: filters?.keywords.map((k) => k.id),
                genres: filters?.genres,
              };
  
              setQuery({
                page: 1,
                filters: moviesFilters,
              });
            }}
          />
        </Suspense>
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!isFetching && !movies.length && (
            <Typography variant="h6">No movies were found that match your query.</Typography>
          )}
          <Grid container spacing={4}>
            {movies.map((el, i) => (
              <Grid item key={el.id} xs={12} sm={6} md={4}>
                <MovieCard
                  movie={el}
                  img={formatImage(el.backdrop_path)}
                  enableUserActions={isAuthenticated}
                  onAddFavorite={handleAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>{isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}</div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default MoviesPage;
