import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { MovieDetails, client } from '../../api/tmdb';
import MovieCard from '../../components/movie-card/MovieCard';
import { RootState } from '../../store';
import { Movie, moviesLoaded, moviesLoading } from '../../store/reducers/movies';
import styles from './MoviePage.module.scss';
interface MoviesProps {
  movies: Movie[];
  loading: boolean;
}

const MoviesPage = ({ movies, loading }: MoviesProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = async () => {
      dispatch(moviesLoading());
      const config = await client.getConiguration();
      const imageUrl = config.images.base_url;
      const res = await client.getNowPlaying();

      const mappedResult: MovieDetails[] = res.map((el) => ({
        ...el,
        img: el.backdrop_path ? `${imageUrl}w780${el.backdrop_path}` : undefined,
      }));
      dispatch(moviesLoaded(mappedResult));
    };
    loadData();
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
