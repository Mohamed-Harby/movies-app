import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  selectedMovie: Movie | null = null;
  loading: boolean = false;
  error: string = '';
  searchQuery: string = '';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.viewMovieDetails(params['id']);
      } else {
        this.loadMovies();
      }
    });
  }

  loadMovies() {
    this.loading = true;
    this.movieService.getAllMovies().subscribe(
      (movies) => {
        this.movies = movies;
        this.filteredMovies = movies;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load movies';
        this.loading = false;
        console.error(error);
      }
    );
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredMovies = this.movies;
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.filteredMovies = this.movies.filter(movie => 
      movie.title?.toLowerCase().includes(query) ||
      movie.plot?.toLowerCase().includes(query) ||
      movie.year?.toString().includes(query)
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredMovies = this.movies;
  }

  viewMovieDetails(movieId: string) {
    this.loading = true;
    this.movieService.getMovieDetails(movieId).subscribe(
      (movie) => {
        this.selectedMovie = movie;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load movie details';
        this.loading = false;
        console.error(error);
      }
    );
  }

  closeDetails() {
    this.selectedMovie = null;
  }
}
