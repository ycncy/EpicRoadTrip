package com.epicroadtrip.tripservice.infrastructure.mapper.out;

import com.epicroadtrip.tripservice.application.dto.response.TripStopResponse;
import com.epicroadtrip.tripservice.domain.model.TripStopModel;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripStopEntity;
import com.epicroadtrip.tripservice.infrastructure.persistence.repository.trip.SpringMySqlTripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripStopEntityMapper {

    private final SpringMySqlTripRepository springMySqlTripRepository;

    public TripStopEntity toEntity(TripStopModel tripStopModel) {
        TripStopEntity tripStopEntity = new TripStopEntity();
        TripEntity tripEntity = springMySqlTripRepository.findById(tripStopModel.tripId()).get();

        tripStopEntity.setGoogleId(tripStopModel.googleId());
        tripStopEntity.setTrip(tripEntity);
        tripStopEntity.setType(tripStopModel.type());
        tripStopEntity.setName(tripStopModel.name());
        tripStopEntity.setDescription(tripStopModel.description());
        tripStopEntity.setPosition(tripStopModel.position());

        return tripStopEntity;
    }

    public TripStopResponse toResponse(TripStopEntity tripStopEntity) {
        return new TripStopResponse(
                tripStopEntity.getId(),
                tripStopEntity.getTrip().getId(),
                tripStopEntity.getGoogleId(),
                tripStopEntity.getType(),
                tripStopEntity.getName(),
                tripStopEntity.getDescription(),
                tripStopEntity.getPosition(),
                tripStopEntity.getCreatedAt()
        );
    }
}
