import { Favorite } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MovieDetails } from '../../services/tmdb';
interface MovieCardProps {
  movie: MovieDetails;
  img?: string;
  enableUserActions: boolean;
  onAddFavorite?(id: number): void;
}
const MovieCard = ({
  movie,
  enableUserActions,
  img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FS4PhZ01cQNfvC80P-NLrvbzG5DzwYGW_-bLRNnjGg&s"',
  onAddFavorite,
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
        {enableUserActions && (
          <Tooltip title="Add to favorites.">
            <IconButton onClick={() => onAddFavorite?.(movie.id)}>
              <Favorite />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default React.memo(MovieCard);
