package com.epicroadtrip.tripservice.domain.usecase.trip;

import com.epicroadtrip.tripservice.domain.model.TripModel;
import com.epicroadtrip.tripservice.domain.repository.TripRepository;
import com.epicroadtrip.tripservice.application.dto.request.CreatePatchTripDTO;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.infrastructure.mapper.in.TripDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateTrip {

    private final TripRepository tripRepository;

    public TripEntity execute(TripModel tripModel) {
        return tripRepository.create(tripModel);
    }
}
