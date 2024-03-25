package com.epicroadtrip.tripservice.infrastructure.mapper.in;

import com.epicroadtrip.tripservice.application.dto.request.CreateTripStopDTO;
import com.epicroadtrip.tripservice.application.dto.request.PatchTripStopRequest;
import com.epicroadtrip.tripservice.domain.model.TripStopModel;
import com.epicroadtrip.tripservice.infrastructure.mapper.out.TripEntityMapper;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.infrastructure.persistence.repository.trip.SpringMySqlTripRepository;
import com.epicroadtrip.tripservice.infrastructure.persistence.repository.trip_stop.SpringMySqlTripStopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TripStopDtoMapper {

    public TripStopModel createDtoToDomain (UUID tripId, CreateTripStopDTO createTripStopRequest) {

        return new TripStopModel(
                tripId,
                createTripStopRequest.type(),
                createTripStopRequest.position(),
                createTripStopRequest.name(),
                createTripStopRequest.description()
        );
    }
    
    public TripStopModel patchDtoToDomain (PatchTripStopRequest patchTripStopRequest) {
        return new TripStopModel(
                patchTripStopRequest.tripId(),
                patchTripStopRequest.type(),
                patchTripStopRequest.position(),
                patchTripStopRequest.name(),
                patchTripStopRequest.description()
        );
    }
}
