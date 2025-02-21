package com.exam.movies.util;

import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

public class UriBuilder {
    private static final String OMDB_API_URL = "https://www.omdbapi.com/";
    private static final String API_KEY = "4fa163b9";


    public static String buildSearchUrl(String title, String type, String year, String format, Integer page) {
        // Build the request URL
        return UriComponentsBuilder.fromUriString(OMDB_API_URL)
                .queryParam("apikey", API_KEY)
                .queryParam("s", title)
                .queryParamIfPresent("type", type != null ? Optional.of(type) : Optional.empty())
                .queryParamIfPresent("y", year != null ? Optional.of(year) : Optional.empty())
                .queryParamIfPresent("r", format != null ? Optional.of(format) : Optional.empty())
                .queryParamIfPresent("page", page != null ? Optional.of(page) : Optional.empty())
                .toUriString();
    }
    public static String buildGetUrl(String imdbID) {
        // Build the request URL
        return UriComponentsBuilder.fromUriString(OMDB_API_URL)
                .queryParam("i", imdbID)
                .queryParam("apikey", API_KEY)
                .toUriString();
    }


}
