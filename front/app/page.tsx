import CreateTripForm from "@/app/components/CreateTripForm";
import React from "react";
import FetchTripForm from "@/app/components/FetchTripForm";

export default function Home() {
    return (
        <div className="bg-[#5739FC] flex flex-col gap-12 min-h-screen p-16">
            <div className="w-2/5 flex flex-col gap-4">
                <h1 className="font-extrabold text-5xl">
                    Epic Road Trip
                </h1>
                <p className="text-lg">
                    Vivez l'aventure de vos rêves avec un clic ! Notre application transforme vos envies en réalité :
                    choisissez, détendez-vous et profitez. Planification sans effort, plaisir maximal. Prêt à explorer ?
                </p>
            </div>
            <CreateTripForm/>
            <hr className="w-11/12 mx-auto h-0.5 border-t-0 bg-white"/>
            <FetchTripForm/>
        </div>
    );
}
