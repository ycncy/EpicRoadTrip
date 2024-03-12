package com.epicroadtrip.tripservice.application.usecase;

import com.epicroadtrip.tripservice.application.gateway.TripGateway;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetTrip {

    private final TripGateway tripGateway;

    public TripEntity execute(String id) {
        return tripGateway.get(id);
    }
}
