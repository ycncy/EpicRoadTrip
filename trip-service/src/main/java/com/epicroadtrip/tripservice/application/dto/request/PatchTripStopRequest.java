package com.epicroadtrip.tripservice.application.dto.request;

import com.epicroadtrip.tripservice.domain.model.Position;
import com.epicroadtrip.tripservice.domain.model.StopType;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

public record PatchTripStopRequest (
        @Schema(description = "Trip ID", example = "550e8400-e29b-41d4-a716-446655440000", requiredMode = Schema.RequiredMode.REQUIRED)
        UUID tripId,

        @Schema(description="Stop type", example="HOTEL", requiredMode=Schema.RequiredMode.REQUIRED)
        StopType type,

        @Schema(description="Position of the stop", requiredMode=Schema.RequiredMode.REQUIRED)
        Position position,

        @Schema(description="Name of the stop", example="Golden Tulip", requiredMode=Schema.RequiredMode.REQUIRED)
        String name,

        @Schema(description="Description of the stop", example="Chaleureux hotel près de la mer", requiredMode=Schema.RequiredMode.NOT_REQUIRED)
        String description
) {
}
