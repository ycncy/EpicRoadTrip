package com.epicroadtrip.tripservice.infrastructure.persistence.entity;

import com.epicroadtrip.tripservice.domain.model.Position;
import com.epicroadtrip.tripservice.domain.model.StopType;
import com.epicroadtrip.tripservice.infrastructure.persistence.PositionConverter;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity(name="TripStop")
@Table(name="trip_stop")
public class TripStopEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private TripEntity trip;

    private String googleId;

    private StopType type;

    private String name;

    private String description;

    @Convert(converter = PositionConverter.class)
    private Position position;

    @Column(name="created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
