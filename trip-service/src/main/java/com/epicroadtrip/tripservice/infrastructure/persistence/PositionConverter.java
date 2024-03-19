package com.epicroadtrip.tripservice.infrastructure.persistence;

import com.epicroadtrip.tripservice.domain.model.Position;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class PositionConverter implements AttributeConverter<Position, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Position attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Position convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, Position.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
