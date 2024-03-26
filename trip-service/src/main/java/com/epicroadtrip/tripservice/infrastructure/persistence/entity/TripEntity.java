package com.epicroadtrip.tripservice.infrastructure.persistence.entity;

import com.epicroadtrip.tripservice.domain.model.Position;
import com.epicroadtrip.tripservice.infrastructure.persistence.PositionConverter;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity(name="Trip")
@Table(name="trip")
public class TripEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private UUID id;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TripStopEntity> tripStops;

    private String title;

    private String description;

    @Column(name="start_position")
    @Convert(converter = PositionConverter.class)
    private Position startPosition;

    @Column(name="end_position")
    @Convert(converter = PositionConverter.class)
    private Position endPosition;

    @Column(name="start_datetime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startDatetime;

    @Column(name="end_datetime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endDatetime;

    @Column(name="created_datetime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
