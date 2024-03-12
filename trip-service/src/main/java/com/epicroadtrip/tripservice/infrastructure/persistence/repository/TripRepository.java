package com.epicroadtrip.tripservice.infrastructure.persistence.repository;

import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends CrudRepository<TripEntity, String> {
}
