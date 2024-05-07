package com.epicroadtrip.tripservice.domain.usecase.trip;

import com.epicroadtrip.tripservice.domain.repository.TripRepository;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetTripByUserId {

    private final TripRepository tripRepository;

    public List<TripEntity> execute(String userId) {
        return tripRepository.getTripsByUserId(userId);
    }
}
