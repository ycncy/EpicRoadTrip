package com.epicroadtrip.tripservice.application.controller;

import com.epicroadtrip.tripservice.application.dto.request.CreatePatchTripDTO;
import com.epicroadtrip.tripservice.application.dto.response.DeleteTripResponse;
import com.epicroadtrip.tripservice.application.dto.response.TripResponse;
import com.epicroadtrip.tripservice.domain.service.TripService;
import com.epicroadtrip.tripservice.infrastructure.mapper.in.TripDtoMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
@Tag(name = "Trip", description = "Complete trip management")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;
    private final TripDtoMapper tripDtoMapper;

    @Operation(summary = "Get a trip by ID", description = "Retrieves detailed information about a trip given its ID.")
    @GetMapping("/{trip-id}")
    public ResponseEntity<TripResponse> get(
            @Schema(description = "Trip ID", example = "550e8400-e29b-41d4-a716-446655440000", requiredMode = Schema.RequiredMode.REQUIRED)
            @PathVariable("trip-id") UUID tripId
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tripService.getById(tripId));
    }

    @Operation(summary = "Create a new trip", description = "Creates a new trip with the given details.")
    @PostMapping
    public ResponseEntity<TripResponse> create(
            @RequestBody CreatePatchTripDTO createTripRequest
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(tripService.create(tripDtoMapper.toDomain(createTripRequest)));
    }

    @Operation(summary = "Update a trip", description = "Updates the details of an existing trip.")
    @PatchMapping("/{trip-id}")
    public ResponseEntity<TripResponse> patch(
            @Schema(description = "Trip ID", example = "550e8400-e29b-41d4-a716-446655440000", requiredMode = Schema.RequiredMode.REQUIRED)
            @PathVariable("trip-id") UUID tripId,
            @RequestBody CreatePatchTripDTO patchTripRequest
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tripService.patch(tripId, tripDtoMapper.toDomain(patchTripRequest)));
    }

    @Operation(summary = "Delete a trip", description = "Deletes a trip given its ID.")
    @DeleteMapping("/{trip-id}")
    public ResponseEntity<DeleteTripResponse> delete(
            @Schema(description = "Trip ID", example = "550e8400-e29b-41d4-a716-446655440000", requiredMode = Schema.RequiredMode.REQUIRED)
            @PathVariable("trip-id") UUID tripId
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tripService.delete(tripId));
    }
}
