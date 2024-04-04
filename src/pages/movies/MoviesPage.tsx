import { connect } from 'react-redux';
import MovieCard from '../../components/movie-card/MovieCard';
import { RootState } from '../../store';
import { Movie } from '../../store/reducers/movies';
import './MoviePage.css';
interface MoviesProps {
  movies: Movie[];
}
const MoviesPage = ({ movies }: MoviesProps) => {
  return (
    <section className="movie-page">
      <div className="movie-page__list">
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
