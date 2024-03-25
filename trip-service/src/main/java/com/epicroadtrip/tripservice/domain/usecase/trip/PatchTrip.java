package com.epicroadtrip.tripservice.domain.usecase.trip;

import com.epicroadtrip.tripservice.domain.model.TripModel;
import com.epicroadtrip.tripservice.domain.repository.TripRepository;
import com.epicroadtrip.tripservice.application.dto.request.CreatePatchTripDTO;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.infrastructure.mapper.in.TripDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatchTrip {
    private final TripRepository tripRepository;

    public TripEntity execute(UUID tripId, TripModel tripModel) {
        return tripRepository.patch(tripId, tripModel);
    }
}
