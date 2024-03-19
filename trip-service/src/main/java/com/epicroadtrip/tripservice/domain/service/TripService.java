package com.epicroadtrip.tripservice.domain.service;

import com.epicroadtrip.tripservice.application.dto.response.DeleteTripResponse;
import com.epicroadtrip.tripservice.application.dto.response.TripResponse;
import com.epicroadtrip.tripservice.domain.model.TripModel;

import java.util.UUID;

public interface TripService {
    TripResponse getById(UUID tripId);
    TripResponse create(TripModel tripModel);
    TripResponse patch(UUID tripId, TripModel tripModel);
    DeleteTripResponse delete(UUID tripId);
}
