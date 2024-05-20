import Navbar from "@/app/components/Navbar";
import SavedTrips from "@/app/components/SavedTrips/SavedTrips";

export default function SavedTripsPage( {params} : { params: { userId: string } }
) {
    return <div>
        <Navbar />
        <SavedTrips  userId={params.userId}/>
    </div>
}