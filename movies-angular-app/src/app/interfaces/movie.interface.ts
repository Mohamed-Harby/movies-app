export interface Movie {
  id?: string;
  imdbId: string;
  title: string;
  year: string;
  type: 'movie' | 'series' | 'episode';
  poster: string;
  plot: string;
  rating?: string;
  genre?: string;
  director?: string;
  actors?: string;
  language?: string;
  country?: string;
  awards?: string;
  imdbRating?: string;
  imdbVotes?: string;
  boxOffice?: string;
  production?: string;
  website?: string;
}

export interface MovieSearchItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  added?: boolean;
}

export interface MovieSearchResponse {
  Search: MovieSearchItem[];
  totalResults: string;
  Response: string;
}
