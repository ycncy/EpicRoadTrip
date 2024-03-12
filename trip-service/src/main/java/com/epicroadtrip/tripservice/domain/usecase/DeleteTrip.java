package com.epicroadtrip.tripservice.domain.usecase;

import com.epicroadtrip.tripservice.domain.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeleteTrip {

    private final TripRepository tripRepository;

    public boolean execute(UUID tripId) {
        return tripRepository.delete(tripId);
    }
}
