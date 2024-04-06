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
  page: number;
  hasMorePages: boolean;
}
const initialState: MovieState = {
  top: [],
  loading: false,
  page: 0,
  hasMorePages: true,
};

const moviesLoaded = (movies: Movie[], page: number, hasMorePages: boolean) => ({
  type: 'movies/loaded',
  payload: { movies, page, hasMorePages },
});
const moviesLoading = () => ({
  type: 'movies/loading',
});

export const fetchNextPage = (): AppThunk<Promise<void>> => {
  return async (dispatch, getState) => {
    const nextPage = getState().movies.page + 1;
    dispatch(fetchPage(nextPage));
  };
};
export const fetchPage = (page: number): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    dispatch(moviesLoading());
    const config = await client.getConiguration();
    const imageUrl = config.images.base_url;
    const res = await client.getNowPlaying(page);

    const mappedResult: Movie[] = res.results.map((el) => ({
      ...el,
      img: el.backdrop_path ? `${imageUrl}w780${el.backdrop_path}` : undefined,
    }));
    const hasMorePages = res.page < res.totalPages;
    dispatch(moviesLoaded(mappedResult, page, hasMorePages));
  };
};
const moviesReducer = createReducer<MovieState>(initialState, {
  'movies/loaded': (state, action: ActionWithPayload<{ movies: Movie[]; page: number; hasMorePages: boolean }>) => {
    return {
      ...state,
      top: [...state.top, ...action.payload.movies],
      page: action.payload.page,
      hasMorePages: action.payload.hasMorePages,
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
