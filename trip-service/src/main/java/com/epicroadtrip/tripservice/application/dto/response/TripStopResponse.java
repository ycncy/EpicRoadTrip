package com.epicroadtrip.tripservice.application.dto.response;

import com.epicroadtrip.tripservice.domain.model.*;

import java.time.LocalDateTime;
import java.util.UUID;

public record TripStopResponse (
    int id,
    UUID tripId,
    StopType type,
    String name,
    String description,
    Position position,
    LocalDateTime createdAt
) {}
