import { AppThunk } from '..';
import { client } from '../../api/tmdb';
import { ActionWithPayload, createReducer } from '../utils';

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  img?: string;
}
interface MovieState {
  top: Movie[];
  loading: boolean;
}
const initialState: MovieState = {
  top: [],
  loading: false,
};

const moviesLoaded = (movies: Movie[]) => ({
  type: 'movies/loaded',
  payload: movies,
});
const moviesLoading = () => ({
  type: 'movies/loading',
});

export function fetchMovies(): AppThunk<Promise<void>> {
  return async (dispatch, getState) => {
    dispatch(moviesLoading());
    const config = await client.getConiguration();
    const imageUrl = config.images.base_url;
    const res = await client.getNowPlaying();

    const mappedResult: Movie[] = res.map((el) => ({
      ...el,
      img: el.backdrop_path ? `${imageUrl}w780${el.backdrop_path}` : undefined,
    }));
    dispatch(moviesLoaded(mappedResult));
  };
}
const moviesReducer = createReducer<MovieState>(initialState, {
  'movies/loaded': (state, action: ActionWithPayload<Movie[]>) => {
    return {
      ...state,
      top: action.payload,
      loading: false,
    };
  },
  'movies/loading': (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
});
export default moviesReducer;
