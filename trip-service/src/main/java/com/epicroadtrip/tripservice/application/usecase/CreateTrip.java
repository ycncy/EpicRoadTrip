package com.epicroadtrip.tripservice.application.usecase;

import com.epicroadtrip.tripservice.application.gateway.TripGateway;
import com.epicroadtrip.tripservice.domain.dto.request.CreatePatchTripRequest;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.interfaces.mapper.TripDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateTrip {

    private final TripGateway tripGateway;
    private final TripDtoMapper tripDtoMapper;

    public TripEntity execute(CreatePatchTripRequest trip) {
        return tripGateway.create(tripDtoMapper.toDomain(trip));
    }
}
