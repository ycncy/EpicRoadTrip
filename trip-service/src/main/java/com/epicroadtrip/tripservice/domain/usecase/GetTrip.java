package com.epicroadtrip.tripservice.domain.usecase;

import com.epicroadtrip.tripservice.domain.repository.TripRepository;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetTrip {

    private final TripRepository tripRepository;

    public TripEntity execute(UUID id) {
        return tripRepository.get(id);
    }
}
