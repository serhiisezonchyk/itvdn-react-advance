import axios from 'axios';
import configuration from '../configuration';

const get = async <TBody>(relativeUrl: string): Promise<TBody> => {
  try {
    const response = await axios.get(`${configuration.apiUrl}/3${relativeUrl}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${configuration.apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};

export interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  backdrop_path: string;
}

export interface KeywordItem {
  id: number;
  name: string;
}
export interface Genre {
  id: number;
  name: string;
}
export interface Filter {
  keywords: KeywordItem[];
  genres: number[];
}
export interface MovieFilters {
  keywords?: number[];
  genres?: number[];
}
interface PageResponce<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
}

interface GenresResponce<Genre> {
  genres:Genre[];
}

interface PageDetails<TResult> {
  page: number;
  results: TResult[];
  totalPages: number;
}

interface Configuration {
  images: {
    base_url: string;
  };
}
export const client = {
  async getConiguration() {
    return get<Configuration>('/configuration');
  },
  async getNowPlaying(page: number = 1): Promise<PageDetails<MovieDetails>> {
    const res = await get<PageResponce<MovieDetails>>(`/movie/now_playing?language=en-US&page=${page}`);
    return { results: res.results, page: res.page, totalPages: res.total_pages };
  },
  async getKeywords(query: string) {
    const res = await get<PageResponce<KeywordItem>>(`/search/keyword?query=${query}`);
    return res.results;
  },
  async getMovies(page: number = 1, filters: MovieFilters): Promise<PageDetails<MovieDetails>> {
    const params = new URLSearchParams({
      page: page.toString(),
    });
    if (filters.keywords?.length) params.append('with_keywords', filters.keywords.join('|'));
    if (filters.genres?.length) params.append('with_genres', filters.genres.join(','));
    console.log(params.toString())
    const res = await get<PageResponce<MovieDetails>>(`/discover/movie?${params.toString()}`);
    return { results: res.results, page: res.page, totalPages: res.total_pages };
  },
  async getGenres() {
    const res = await get<GenresResponce<Genre>>(`/genre/movie/list?language=en`);
    return res.genres;
  },
};
