import SavedTrips from "../../components/SavedTrips/SavedTrips";

export async function SavedTripsPage({ params }: { params: { id: string } }) {

    return (

        <div>
            <SavedTrips userId = 'a'/>

        </div>
    )
    
}