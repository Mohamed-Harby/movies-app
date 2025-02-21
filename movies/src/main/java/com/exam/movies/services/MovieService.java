package com.exam.movies.services;

import com.exam.movies.dtos.MovieDto;
import com.exam.movies.mappers.MovieMapper;
import com.exam.movies.models.Movie;
import com.exam.movies.repos.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final OmdbCachingProxy proxy;

    public MovieService(MovieRepository movieRepository, OmdbCachingProxy proxy) {
        this.movieRepository = movieRepository;
        this.proxy = proxy;
    }

    public Optional<Movie> getById(Long id) {
        return movieRepository.findById(id);
    }

    public List<Movie> getAll() {
        return movieRepository.findAll();
    }

    public Optional<Movie> create(String imdbID) {
        MovieDto movieDto = proxy.getMovie(imdbID);
        return movieDto == null ? Optional.empty() :
                Optional.of(movieRepository.save(MovieMapper.toEntity(movieDto)));

    }
}
