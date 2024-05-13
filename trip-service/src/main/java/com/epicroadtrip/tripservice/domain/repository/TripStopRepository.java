package com.epicroadtrip.tripservice.domain.repository;

import com.epicroadtrip.tripservice.domain.model.TripStopModel;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripStopEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface TripStopRepository {
    TripStopEntity create(TripStopModel tripStop);
    TripStopEntity get(int id);
    TripStopEntity patch(int id, TripStopModel tripStop);
    boolean delete(int id);
}
