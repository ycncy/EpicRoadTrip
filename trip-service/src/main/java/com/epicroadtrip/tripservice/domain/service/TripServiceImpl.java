package com.epicroadtrip.tripservice.domain.service;

import com.epicroadtrip.tripservice.application.dto.request.CreatePatchTripDTO;
import com.epicroadtrip.tripservice.application.dto.response.DeleteTripResponse;
import com.epicroadtrip.tripservice.application.dto.response.TripResponse;
import com.epicroadtrip.tripservice.domain.model.TripModel;
import com.epicroadtrip.tripservice.domain.usecase.CreateTrip;
import com.epicroadtrip.tripservice.domain.usecase.DeleteTrip;
import com.epicroadtrip.tripservice.domain.usecase.GetTrip;
import com.epicroadtrip.tripservice.domain.usecase.PatchTrip;
import com.epicroadtrip.tripservice.infrastructure.exception.TripNotFoundException;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.infrastructure.mapper.out.TripEntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {

    private final GetTrip getTrip;
    private final CreateTrip createTrip;
    private final PatchTrip patchTrip;
    private final DeleteTrip deleteTrip;
    private final TripEntityMapper tripEntityMapper;

    @Override
    public TripResponse getById(UUID tripId) {
        TripEntity tripEntity = getTrip.execute(tripId);

        return tripEntityMapper.toResponse(tripEntity);
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
