package com.epicroadtrip.tripservice.application.dto.request;

import com.epicroadtrip.tripservice.domain.model.*;
import io.swagger.v3.oas.annotations.media.Schema;

public record CreateTripStopDTO(
        @Schema(description = "Stop Google Place ID", example = "", requiredMode = Schema.RequiredMode.REQUIRED)
        String google_id,

        @Schema(description = "Stop type", example = "HOTEL", requiredMode = Schema.RequiredMode.REQUIRED)
        StopType type,

        @Schema(description = "Position of the stop", requiredMode = Schema.RequiredMode.REQUIRED)
        Position position,

        @Schema(description = "Name of the stop", example = "Golden Tulip", requiredMode = Schema.RequiredMode.REQUIRED)
        String name,

        @Schema(description = "Description of the stop", example = "Chaleureux hotel près de la mer", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        String description
) {
}
