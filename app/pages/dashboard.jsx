import React from "react"

import { Navbar } from "../components"

import SponsorsEarnings from "../public/sponsorsEarnings.svg"

import TopCreators from "../public/TopCreators"

const dashboard = () => {
    return (
        <div className="flex h-full">
            <div className="w-1/6 h-full">
                <Navbar />
            </div>
            <div className="w-4/6 h-screen flex flex-col justify-start py-14">
                <div className="text-black font-bold text-2xl mb-8">DASHBOARD</div>
                <div className="flex flex-col justify-start h-full">
                    <div className="bg-gray-100 rounded-lg mt-3 px-5 py-4">
                        <div className="text-black font-bold text-xl mb-8">
                            Ingresos Por patrocinador
                        </div>
                        <SponsorsEarnings className="w-full h-auto" />
                    </div>
                    <div className="flex flex-col bg-gray-100 rounded-lg mt-3 px-5 py-4">
                        <div className="text-black font-bold text-xl mb-8">Top Creadores</div>
                        <div className="flex flex-row justify-between items-center px-4">
                            {TopCreators.topCreators.map((topCreator) => (
                                <img
                                    className="block h-12 w-auto rounded-md"
                                    src={topCreator.img}
                                    alt={topCreator.name}
                                    key={topCreator.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboard
