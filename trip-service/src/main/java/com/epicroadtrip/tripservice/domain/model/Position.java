package com.epicroadtrip.tripservice.domain.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Embeddable;

@Embeddable
public record Position(
        @Schema(description="Latitude", example="34.0000", requiredMode=Schema.RequiredMode.REQUIRED)
        Float latitude,

        @Schema(description="Longitude", example="34.0000", requiredMode=Schema.RequiredMode.REQUIRED)
        Float longitude
) {
}
