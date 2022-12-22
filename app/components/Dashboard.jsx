import React from "react"

import SponsorsEarnings from "../public/sponsorsEarnings.svg"

import TopCreators from "../public/TopCreators"

export default function Dashboard() {
    return (
        <div className="w-full h-screen flex flex-col pr-4 py-1">
            <div className="text-black font-bold text-2xl sm:text-4xl mb-6">Dashboard</div>
            <div className="flex flex-col justify-start h-full">
                <div className="bg-gray-100 rounded-lg mt-3 px-5 py-4">
                    <div className="text-black font-bold text-lg sm:text-2xl">
                        Ingresos Por patrocinador
                    </div>
                    <SponsorsEarnings className="w-full h-auto" />
                </div>
                <div className="flex flex-col bg-gray-100 rounded-lg mt-4 px-5 py-4">
                    <div className="text-black font-bold text-lg sm:text-2xl mb-6">
                        Top Creadores
                    </div>
                    <div className="flex flex-wrap md:flex-row md:justify-between md:items-center md:px-4">
                        {TopCreators.topCreators.map((topCreator) => (
                            <img
                                className="block h-12 m-2 md:m-0 w-auto rounded-md"
                                src={topCreator.img}
                                alt={topCreator.name}
                                key={topCreator.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
