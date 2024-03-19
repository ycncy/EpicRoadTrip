package com.epicroadtrip.tripservice.domain.model;

import java.time.LocalDateTime;

public record TripModel (
    String title,
    String description,
    Position startPosition,
    Position endPosition,
    LocalDateTime startDatetime,
    LocalDateTime endDatetime
){};
