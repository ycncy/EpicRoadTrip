package com.epicroadtrip.tripservice.interfaces.mapper;

import com.epicroadtrip.tripservice.domain.dto.response.TripResponse;
import com.epicroadtrip.tripservice.domain.model.TripModel;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import org.springframework.stereotype.Component;

@Component
public class TripEntityMapper {

    public TripEntity toEntity(TripModel createTripRequest) {
        TripEntity tripEntity = new TripEntity();

        tripEntity.setTitle(createTripRequest.getTitle());
        tripEntity.setDescription(createTripRequest.getDescription());
        tripEntity.setStartPosition(createTripRequest.getStartPosition());
        tripEntity.setEndPosition(createTripRequest.getEndPosition());
        tripEntity.setStartDatetime(createTripRequest.getStartDatetime());
        tripEntity.setEndDatetime(createTripRequest.getEndDatetime());

        return tripEntity;
    }

    public TripResponse toResponse(TripEntity tripEntity) {
        return new TripResponse(
                tripEntity.getId(),
                tripEntity.getTitle(),
                tripEntity.getDescription(),
                tripEntity.getStartPosition(),
                tripEntity.getEndPosition(),
                tripEntity.getStartDatetime(),
                tripEntity.getEndDatetime(),
                tripEntity.getCreationDatetime()
        );
    }
}
