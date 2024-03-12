package com.epicroadtrip.tripservice.domain.model;

import java.time.LocalDateTime;

public class TripModel {
    private final String title;
    private final String description;
    private final Position startPosition;
    private final Position endPosition;
    private final LocalDateTime startDatetime;
    private final LocalDateTime endDatetime;

    public TripModel(String title, String description, Position startPosition, Position endPosition, LocalDateTime startDatetime, LocalDateTime endDatetime) {
        this.title = title;
        this.description = description;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.startDatetime = startDatetime;
        this.endDatetime = endDatetime;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Position getStartPosition() {
        return startPosition;
    }

    public Position getEndPosition() {
        return endPosition;
    }

    public LocalDateTime getStartDatetime() {
        return startDatetime;
    }

    public LocalDateTime getEndDatetime() {
        return endDatetime;
    }
}
