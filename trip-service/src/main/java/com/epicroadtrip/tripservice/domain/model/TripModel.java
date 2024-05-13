package com.epicroadtrip.tripservice.domain.model;

import java.time.LocalDateTime;
import java.util.UUID;

public record TripModel (
    String title,
    String userId,
    String description,
    Position startPosition,
    Position endPosition,
    LocalDateTime startDatetime,
    LocalDateTime endDatetime
){};
