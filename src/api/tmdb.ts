import configuration from '../configuration';

const get = async <TBody>(relativeUrl: string): Promise<TBody> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${configuration.apiToken}`,
    },
  };
  const res = await fetch(`${configuration.apiUrl}/3${relativeUrl}`, options);
  const json: TBody = await res.json();
  return json;
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
