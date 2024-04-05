import { useEffect } from 'react';
import { connect } from 'react-redux';
import MovieCard from '../../components/movie-card/MovieCard';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import { Movie, fetchMovies } from '../../store/reducers/movies';
import styles from './MoviePage.module.scss';
interface MoviesProps {
  movies: Movie[];
  loading: boolean;
}

const MoviesPage = ({ movies, loading }: MoviesProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  return (
    <section className={styles.movie_page}>
      <div className={styles.movie_page__list}>
        {loading ? <p>Loading...</p> : movies.map((el) => <MovieCard movie={el} key={el.id} img={el.img} />)}
      </div>
    </section>
  );
};
const mapStateToProp = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});
const connector = connect(mapStateToProp);
export default connector(MoviesPage);
