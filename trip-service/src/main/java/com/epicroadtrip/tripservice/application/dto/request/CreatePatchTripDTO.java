package com.epicroadtrip.tripservice.application.dto.request;

import com.epicroadtrip.tripservice.domain.model.Position;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class CreatePatchTripDTO {
    @Schema(description="Trip title", example="Paris-Marseille 2024", requiredMode=Schema.RequiredMode.REQUIRED)
    private final String title;

    @Schema(description="User ID", example="2c0dcffaa7e3412492b79fd2f8a5f298", requiredMode=Schema.RequiredMode.REQUIRED)
    private final String userId;

    @Schema(description="Trip description", example="My first road-trip", requiredMode=Schema.RequiredMode.NOT_REQUIRED)
    private final String description;

    @Schema(description="Start position of the trip", requiredMode=Schema.RequiredMode.REQUIRED)
    private final Position startPosition;

    @Schema(description="End position of the trip", requiredMode=Schema.RequiredMode.REQUIRED)
    private final Position endPosition;

    @Schema(description="Start datetime of the trip", requiredMode=Schema.RequiredMode.NOT_REQUIRED)
    private final LocalDateTime startDatetime;

    @Schema(description="End datetime of the trip", requiredMode=Schema.RequiredMode.NOT_REQUIRED)
    private final LocalDateTime endDatetime;

    public CreatePatchTripDTO(String title, String userId, String description, Position startPosition, Position endPosition, LocalDateTime startDatetime, LocalDateTime endDatetime) {
        this.title = title;
        this.userId = userId;
        this.description = description;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.startDatetime = startDatetime;
        this.endDatetime = endDatetime;
    }

}
