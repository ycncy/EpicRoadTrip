package com.epicroadtrip.tripservice.infrastructure.persistence.repository;

import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SpringMySqlTripRepository extends CrudRepository<TripEntity, UUID> {}
