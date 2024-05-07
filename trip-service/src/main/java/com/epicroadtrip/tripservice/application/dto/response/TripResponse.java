package com.epicroadtrip.tripservice.application.dto.response;

import com.epicroadtrip.tripservice.domain.model.Position;

import java.time.LocalDateTime;
import java.util.UUID;

public record TripResponse (
        UUID id,
        String userId,
        String title,
        String description,
        Position startPosition,
        Position endPosition,
        LocalDateTime startDatetime,
        LocalDateTime endDatetime,
        LocalDateTime createdAt
) {
}
