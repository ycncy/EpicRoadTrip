package com.epicroadtrip.tripservice.infrastructure.persistence.repository.trip;

import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SpringMySqlTripRepository extends JpaRepository<TripEntity, UUID> {
    List<TripEntity> findByUserId(String userId);
}
