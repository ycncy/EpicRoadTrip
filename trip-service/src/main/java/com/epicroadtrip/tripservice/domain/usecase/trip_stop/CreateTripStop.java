package com.epicroadtrip.tripservice.domain.usecase.trip_stop;

import com.epicroadtrip.tripservice.domain.model.TripStopModel;
import com.epicroadtrip.tripservice.domain.repository.TripStopRepository;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripStopEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateTripStop {

    private final TripStopRepository tripStopRepository;

    public TripStopEntity execute(TripStopModel tripStopModel) {
        return tripStopRepository.create(tripStopModel);
    }
}
