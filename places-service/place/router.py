from typing import List

from fastapi import APIRouter, HTTPException

from place.google_service import get_places_by_type
from place.place import PlaceType, place_type_binding, Place

router = APIRouter(
    prefix="/places",
    tags=["Places"],
)


@router.get("", tags=["Places"], response_model=List[Place])
async def get_place(
        place_type: PlaceType,
        latitude: float,
        longitude: float,
) -> List[Place]:
    types_list = place_type_binding.get(place_type, None)

    if types_list is None:
        raise HTTPException(status_code=400, detail="Invalid place type")
    else:
        return get_places_by_type(types_list, longitude=longitude, latitude=latitude)
