package com.epicroadtrip.tripservice.domain.service;

import com.epicroadtrip.tripservice.application.dto.response.DeleteTripResponse;
import com.epicroadtrip.tripservice.application.dto.response.TripResponse;
import com.epicroadtrip.tripservice.application.dto.response.TripStopResponse;
import com.epicroadtrip.tripservice.domain.model.TripModel;
import com.epicroadtrip.tripservice.domain.usecase.trip.*;
import com.epicroadtrip.tripservice.infrastructure.exception.TripNotFoundException;
import com.epicroadtrip.tripservice.infrastructure.mapper.out.TripStopEntityMapper;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.infrastructure.mapper.out.TripEntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {

    private final GetTrip getTrip;
    private final GetTripByUserId getTripByUserId;
    private final CreateTrip createTrip;
    private final PatchTrip patchTrip;
    private final DeleteTrip deleteTrip;
    private final TripEntityMapper tripEntityMapper;
    private final TripStopEntityMapper tripStopEntityMapper;

    @Override
    public List<TripStopResponse> getTripStops(UUID tripId) {
        TripEntity tripEntity = getTrip.execute(tripId);

        return tripEntity.getTripStops().stream()
                .map(tripStopEntityMapper::toResponse)
                .collect(Collectors.toList());
    }


    @Override
    public TripResponse getById(UUID tripId) {
        TripEntity tripEntity = getTrip.execute(tripId);

        return tripEntityMapper.toResponse(tripEntity);
    }

    @Override
    public List<TripResponse> getTripsByUserId(String userId) {
        List<TripEntity> tripEntities = getTripByUserId.execute(userId);

        return tripEntities.stream()
                .map(tripEntityMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TripResponse create(TripModel tripModel) {
        TripEntity tripEntity = createTrip.execute(tripModel);

        return tripEntityMapper.toResponse(tripEntity);
    }

    @Override
    public TripResponse patch(UUID tripId, TripModel tripModel) {
        TripEntity tripEntity = patchTrip.execute(tripId, tripModel);

        return tripEntityMapper.toResponse(tripEntity);
    }

    @Override
    public DeleteTripResponse delete(UUID tripId) {
        boolean tripEntity = deleteTrip.execute(tripId);

        if (!tripEntity) throw new TripNotFoundException("Trip not found with id: " + tripId);

        return new DeleteTripResponse(
                tripId,
                "Trip " + tripId + " deleted successfully"
        );
    }
}
