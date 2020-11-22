export interface ResultMovieDb {
  page?: number;
  total_results?: number;
  total_pages?: number;
  results?: Movie[];
}

export interface Movie {
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  poster_path?: string;
  id?: number;
  adult?: boolean;
  backdrop_path?: string;
  original_language?: string;
  original_title?: string;
  genre_ids?: number[];
  title?: string;
  vote_average?: number;
  overview?: string;
  release_date?: string;
}

export interface MovieSelectedDetails {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: any;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: Productioncompany[];
  production_countries?: Productioncountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: Spokenlanguage[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface Spokenlanguage {
  iso_639_1?: string;
  name?: string;
}

export interface Productioncountry {
  iso_3166_1?: string;
  name?: string;
}

export interface Productioncompany {
  id?: number;
  logo_path?: string;
  name?: string;
  origin_country?: string;
}

export interface AllGenres {
  genres: Genre[];
}

export interface Genre {
  id?: number;
  name?: string;
}
export interface ImagesMovieSelected {
  id?: number;
  backdrops?: any[];
  posters?: Poster[];
}

export interface Poster {
  aspect_ratio?: number;
  file_path?: string;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MovieSelectedCredit {
  id?: number;
  cast?: Cast[];
  crew?: Crew[];
}

export interface Crew {
  credit_id?: string;
  department?: string;
  gender?: number;
  id?: number;
  job?: string;
  name?: string;
  profile_path?: string;
}

// export interface SearchResults {
//   page: number;
//   results: uniqueSearchresult[];
//   total_pages: number;
//   total_results: number;
// }


export interface Cast {
  cast_id?: number;
  character?: string;
  credit_id?: string;
  gender?: number;
  id?: number;
  name?: string;
  order?: number;
  profile_path?: string;
}


export interface multiSearch {
  page: number;
  total_results: number;
  total_pages: number;
  results: Result[];
}

export interface Result {
  original_name?: string;
  genre_ids?: number[];
  media_type: string;
  name?: string;
  popularity: number;
  origin_country?: string[];
  vote_count?: number;
  first_air_date?: string;
  backdrop_path?: string;
  original_language?: string;
  id: number;
  vote_average?: number;
  overview?: string;
  poster_path?: string;
  video?: boolean;
  adult?: boolean;
  original_title?: string;
  title?: string;
  release_date?: string;
  known_for_department?: string;
  known_for?: Knownfor[];
  profile_path?: string;
  gender?: number;
}

export interface Knownfor {
  poster_path: string;
  id: number;
  vote_count: number;
  video: boolean;
  media_type: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
}


export interface youtubeSearch {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface Item {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
}

interface Default {
  url: string;
  width: number;
  height: number;
}

interface Id {
  kind: string;
  videoId: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}




