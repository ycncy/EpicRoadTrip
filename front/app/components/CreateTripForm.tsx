"use client"
import React from 'react';
import {tripService} from "@/app/lib/service/trip.service";
import {Trip} from "@/app/lib/model/Trip";

class CreateTripForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startLocation: {
                latitude: 34.000,
                longitude: 30.000,
            },
            endLocation: {
                latitude: 34.000,
                longitude: 30.000,
            },
            title: "",
            startDatetime: "",
            endDatetime: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        const trip: Trip = this.state as Trip;
        const response = await tripService.createTrip(trip);
        console.log(response)
        event.preventDefault();
    }


    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="bg-white w-10/12 mx-auto rounded-2xl text-black flex gap-16 py-6 px-8">
                <div className="flex flex-col gap-4 w-full min-h-full">
                    <h1 className="font-extrabold text-lg">Où allez-vous ?</h1>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-2 text-xs font-medium text-gray-900">
                                Ville de départ
                            </label>
                            <input
                                type="text" name="startLocation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#5739FC] focus:border-[#5739FC] block w-full p-2.5"
                                placeholder="Marseille - France" required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-xs font-medium text-gray-900">
                                Ville d'arrivée
                            </label>
                            <input
                                type="text" name="endLocation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-[#5739FC] focus:border-[#5739FC] block w-full p-2.5"
                                placeholder="Paris - France" required
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full min-h-full">
                    <h1 className="font-extrabold text-lg">Quand ? (Optionnel)</h1>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-2 text-xs font-medium text-gray-900">
                                Jour de départ
                            </label>
                            <input
                                value={this.state.startDatetime} onChange={this.handleChange}
                                type="datetime-local" name="startDatetime"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-[#5739FC] focus:border-[#5739FC] block w-full p-2.5"
                                placeholder="Marseille - France" required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-xs font-medium text-gray-900">
                                Jour d'arrivée
                            </label>
                            <input
                                value={this.state.endDatetime} onChange={this.handleChange}
                                type="datetime-local" name="endDatetime"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-[#5739FC] focus:border-[#5739FC] block w-full p-2.5"
                                placeholder="Paris - France" required
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full min-h-full">
                    <h1 className="font-extrabold text-lg">Où allez-vous ?</h1>
                    <div className="flex flex-col h-full justify-between gap-4">
                        <div>
                            <label className="block mb-2 text-xs font-medium text-gray-900">
                                Nom de votre Road Trip
                            </label>
                            <input
                                value={this.state.title} onChange={this.handleChange}
                                type="text" name="title"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-[#5739FC] focus:border-[#5739FC] block w-full p-2.5"
                                placeholder="Paris - Marseille Juin 2025" required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#5739FC] text-md p-2 text-white rounded-xl">
                            Créer votre road-trip !
                        </button>
                    </div>
                </div>
            </form>
        )
    };
}

export default CreateTripForm;