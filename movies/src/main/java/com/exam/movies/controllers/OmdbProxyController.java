package com.exam.movies.controllers;

import com.exam.movies.dtos.MovieDto;
import com.exam.movies.dtos.MovieSearchResult;
import com.exam.movies.services.OmdbCachingProxy;
import com.exam.movies.util.UriBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/proxy/movies")
public class OmdbProxyController {

    private final OmdbCachingProxy proxy;

    public OmdbProxyController(OmdbCachingProxy proxy) {
        this.proxy = proxy;
    }

    @GetMapping("/{imdbID}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MovieDto> getMovie(@PathVariable String imdbID) {
        String url = UriBuilder.buildGetUrl(imdbID);
        return ResponseEntity.ok(proxy.getMovie(url));
    }


    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    public MovieSearchResult searchMovies(
            @RequestParam String title,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String year,
            @RequestParam(required = false, defaultValue = "json") String format,
            @RequestParam(required = false, defaultValue = "1") Integer page
    ) {

        String searchUrl = UriBuilder.buildSearchUrl(title, type, year, format, page);
        return proxy.searchMovies(searchUrl);
    }
}
