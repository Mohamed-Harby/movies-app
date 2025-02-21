package com.exam.movies.services;

import com.exam.movies.dtos.MovieDto;
import com.exam.movies.dtos.MovieSearchResult;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class OmdbApiService {

    private final RestTemplate restTemplate;

    public OmdbApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public MovieDto getMovie(String url) {
        return restTemplate.getForObject(url, MovieDto.class);
    }

    public MovieSearchResult searchMovies(String url) {
        // Fetch and map the response to the DTO
        return restTemplate.getForObject(url, MovieSearchResult.class);
    }


}
