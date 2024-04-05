import { Link } from 'react-router-dom';
import { Movie } from '../../store/reducers/movies';
import styles from './MovieCard.module.scss';
interface MovieCardProps {
  movie: Movie;
  img?: string;
}
const MovieCard = ({
  movie,
  img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FS4PhZ01cQNfvC80P-NLrvbzG5DzwYGW_-bLRNnjGg&s"',
}: MovieCardProps) => {
  return (
    <div className={styles.card}>
      <img className={styles.card__thumbmail} src={img} alt="Movie image" />
      <div className={styles.card__content}>
        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        <p className={styles.card__overview}>{movie.overview}</p>
        <span className={styles.card__popularity}>{movie.popularity}</span>
      </div>
    </div>
  );
};

export default MovieCard;
