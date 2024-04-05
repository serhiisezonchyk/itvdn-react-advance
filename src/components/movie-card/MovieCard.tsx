import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Movie } from '../../store/reducers/movies';
interface MovieCardProps {
  movie: Movie;
  img?: string;
}
const MovieCard = ({
  movie,
  img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FS4PhZ01cQNfvC80P-NLrvbzG5DzwYGW_-bLRNnjGg&s"',
}: MovieCardProps) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="div" image={img} sx={{ pt: '56.25%' }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>
        <Typography variant="button" display="block" mt={2}>
          {movie.popularity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={RouterLink} to={`/movies/${movie.id}`} color="secondary">
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
