package com.epicroadtrip.tripservice.infrastructure.mapper.in;

import com.epicroadtrip.tripservice.application.dto.request.CreateTripStopDTO;
import com.epicroadtrip.tripservice.application.dto.request.PatchTripStopRequest;
import com.epicroadtrip.tripservice.domain.model.TripStopModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
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
