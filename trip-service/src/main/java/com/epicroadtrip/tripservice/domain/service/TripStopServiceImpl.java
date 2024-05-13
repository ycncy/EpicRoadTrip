package com.epicroadtrip.tripservice.domain.service;

import com.epicroadtrip.tripservice.application.dto.response.*;
import com.epicroadtrip.tripservice.domain.model.TripStopModel;
import com.epicroadtrip.tripservice.domain.usecase.trip_stop.*;
import com.epicroadtrip.tripservice.infrastructure.exception.TripNotFoundException;
import com.epicroadtrip.tripservice.infrastructure.mapper.out.TripStopEntityMapper;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripStopEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripStopServiceImpl implements TripStopService {

    private final GetTripStop getTripStop;
    private final PatchTripStop patchTripStop;
    private final CreateTripStop createTripStop;
    private final DeleteTripStop deleteTripStop;
    private final TripStopEntityMapper tripStopEntityMapper;

    @Override
    public TripStopResponse getById(int tripStopId) {
        TripStopEntity tripStopEntity = getTripStop.execute(tripStopId);

        return tripStopEntityMapper.toResponse(tripStopEntity);
    }

    @Override
    public TripStopResponse create(TripStopModel tripStopModel) {
        TripStopEntity tripStopEntity = createTripStop.execute(tripStopModel);

        return tripStopEntityMapper.toResponse(tripStopEntity);
    }

    @Override
    public TripStopResponse patch(int tripStopId, TripStopModel tripStopModel) {
        TripStopEntity tripStopEntity = patchTripStop.execute(
                tripStopId,
                tripStopModel
        );

        return tripStopEntityMapper.toResponse(tripStopEntity);
    }

    @Override
    public DeleteTripStopResponse delete(int tripStopId) {
        boolean tripStopEntity = deleteTripStop.execute(tripStopId);

        if (!tripStopEntity) throw new TripNotFoundException("Trip-stop not found with id: " + tripStopId);

        return new DeleteTripStopResponse(
                tripStopId,
                "Trip-stop " + tripStopId + " deleted successfully"
        );
    }
}
