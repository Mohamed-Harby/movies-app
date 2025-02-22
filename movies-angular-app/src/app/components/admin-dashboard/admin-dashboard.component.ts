import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie.interface';
import { MovieSearchComponent } from './movie-search/movie-search.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieSearchComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  // Collection data
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  loading: boolean = false;
  error: string = '';
  
  // Search parameters
  searchQuery: string = '';
  selectedType: string = '';
  selectedYear: string = '';
  
  // Active tab
  activeTab: 'collection' | 'search' = 'collection';

  // Type options
  typeOptions = ['All', 'movie', 'series', 'episode'];

  // Year options (current year down to 1900)
  yearOptions: string[] = ['All', ...Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => (new Date().getFullYear() - i).toString()
  )];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.loading = true;
    this.movieService.getAllMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.filterMovies();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load movies';
        this.loading = false;
        console.error(error);
      }
    });
  }

  filterMovies(): void {
    let result = [...this.movies];

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(movie => 
        movie.title?.toLowerCase().includes(query) ||
        movie.plot?.toLowerCase().includes(query)
      );
    }

    // Filter by type
    if (this.selectedType && this.selectedType !== 'All') {
      result = result.filter(movie => 
        movie.type.toLowerCase() === this.selectedType.toLowerCase()
      );
    }

    // Filter by year
    if (this.selectedYear && this.selectedYear !== 'All') {
      result = result.filter(movie => 
        movie.year === this.selectedYear
      );
    }

    this.filteredMovies = result;
  }

  removeMovie(movieId: string) {
    if (confirm('Are you sure you want to remove this movie?')) {
      this.movieService.removeMovie(movieId).subscribe({
        next: () => {
          this.movies = this.movies.filter(movie => movie.id !== movieId);
          this.filterMovies();
        },
        error: (error) => {
          this.error = 'Failed to remove movie';
          console.error(error);
        }
      });
    }
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedType = '';
    this.selectedYear = '';
    this.filterMovies();
  }

  setActiveTab(tab: 'collection' | 'search'): void {
    this.activeTab = tab;
  }
}
