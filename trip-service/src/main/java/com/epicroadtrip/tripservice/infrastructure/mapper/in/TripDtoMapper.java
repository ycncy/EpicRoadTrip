package com.epicroadtrip.tripservice.infrastructure.mapper.in;

import com.epicroadtrip.tripservice.application.dto.request.CreatePatchTripDTO;
import com.epicroadtrip.tripservice.domain.model.TripModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
public class TripDtoMapper {

    public TripModel toDomain (CreatePatchTripDTO tripRequest) {
        return new TripModel(
                tripRequest.getTitle(),
                tripRequest.getDescription(),
                tripRequest.getStartPosition(),
                tripRequest.getEndPosition(),
                tripRequest.getStartDatetime(),
                tripRequest.getEndDatetime()
        );
    }
}
