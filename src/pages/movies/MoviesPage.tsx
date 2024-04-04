import { connect } from 'react-redux';
import MovieCard from '../../components/movie-card/MovieCard';
import { RootState } from '../../store';
import { Movie } from '../../store/reducers/movies';
import styles from './MoviePage.module.scss';
interface MoviesProps {
  movies: Movie[];
}
const MoviesPage = ({ movies }: MoviesProps) => {
  return (
    <section className={styles.movie_page}>
      <div className={styles.movie_page__list}>
        {movies.map((el) => (
          <MovieCard movie={el} key={el.id} />
        ))}
      </div>
    </section>
  );
};
const mapStateToProp = (state: RootState) => ({
  movies: state.movies.top,
});
const connector = connect(mapStateToProp);
export default connector(MoviesPage);
