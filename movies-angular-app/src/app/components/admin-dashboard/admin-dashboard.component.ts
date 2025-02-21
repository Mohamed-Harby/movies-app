import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  movies: any[] = [];
  searchQuery: string = '';

  constructor() {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    // TODO: Implement movie loading logic
  }

  searchMovies() {
    // TODO: Implement search functionality
  }

  addMovie(movie: any) {
    // TODO: Implement add movie functionality
  }

  removeMovie(movieId: string) {
    // TODO: Implement remove movie functionality
  }
}
