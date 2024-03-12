package com.epicroadtrip.tripservice.application.service;

import com.epicroadtrip.tripservice.application.usecase.*;
import com.epicroadtrip.tripservice.domain.dto.request.*;
import com.epicroadtrip.tripservice.domain.dto.response.*;
import com.epicroadtrip.tripservice.infrastructure.exception.TripNotFoundException;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.interfaces.mapper.TripEntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripService {

    private final GetTrip getTrip;
    private final CreateTrip createTrip;
    private final PatchTrip patchTrip;
    private final DeleteTrip deleteTrip;
    private final TripEntityMapper tripEntityMapper;

    public TripResponse getById(String tripId) {
        TripEntity tripEntity = getTrip.execute(tripId);

        return tripEntityMapper.toResponse(tripEntity);
    }

    public TripResponse create(CreatePatchTripRequest trip) {
        TripEntity tripEntity = createTrip.execute(trip);

        return tripEntityMapper.toResponse(tripEntity);
    }

    public TripResponse patch(String tripId, CreatePatchTripRequest trip) {
        TripEntity tripEntity = patchTrip.execute(tripId, trip);

        return tripEntityMapper.toResponse(tripEntity);
    }

    public DeleteTripResponse delete(String tripId) {
        boolean tripEntity = deleteTrip.execute(tripId);

        if (!tripEntity) throw new TripNotFoundException("Trip not found with id: " + tripId);

        return new DeleteTripResponse(
                tripId,
                "Trip " + tripId + " deleted successfully"
        );
    }
}
