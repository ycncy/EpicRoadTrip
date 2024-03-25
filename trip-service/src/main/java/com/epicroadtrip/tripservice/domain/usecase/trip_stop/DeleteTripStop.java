package com.epicroadtrip.tripservice.domain.usecase.trip_stop;

import com.epicroadtrip.tripservice.domain.repository.TripStopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteTripStop {

    private final TripStopRepository tripStopRepository;

    public boolean execute(int id) {
        return tripStopRepository.delete(id);
    }

}
