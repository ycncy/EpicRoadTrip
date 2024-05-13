package com.epicroadtrip.tripservice.application.controller;

import com.epicroadtrip.tripservice.application.dto.request.CreatePatchTripDTO;
import com.epicroadtrip.tripservice.application.dto.request.CreateTripStopDTO;
import com.epicroadtrip.tripservice.application.dto.request.PatchTripStopRequest;
import com.epicroadtrip.tripservice.application.dto.response.DeleteTripResponse;
import com.epicroadtrip.tripservice.application.dto.response.DeleteTripStopResponse;
import com.epicroadtrip.tripservice.application.dto.response.TripResponse;
import com.epicroadtrip.tripservice.application.dto.response.TripStopResponse;
import com.epicroadtrip.tripservice.domain.service.TripStopService;
import com.epicroadtrip.tripservice.infrastructure.mapper.in.TripStopDtoMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/trip-stops")
@Tag(name = "Trip Stop", description = "Add or remove stops from a Trip")
@RequiredArgsConstructor
public class TripStopController {

    private final TripStopService tripStopService;
    private final TripStopDtoMapper tripStopDtoMapper;

    @Operation(summary = "Get a trip-stop by ID", description = "Retrieves detailed information about a trip-stop given its ID.")
    @GetMapping("/{trip-stop-id}")
    public ResponseEntity<TripStopResponse> get(
            @Schema(description = "Trip-stop ID", example = "64", requiredMode = Schema.RequiredMode.REQUIRED)
            @PathVariable("trip-stop-id") int tripStopId
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tripStopService.getById(tripStopId));
    }

    @Operation(summary = "Create a new trip-stop", description = "Creates a new trip-stop with the given details.")
    @PostMapping
    public ResponseEntity<TripStopResponse> create(
            @Schema(description = "Trip ID", example = "550e8400-e29b-41d4-a716-446655440000", requiredMode = Schema.RequiredMode.REQUIRED)
            @RequestParam("trip-id") UUID tripId,
            @RequestBody CreateTripStopDTO createTripStopRequest
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(tripStopService.create(tripStopDtoMapper.createDtoToDomain(tripId, createTripStopRequest)));
    }

    @Operation(summary = "Update a trip-stop", description = "Updates the details of an existing trip-stop.")
    @PatchMapping("/{trip-stop-id}")
    public ResponseEntity<TripStopResponse> patch(
            @Schema(description = "Trip-stop ID", example = "64", requiredMode = Schema.RequiredMode.REQUIRED)
            @PathVariable("trip-stop-id") int tripStopId,
            @RequestBody PatchTripStopRequest patchTripStopRequest
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tripStopService.patch(tripStopId, tripStopDtoMapper.patchDtoToDomain(patchTripStopRequest)));
    }

    @Operation(summary = "Delete a trip", description = "Deletes a trip given its ID.")
    @DeleteMapping("/{trip-stop-id}")
    public ResponseEntity<DeleteTripStopResponse> delete(
            @Schema(description = "Trip-stop ID", example = "64", requiredMode = Schema.RequiredMode.REQUIRED)
            @PathVariable("trip-stop-id") int tripStopId
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tripStopService.delete(tripStopId));
    }
}
