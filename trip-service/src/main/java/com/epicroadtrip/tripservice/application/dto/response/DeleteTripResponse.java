package com.epicroadtrip.tripservice.application.dto.response;

import java.util.UUID;

public record DeleteTripResponse (
        UUID id,
        String message
) {
}
