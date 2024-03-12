package com.epicroadtrip.tripservice.application.gateway;

import com.epicroadtrip.tripservice.domain.model.TripModel;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface TripGateway {
    TripEntity create(TripModel trip);
    TripEntity get(String id);
    TripEntity patch(String tripId, TripModel trip);
    boolean delete(String id);
}
