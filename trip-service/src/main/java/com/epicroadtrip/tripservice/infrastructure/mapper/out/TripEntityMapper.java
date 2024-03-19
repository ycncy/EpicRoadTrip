package com.epicroadtrip.tripservice.infrastructure.mapper.out;

import com.epicroadtrip.tripservice.application.dto.response.TripResponse;
import com.epicroadtrip.tripservice.domain.model.TripModel;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import org.springframework.stereotype.Component;

@Component
public class TripEntityMapper {

    public TripEntity toEntity(TripModel tripModel) {
        TripEntity tripEntity = new TripEntity();

        tripEntity.setTitle(tripModel.title());
        tripEntity.setDescription(tripModel.description());
        tripEntity.setStartPosition(tripModel.startPosition());
        tripEntity.setEndPosition(tripModel.endPosition());
        tripEntity.setStartDatetime(tripModel.startDatetime());
        tripEntity.setEndDatetime(tripModel.endDatetime());

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
