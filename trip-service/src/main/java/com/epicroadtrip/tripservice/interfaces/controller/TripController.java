package com.epicroadtrip.tripservice.interfaces.controller;

import com.epicroadtrip.tripservice.application.service.TripService;
import com.epicroadtrip.tripservice.domain.dto.request.*;
import com.epicroadtrip.tripservice.domain.dto.response.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Tag(name = "Trip", description = "Complete trip management")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @Operation(summary = "Get a trip by ID", description = "Retrieves detailed information about a trip given its ID.")
    @GetMapping("/{trip-id}")
    public ResponseEntity<TripResponse> get(
            @Schema(description = "Trip ID", example = "550e8400-e29b-41d4-a716-446655440000", requiredMode = Schema.RequiredMode.REQUIRED)
            @PathVariable("trip-id") String tripId
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tripService.getById(tripId));
    }

    @Operation(summary = "Create a new trip", description = "Creates a new trip with the given details.")
    @PostMapping
    public ResponseEntity<TripResponse> create(
            @RequestBody CreatePatchTripRequest createTripRequest
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(tripService.create(createTripRequest));
    }

    @Operation(summary = "Update a trip", description = "Updates the details of an existing trip.")
    @PatchMapping("/{trip-id}")
    public ResponseEntity<TripResponse> patch(
            @Schema(description = "Trip ID", example = "550e8400-e29b-41d4-a716-446655440000", requiredMode = Schema.RequiredMode.REQUIRED)
            @PathVariable("trip-id") String tripId,
            @RequestBody CreatePatchTripRequest patchTripRequest
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tripService.patch(tripId, patchTripRequest));
    }

    @Operation(summary = "Delete a trip", description = "Deletes a trip given its ID.")
    @DeleteMapping("/{trip-id}")
    public ResponseEntity<DeleteTripResponse> delete(
            @Schema(description = "Trip ID", example = "550e8400-e29b-41d4-a716-446655440000", requiredMode = Schema.RequiredMode.REQUIRED)
            @PathVariable("trip-id") String tripId
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tripService.delete(tripId));
    }
}
