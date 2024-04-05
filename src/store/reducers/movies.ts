import { Action, Reducer } from 'redux';

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  img?: string;
}
interface MovieState {
  top: Movie[];
}
const initialState: MovieState = {
  top: [
    {
      id: 1,
      title: 'Inception',
      popularity: 98,
      overview:
        'include trunk why lamp same hospital exercise finish eat shelter planned deep necessary dog bone gulf string pan camera pitch are greater heart show',
    },
    {
      id: 2,
      title: 'Through',
      popularity: 90,
      overview:
        'include trunk why lamp same hospital exercise finish eat shelter planned deep necessary dog bone gulf string pan camera pitch are greater heart show',
    },
    {
      id: 3,
      title: 'Caught',
      popularity: 92,
      overview:
        'include trunk why lamp same hospital exercise finish eat shelter planned deep necessary dog bone gulf string pan camera pitch are greater heart show',
    },
    {
      id: 4,
      title: 'Each',
      popularity: 93,
      overview:
        'include trunk why lamp same hospital exercise finish eat shelter planned deep necessary dog bone gulf string pan camera pitch are greater heart show',
    },
  ],
};
const moviesReducer: Reducer<MovieState, Action> = (state, action) => {
  return initialState;
};
export default moviesReducer;
