import json
import os
from typing import List
import requests

from place.place import Place

BASE_URL = os.getenv('GOOGLE_PLACES_API_BASE_URL')


def get_places_by_type(place_types: List[str], longitude: float, latitude: float) -> List[Place]:
    response = requests.post(
        BASE_URL,
        headers={
            "Content-Type": "application/json",
            "X-Goog-Api-Key": os.getenv('GOOGLE_PLACES_API_KEY'),
            "X-Goog-FieldMask": "places.location,places.formattedAddress,places.googleMapsUri,places.displayName,places.websiteUri,places.photos,places.internationalPhoneNumber,places.rating,places.editorialSummary"
        },
        data=json.dumps({
            "includedPrimaryTypes": place_types,
            "maxResultCount": 20,
            "languageCode": "fr",
            "locationRestriction": {
                "circle": {
                    "center": {
                        "latitude": latitude,
                        "longitude": longitude
                    },
                    "radius": 10000.0
                }
            },
            "rankPreference": "DISTANCE"
        })
    )

    return [Place.from_google_api(place_data) for place_data in response.json()["places"]]
