package com.epicroadtrip.tripservice.infrastructure.persistence.repository.trip;

import com.epicroadtrip.tripservice.domain.repository.TripRepository;
import com.epicroadtrip.tripservice.domain.model.TripModel;
import com.epicroadtrip.tripservice.infrastructure.exception.TripNotFoundException;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.infrastructure.mapper.out.TripEntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class MySqlTripRepository implements TripRepository {

    private final SpringMySqlTripRepository springMySqlTripRepository;
    private final TripEntityMapper tripEntityMapper;

    @Override
    public TripEntity create(TripModel trip) {
        TripEntity tripEntity = tripEntityMapper.toEntity(trip);

        return springMySqlTripRepository.save(tripEntity);
    }

    @Override
    public TripEntity get(UUID tripId) {
        return springMySqlTripRepository.findById(tripId)
                .orElseThrow(() -> new TripNotFoundException("Trip not found with ID : " + tripId));
    }

    @Override
    public TripEntity patch(UUID tripId, TripModel trip) {
        TripEntity tripEntity = springMySqlTripRepository.findById(tripId)
                .orElseThrow(() -> new TripNotFoundException("Trip not found with id: " + tripId));

        if (trip.title() != null) tripEntity.setTitle(trip.title());
        if (trip.description() != null) tripEntity.setDescription(trip.description());
        if (trip.startDatetime() != null) tripEntity.setStartDatetime(trip.startDatetime());
        if (trip.endDatetime() != null) tripEntity.setEndDatetime(trip.endDatetime());
        if (trip.startPosition() != null) tripEntity.setStartPosition(trip.startPosition());
        if (trip.endPosition() != null) tripEntity.setEndPosition(trip.endPosition());

        return springMySqlTripRepository.save(tripEntity);
    }

    @Override
    public boolean delete(UUID tripId) {
        TripEntity tripEntity = springMySqlTripRepository.findById(tripId)
                .orElseThrow(() -> new TripNotFoundException("Trip not found with id: " + tripId));

        springMySqlTripRepository.delete(tripEntity);

        return springMySqlTripRepository.findById(tripId).isEmpty();
    }

}
