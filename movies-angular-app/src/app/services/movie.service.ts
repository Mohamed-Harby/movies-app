import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) {}

  // Admin functions
  searchMovies(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params: { query } });
  }

  addMovie(movie: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, movie);
  }

  removeMovie(movieId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${movieId}`);
  }

  // User functions
  getAllMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${movieId}`);
  }
}
