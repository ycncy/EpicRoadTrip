package com.epicroadtrip.tripservice.application.usecase;

import com.epicroadtrip.tripservice.application.gateway.TripGateway;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteTrip {

    private final TripGateway tripGateway;

    public boolean execute(String tripId) {
        return tripGateway.delete(tripId);
    }
}
