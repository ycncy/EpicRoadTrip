package com.epicroadtrip.tripservice.application.usecase;

import com.epicroadtrip.tripservice.application.gateway.TripGateway;
import com.epicroadtrip.tripservice.domain.dto.request.CreatePatchTripRequest;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.interfaces.mapper.TripDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatchTrip {
    private final TripGateway tripGateway;
    private final TripDtoMapper tripDtoMapper;

    public TripEntity execute(String tripId, CreatePatchTripRequest patchTripRequest) {
        return tripGateway.patch(tripId, tripDtoMapper.toDomain(patchTripRequest));
    }
}
