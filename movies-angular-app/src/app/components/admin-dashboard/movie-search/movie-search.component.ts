import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../../../services/movie.service';
import { MovieSearchItem } from '../../../interfaces/movie.interface';

type MovieType = 'movie' | 'series' | 'episode';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent {
  // Search parameters
  searchQuery: string = '';
  selectedType: MovieType | '' = '';
  selectedYear: string = '';
  currentPage: number = 1;

  // Results
  searchResults: (MovieSearchItem & { isAdding?: boolean })[] = [];
  loading: boolean = false;
  error: string = '';
  totalResults: number = 0;
  hasMorePages: boolean = false;

  // Type options
  typeOptions: MovieType[] = ['movie', 'series', 'episode'];

  // Year options (current year down to 1900)
  yearOptions: string[] = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => (new Date().getFullYear() - i).toString()
  );

  constructor(private movieService: MovieService) { }

  onSearch(resetPage: boolean = true): void {
    if (!this.searchQuery.trim()) return;

    if (resetPage) {
      this.currentPage = 1;
      this.searchResults = [];
    }

    this.loading = true;
    this.error = '';
    console.log('Searching with params:', {
      title: this.searchQuery,
      type: this.selectedType,
      year: this.selectedYear,
      page: this.currentPage
    });

    const searchParams = {
      title: this.searchQuery,
      ...(this.selectedType && { type: this.selectedType }),
      ...(this.selectedYear && { year: this.selectedYear }),
      page: this.currentPage
    };

    this.movieService.searchMovies(searchParams).subscribe({
      next: (response) => {
        console.log('Search response:', response);
        if (response && response.Search) {
          const newResults = response.Search.map(movie => ({
            ...movie,
            added: false,
            isAdding: false
          }));
          
          this.searchResults = resetPage 
            ? newResults 
            : [...this.searchResults, ...newResults];
            
          this.totalResults = parseInt(response.totalResults);
          this.hasMorePages = this.searchResults.length < this.totalResults;
          console.log('Search results:', this.searchResults);
        } else {
          if (resetPage) {
            this.error = 'No results found';
            this.searchResults = [];
            this.totalResults = 0;
            this.hasMorePages = false;
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.error = 'Failed to search movies';
        if (resetPage) {
          this.searchResults = [];
          this.totalResults = 0;
          this.hasMorePages = false;
        }
        this.loading = false;
      }
    });
  }

  loadMore(): void {
    if (this.hasMorePages && !this.loading) {
      this.currentPage++;
      this.onSearch(false);
    }
  }

  addMovie(imdbId: string): void {
    const movie = this.searchResults.find(m => m.imdbID === imdbId);
    if (!movie) return;

    movie.isAdding = true;
    this.movieService.addMovie(imdbId).subscribe({
      next: () => {
        movie.added = true;
        movie.isAdding = false;
      },
      error: (error) => {
        console.error('Error adding movie:', error);
        this.error = 'Failed to add movie';
        movie.isAdding = false;
      }
    });
  }

  removeMovie(movieId: string): void {
    if (!confirm('Are you sure you want to remove this movie?')) return;
    
    const movie = this.searchResults.find(m => m.imdbID === movieId);
    if (!movie) return;

    movie.isAdding = true;
    this.movieService.removeMovie(movieId).subscribe({
      next: () => {
        movie.added = false;
        movie.isAdding = false;
      },
      error: (error) => {
        console.error('Error removing movie:', error);
        this.error = 'Failed to remove movie';
        movie.isAdding = false;
      }
    });
  }

  clearFilters(): void {
    this.selectedType = '';
    this.selectedYear = '';
    if (this.searchQuery) {
      this.onSearch();
    }
  }
}
