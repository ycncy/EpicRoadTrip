package com.epicroadtrip.tripservice.domain.service;

import com.epicroadtrip.tripservice.application.dto.response.DeleteTripResponse;
import com.epicroadtrip.tripservice.application.dto.response.TripResponse;
import com.epicroadtrip.tripservice.application.dto.response.TripStopResponse;
import com.epicroadtrip.tripservice.domain.model.TripModel;

import java.util.List;
import java.util.UUID;

public interface TripService {
    List<TripStopResponse> getTripStops(UUID tripId);
    TripResponse getById(UUID tripId);
    List<TripResponse> getTripsByUserId(String userId);
    TripResponse create(TripModel tripModel);
    TripResponse patch(UUID tripId, TripModel tripModel);
    DeleteTripResponse delete(UUID tripId);
}
