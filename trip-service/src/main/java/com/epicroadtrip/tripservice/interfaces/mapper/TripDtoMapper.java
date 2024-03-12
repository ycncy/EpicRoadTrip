package com.epicroadtrip.tripservice.interfaces.mapper;

import com.epicroadtrip.tripservice.domain.dto.request.CreatePatchTripRequest;
import com.epicroadtrip.tripservice.domain.model.TripModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripDtoMapper {

    public TripModel toDomain (CreatePatchTripRequest tripRequest) {
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
