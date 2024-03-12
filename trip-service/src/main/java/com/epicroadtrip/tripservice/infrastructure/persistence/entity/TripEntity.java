package com.epicroadtrip.tripservice.infrastructure.persistence.entity;

import com.epicroadtrip.tripservice.domain.model.Position;
import com.epicroadtrip.tripservice.infrastructure.persistence.PositionConverter;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity(name="Trip")
@Table(name="trip")
public class TripEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private UUID id;

    private String title;

    private String description;

    @Convert(converter = PositionConverter.class)
    private Position startPosition;

    @Convert(converter = PositionConverter.class)
    private Position endPosition;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startDatetime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endDatetime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime creationDatetime;

    @PrePersist
    protected void onCreate() {
        creationDatetime = LocalDateTime.now();
    }
}
