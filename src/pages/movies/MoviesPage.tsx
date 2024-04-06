import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import MovieCard from '../../components/movie-card/MovieCard';
import { AuthContext, anonymousUser } from '../../context/AuthContext';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import { Movie, fetchMovies } from '../../store/reducers/movies';
interface MoviesProps {
  movies: Movie[];
  loading: boolean;
}

const MoviesPage = ({ movies, loading }: MoviesProps) => {
  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  return (
    <Container sx={{ py: 8, maxWidth: 'lg' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Now playing
      </Typography>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Grid container spacing={4}>
          {movies.map((el) => (
            <Grid item key={el.id} xs={12} sm={6} md={4}>
              <MovieCard movie={el} img={el.img} enableUserActions={loggedIn} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
const mapStateToProp = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});
const connector = connect(mapStateToProp);
export default connector(MoviesPage);
