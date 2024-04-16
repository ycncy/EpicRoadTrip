from dataclasses import dataclass
from enum import Enum
from tkinter import Place
from typing import Optional


class PlaceType(Enum):
    CAR_UTILITIES = 'CAR_UTILITIES'
    CULTURE = 'CULTURE'
    ENTERTAINMENT = 'ENTERTAINMENT'
    FINANCE = 'FINANCE'
    BAR = 'BAR'
    RESTAURANT = 'RESTAURANT'
    ADMINISTRATIVE_SERVICE = 'ADMINISTRATIVE_SERVICE'
    HEALTH = 'HEALTH'
    ACCOMMODATION = 'ACCOMMODATION'
    SERVICES = 'SERVICES'
    SHOPPING = 'SHOPPING'
    SPORT = 'SPORT'
    TRANSPORT = 'TRANSPORT'


place_type_binding = {
    PlaceType.CAR_UTILITIES: ["car_dealer", "car_rental", "car_repair", "car_wish", "electric_vehicle_charging_station",
                              "gas_station", "parking", "rest_stop"],
    PlaceType.CULTURE: ["art_gallery", "museum", "performing_arts_theater"],
    PlaceType.ENTERTAINMENT: ["library"],
    PlaceType.FINANCE: ["accounting", "atm", "bank"],
    PlaceType.RESTAURANT: ["restaurant", "coffee_shop", "ice_cream_shop"],
    PlaceType.BAR: ["cafe", "bar"],
    PlaceType.ADMINISTRATIVE_SERVICE: ["city_hall", "police", "embassy"],
    PlaceType.HEALTH: ["dental_clinic", "dentist", "doctor", "drugstore", "hospital", "medical_lab", "pharmacy",
                       "physiotherapist", "spa"],
    PlaceType.ACCOMMODATION: ["hotel", "hostel", "cottage", "guest_house", "resort_hotel", "private_guest_room",
                              "bed_and_breakfast", "campground", "camping_cabin", "extended_stay_hotel"],
    PlaceType.SERVICES: ["barber_shop", "beauty_salon", "hair_salon", "hair_care", "laundry",
                         "telecommunications_service_provider", "travel_agency"],
    PlaceType.SHOPPING: ["book_store", "cell_phone_store", "clothing_store", "discount_store", "electronics_store",
                         "gift_shop", "grocery_store", "hardware_store", "jewelry_store", "market", "pet_store",
                         "shoe_store", "shopping_mall", "supermarket", "store"],
    PlaceType.SPORT: ["athletic_field", "fitness_center", "gym", "ski_resort", "sports_club", "sports_complex",
                      "stadium", "swimming_pool"],
    PlaceType.TRANSPORT: ["airport", "bus_station", "ferry_terminal", "light_rail_station", "park_and_ride",
                          "subway_station", "taxi_stand", "train_station", "transit_depot", "transit_station"],
}


class Location:
    longitude: float
    latitude: float


@dataclass
class Place:
    address: Optional[str]
    location: Location
    google_maps_url: Optional[str]
    name: Optional[str]
    phone_number: Optional[str]
    website_url: Optional[str]
    summary: Optional[str]
    image_url: Optional[str]
    rating: Optional[float]

    @classmethod
    def from_google_api(cls, place: dict) -> Place:
        return cls(
            place.get("formattedAddress", None),
            place.get("location", None),
            place.get("googleMapsUri", None),
            place.get("displayName", {}).get("text", None),
            place.get("internationalPhoneNumber", None),
            place.get("websiteUri", None),
            place.get("editorialSummary", {}).get("text", None),
            place.get("photos", [{}])[0].get("authorAttributions", [{}])[0].get("photoUri", None),
            place.get("rating", None)
        )
