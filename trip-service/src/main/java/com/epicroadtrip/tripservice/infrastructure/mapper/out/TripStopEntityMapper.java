package com.epicroadtrip.tripservice.infrastructure.mapper.out;

import com.epicroadtrip.tripservice.application.dto.response.TripStopResponse;
import com.epicroadtrip.tripservice.domain.model.TripStopModel;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripStopEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
public class TripStopEntityMapper {

    public TripStopEntity toEntity(TripStopModel tripStopModel) {
        TripStopEntity tripStopEntity = new TripStopEntity();

        tripStopEntity.setTripId(tripStopModel.tripId());
        tripStopEntity.setType(tripStopModel.type());
        tripStopEntity.setName(tripStopModel.name());
        tripStopEntity.setDescription(tripStopModel.description());
        tripStopEntity.setPosition(tripStopModel.position());

        return tripStopEntity;
    }

    public TripStopResponse toResponse(TripStopEntity tripStopEntity) {
        return new TripStopResponse(
                tripStopEntity.getId(),
                tripStopEntity.getTripId(),
                tripStopEntity.getType(),
                tripStopEntity.getName(),
                tripStopEntity.getDescription(),
                tripStopEntity.getPosition(),
                tripStopEntity.getCreatedAt()
        );
    }
}
