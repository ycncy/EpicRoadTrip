package com.epicroadtrip.tripservice.infrastructure.persistence.entity;

import com.epicroadtrip.tripservice.domain.model.Position;
import com.epicroadtrip.tripservice.domain.model.StopType;
import com.epicroadtrip.tripservice.infrastructure.persistence.PositionConverter;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity(name="TripStop")
@Table(name="trip_stop")
public class TripStopEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="tripId")
    private UUID tripId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="trip", referencedColumnName="id")
    private TripEntity trip;

    private StopType type;

    private String name;

    private String description;

    @Convert(converter = PositionConverter.class)
    private Position position;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
