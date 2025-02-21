package com.exam.movies.mappers;

import com.exam.movies.dtos.MovieDto;
import com.exam.movies.models.Movie;

public class MovieMapper {

    public static Movie toEntity(MovieDto dto) {
        Movie entity = new Movie();
        entity.setYear(dto.getYear());
        entity.setType(dto.getType());
        entity.setTitle(dto.getTitle());
        entity.setImdbID(dto.getImdbID());
        entity.setPoster(dto.getPoster());

        return entity;
    }
}
