import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MovieDetails, client } from '../../api/tmdb';
import MovieCard from '../../components/movie-card/MovieCard';
import { RootState } from '../../store';
import { Movie } from '../../store/reducers/movies';
import styles from './MoviePage.module.scss';
interface MoviesProps {
  movies: Movie[];
}

export const MoviesFetch = () => {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  useEffect(() => {
    const loadData = async () => {
      const config = await client.getConiguration();
      const imageUrl = config.images.base_url;
      const res = await client.getNowPlaying();

      const mappedResult: MovieDetails[] = res.map((el) => ({
        ...el,
        img: el.backdrop_path ? `${imageUrl}w780${el.backdrop_path}` : undefined,
      }));

      setMovies(mappedResult);
    };
    loadData();
  }, []);

  return <MoviesPage movies={movies} />;
};
const MoviesPage = ({ movies }: MoviesProps) => {
  return (
    <section className={styles.movie_page}>
      <div className={styles.movie_page__list}>
        {movies.map((el) => (
          <MovieCard movie={el} key={el.id} img={el.img} />
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
