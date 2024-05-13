package com.epicroadtrip.tripservice.infrastructure.persistence.repository.trip_stop;

import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripStopEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpringMySqlTripStopRepository extends CrudRepository<TripStopEntity, Integer> {
}
