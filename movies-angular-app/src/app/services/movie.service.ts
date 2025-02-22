import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Movie, MovieSearchResponse } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'http://localhost:8080';
  private moviesUrl = `${this.baseUrl}/movies/`;
  private proxyUrl = `${this.baseUrl}/proxy/movies/`;

  constructor(private http: HttpClient) { }

  // Admin functions
  searchMovies(params: {
    title: string;
    type?: 'movie' | 'series' | 'episode';
    year?: string;
    page?: number;
  }): Observable<MovieSearchResponse> {
    return this.http.get<MovieSearchResponse>(`${this.proxyUrl}search`, { params: params as any });
  }

  getMovieByImdbId(imdbId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.proxyUrl}${imdbId}`);
  }

  addMovie(imdbId: string): Observable<Movie> {
    return this.getMovieByImdbId(imdbId).pipe(
      map(movieDetails => ({
        ...movieDetails,
        imdbId: imdbId,
        type: movieDetails.type?.toLowerCase() as 'movie' | 'series' | 'episode'
      })),
      switchMap(movie => this.http.post<Movie>(this.moviesUrl, movie))
    );
  }

  removeMovie(movieId: string): Observable<void> {
    return this.http.delete<void>(`${this.moviesUrl}${movieId}`);
  }

  // User functions
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl);
  }

  getMovieDetails(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.moviesUrl}${movieId}`);
  }
}
