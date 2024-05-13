package com.epicroadtrip.tripservice.domain.model;

import java.util.UUID;

public record TripStopModel (
        UUID tripId,
        String googleId,
        StopType type,
        Position position,
        String name,
        String description
) {
}
