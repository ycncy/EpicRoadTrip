package com.epicroadtrip.tripservice.infrastructure.gateway;

import com.epicroadtrip.tripservice.application.gateway.TripGateway;
import com.epicroadtrip.tripservice.domain.model.TripModel;
import com.epicroadtrip.tripservice.infrastructure.exception.TripNotFoundException;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.infrastructure.persistence.repository.TripRepository;
import com.epicroadtrip.tripservice.interfaces.mapper.TripEntityMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TripRepositoryGateway implements TripGateway {

    private final TripRepository tripRepository;
    private final TripEntityMapper tripEntityMapper;

    @Override
    public TripEntity create(TripModel trip) {
        TripEntity tripEntity = tripEntityMapper.toEntity(trip);

        return tripRepository.save(tripEntity);
    }

    @Override
    public TripEntity get(String tripId) {
        return tripRepository.findById(tripId)
                .orElseThrow(() -> new TripNotFoundException("Trip not found with ID : " + tripId));
    }

    @Override
    public TripEntity patch(String tripId, TripModel trip) {
        TripEntity tripEntity = tripRepository.findById(tripId)
                .orElseThrow(() -> new TripNotFoundException("Trip not found with id: " + tripId));

        if (trip.getTitle() != null) tripEntity.setTitle(trip.getTitle());
        if (trip.getDescription() != null) tripEntity.setDescription(trip.getDescription());
        if (trip.getStartDatetime() != null) tripEntity.setStartDatetime(trip.getStartDatetime());
        if (trip.getEndDatetime() != null) tripEntity.setEndDatetime(trip.getEndDatetime());
        if (trip.getStartPosition() != null) tripEntity.setStartPosition(trip.getStartPosition());
        if (trip.getEndPosition() != null) tripEntity.setEndPosition(trip.getEndPosition());

        return tripRepository.save(tripEntity);
    }

    @Override
    public boolean delete(String tripId) {
        TripEntity tripEntity = tripRepository.findById(tripId)
                .orElseThrow(() -> new TripNotFoundException("Trip not found with id: " + tripId));

        tripRepository.delete(tripEntity);

        return tripRepository.findById(tripId).isEmpty();
    }

}
