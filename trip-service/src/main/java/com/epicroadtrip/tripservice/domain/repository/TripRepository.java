package com.epicroadtrip.tripservice.domain.repository;

import com.epicroadtrip.tripservice.domain.model.TripModel;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TripRepository {
    TripEntity create(TripModel trip);
    TripEntity get(UUID id);
    TripEntity patch(UUID tripId, TripModel trip);
    boolean delete(UUID id);
}
