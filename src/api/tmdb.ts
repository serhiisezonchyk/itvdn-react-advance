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
interface PageResponce<TResult> {
  page: number;
  results: TResult[];
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
  async getNowPlaying(): Promise<MovieDetails[]> {
    const res = await get<PageResponce<MovieDetails>>('/movie/now_playing?language=en-US&page=1');
    return res.results;
  },
};
