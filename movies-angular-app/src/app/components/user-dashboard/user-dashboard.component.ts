import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  movies: any[] = [];
  selectedMovie: any = null;

  constructor() {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    // TODO: Implement movie loading logic
  }

  viewMovieDetails(movie: any) {
    this.selectedMovie = movie;
  }

  closeDetails() {
    this.selectedMovie = null;
  }
}
