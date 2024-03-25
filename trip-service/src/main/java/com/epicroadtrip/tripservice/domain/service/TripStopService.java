package com.epicroadtrip.tripservice.domain.service;

import com.epicroadtrip.tripservice.application.dto.response.*;
import com.epicroadtrip.tripservice.domain.model.*;

public interface TripStopService {
    TripStopResponse getById(int tripStopId);
    TripStopResponse create(TripStopModel tripStopModel);
    TripStopResponse patch(int tripStopId, TripStopModel tripStopModel);
    DeleteTripStopResponse delete(int tripStopId);
}
