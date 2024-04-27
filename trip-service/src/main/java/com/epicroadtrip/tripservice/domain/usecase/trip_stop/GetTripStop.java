package com.epicroadtrip.tripservice.domain.usecase.trip_stop;

import com.epicroadtrip.tripservice.domain.repository.TripStopRepository;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripStopEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetTripStop {

    private final TripStopRepository tripStopRepository;

    public TripStopEntity execute(int id) {
        return tripStopRepository.get(id);
    }
}
