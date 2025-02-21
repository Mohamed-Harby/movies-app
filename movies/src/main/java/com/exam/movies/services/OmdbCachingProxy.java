package com.exam.movies.services;

import com.exam.movies.dtos.MovieDto;
import com.exam.movies.dtos.MovieSearchResult;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class OmdbCachingProxy {
    private final OmdbApiService omdbApiService;

    public OmdbCachingProxy(OmdbApiService omdbApiService) {
        this.omdbApiService = omdbApiService;
    }

    @Cacheable(value = "movies", key = "#url")
    public MovieDto getMovie(String url) {
        return omdbApiService.getMovie(url);
    }

//    @Cacheable(value = "search", key = "#url")
    public MovieSearchResult searchMovies(String url) {
        return omdbApiService.searchMovies(url);
    }
}
