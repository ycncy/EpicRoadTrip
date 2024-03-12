package com.epicroadtrip.tripservice.domain.dto.response;

import com.epicroadtrip.tripservice.domain.model.Position;

import java.time.LocalDateTime;

public record TripResponse (
        String id,
        String title,
        String description,
        Position startPosition,
        Position endPosition,
        LocalDateTime startDatetime,
        LocalDateTime endDatetime,
        LocalDateTime creationDatetime
) {
}
