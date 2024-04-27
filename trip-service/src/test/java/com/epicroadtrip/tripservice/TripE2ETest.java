package com.epicroadtrip.tripservice;

import com.epicroadtrip.tripservice.application.dto.request.CreatePatchTripDTO;
import com.epicroadtrip.tripservice.application.dto.response.TripResponse;
import com.epicroadtrip.tripservice.domain.model.Position;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TripE2ETest {

    @Autowired
    private TestRestTemplate testRestTemplate;
    private RestTemplate patchRestTemplate;

    @BeforeEach
    public void setup() {
        testRestTemplate.getRestTemplate().setRequestFactory(new HttpComponentsClientHttpRequestFactory());

        this.patchRestTemplate = testRestTemplate.getRestTemplate();
        this.patchRestTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
    }

    @Test
    public void testCreateTrip() {
        CreatePatchTripDTO trip = new CreatePatchTripDTO(
                "Test",
                "Test description",
                new Position(0.00F, 0.00F),
                new Position(0.00F, 0.00F),
                null,
                null
        );

        ResponseEntity<TripResponse> createResponse = testRestTemplate.postForEntity("/api", trip, TripResponse.class);

        assertEquals(HttpStatus.CREATED, createResponse.getStatusCode());
        ResponseEntity<TripResponse> getResponse = testRestTemplate.getForEntity("/api/" + createResponse.getBody().id(), TripResponse.class);
        assertEquals(HttpStatus.OK, getResponse.getStatusCode());
        assertEquals(createResponse.getBody().id(), getResponse.getBody().id());
    }

    @Test
    public void testUpdateTrip() {
        CreatePatchTripDTO createRequest = new CreatePatchTripDTO(
                "Test",
                "Test description",
                new Position(0.00F, 0.00F),
                new Position(1.00F, 1.00F),
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(1)
        );
        ResponseEntity<TripResponse> createResponse = testRestTemplate.postForEntity("/api", createRequest, TripResponse.class);
        assertEquals(HttpStatus.CREATED, createResponse.getStatusCode());
        assertNotNull(createResponse.getBody().id());

        CreatePatchTripDTO updateRequest = new CreatePatchTripDTO(
                "Updated Test",
                "Updated Description",
                new Position(2.00F, 2.00F),
                new Position(3.00F, 3.00F),
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(2)
        );
        ResponseEntity<TripResponse> updateResponse = testRestTemplate.exchange(
                "/api/" + createResponse.getBody().id(),
                HttpMethod.PATCH,
                new HttpEntity<>(updateRequest),
                TripResponse.class
        );

        assertEquals(HttpStatus.OK, updateResponse.getStatusCode());
        ResponseEntity<TripResponse> getResponse = testRestTemplate.getForEntity("/api/" + createResponse.getBody().id(), TripResponse.class);
        assertEquals(HttpStatus.OK, getResponse.getStatusCode());
        assertEquals(updateRequest.getTitle(), getResponse.getBody().title());
    }

    @Test
    public void testDeleteTrip() {
        CreatePatchTripDTO createRequest = new CreatePatchTripDTO(
                "Trip to Delete",
                "Description",
                new Position(10.00F, 10.00F),
                new Position(20.00F, 20.00F),
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(5)
        );
        ResponseEntity<TripResponse> createResponse = testRestTemplate.postForEntity("/api", createRequest, TripResponse.class);
        assertEquals(HttpStatus.CREATED, createResponse.getStatusCode());
        UUID tripId = createResponse.getBody().id();

        testRestTemplate.delete("/api/" + tripId);

        ResponseEntity<String> getResponse = testRestTemplate.getForEntity("/api/" + tripId, String.class);
        assertEquals(HttpStatus.NOT_FOUND, getResponse.getStatusCode());
    }

    @Test
    public void testGetTrip() {
        CreatePatchTripDTO createRequest = new CreatePatchTripDTO(
                "Trip to Retrieve",
                "Description",
                new Position(30.00F, 30.00F),
                new Position(40.00F, 40.00F),
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(3)
        );
        ResponseEntity<TripResponse> createResponse = testRestTemplate.postForEntity("/api", createRequest, TripResponse.class);
        assertEquals(HttpStatus.CREATED, createResponse.getStatusCode());
        UUID tripId = createResponse.getBody().id();

        ResponseEntity<TripResponse> getResponse = testRestTemplate.getForEntity("/api/" + tripId, TripResponse.class);

        assertEquals(HttpStatus.OK, getResponse.getStatusCode());
        assertEquals(createRequest.getTitle(), getResponse.getBody().title());
    }
}
