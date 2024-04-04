import { Link } from 'react-router-dom';
import { Movie } from '../../store/reducers/movies';
import './MovieCard.css';
interface MovieCardProps {
  movie: Movie;
}
const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
      <p className='movie-card__overview'>{movie.overview}</p>
      <span className='movie-card__popularity'>{movie.popularity}</span>
    </div>
  );
};

export default MovieCard;
