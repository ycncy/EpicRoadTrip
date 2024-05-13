package com.epicroadtrip.tripservice.infrastructure.persistence.repository.trip_stop;

import com.epicroadtrip.tripservice.domain.model.TripStopModel;
import com.epicroadtrip.tripservice.domain.repository.TripStopRepository;
import com.epicroadtrip.tripservice.infrastructure.exception.TripNotFoundException;
import com.epicroadtrip.tripservice.infrastructure.mapper.out.TripStopEntityMapper;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripEntity;
import com.epicroadtrip.tripservice.infrastructure.persistence.entity.TripStopEntity;
import com.epicroadtrip.tripservice.infrastructure.persistence.repository.trip.SpringMySqlTripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MySqlTripStopRepository implements TripStopRepository {

    private final SpringMySqlTripStopRepository springMySqlTripStopRepository;
    private final SpringMySqlTripRepository springMySqlTripRepository;
    private final TripStopEntityMapper tripStopEntityMapper;

    @Override
    public TripStopEntity create(TripStopModel tripStop) {
        boolean tripEntity = springMySqlTripRepository.findById(tripStop.tripId()).isEmpty();

        if (tripEntity) throw new TripNotFoundException("Trip not found with ID : " + tripStop.tripId());

        TripStopEntity tripStopEntity = tripStopEntityMapper.toEntity(tripStop);

        return springMySqlTripStopRepository.save(tripStopEntity);
    }

    @Override
    public TripStopEntity get(int id) {
        return springMySqlTripStopRepository.findById(id)
                .orElseThrow(() -> new TripNotFoundException("Trip-stop not found with ID : " + id));
    }

    @Override
    public TripStopEntity patch(int id, TripStopModel tripStop) {
        TripStopEntity tripStopEntity = springMySqlTripStopRepository.findById(id)
                .orElseThrow(() -> new TripNotFoundException("Trip-stop not found with id: " + id));

        if (tripStop.tripId() != null) {
            TripEntity tripEntity = springMySqlTripRepository.findById(tripStop.tripId())
                    .orElseThrow(() -> new TripNotFoundException("Trip not found with id: " + tripStop.tripId()));
            tripStopEntity.setTrip(tripEntity);
        }
        if (tripStop.name() != null) tripStopEntity.setName(tripStop.name());
        if (tripStop.type() != null) tripStopEntity.setType(tripStop.type());
        if (tripStop.position() != null) tripStopEntity.setPosition(tripStop.position());
        if (tripStop.description() != null) tripStopEntity.setDescription(tripStop.description());

        return springMySqlTripStopRepository.save(tripStopEntity);
    }

    @Override
    public boolean delete(int id) {
        TripStopEntity tripStopEntity = springMySqlTripStopRepository.findById(id)
                .orElseThrow(() -> new TripNotFoundException("Trip-stop not found with id: " + id));

        springMySqlTripStopRepository.delete(tripStopEntity);

        return springMySqlTripStopRepository.findById(id).isEmpty();
    }
}
