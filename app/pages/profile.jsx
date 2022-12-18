import React from "react"

import { Navbar } from "../components"

import DefaultPfp from "../public/defaultPfp.svg"
import YoutubeViewsGraph from "../public/youtubeViewsGraph.svg"
import ColaborationGraph from "../public/colaborationGraph.svg"

import Sponsors from "../public/Sponsors"

const Profile = () => {
    return (
        <div className="flex">
            <div className="w-1/6 h-full">
                <Navbar />
            </div>
            <div className="w-4/6 h-screen flex flex-col justify-between py-14">
                <div className="text-black font-bold text-2xl mb-8">FICHA PERSONAL</div>
                <div className="flex flex-row w-full items-center bg-gray-100 rounded-lg mt-3 px-5 py-4">
                    <DefaultPfp className="w-40 h-auto" />
                    <div className="flex flex-col">
                        <div>Nombre</div>
                        <div>Correo@correo.com</div>
                        <div>Public key</div>
                    </div>
                </div>
                <div className="flex flex-col h-full bg-gray-100 rounded-lg mt-3 px-5 py-4">
                    <div className="text-black font-bold text-xl mb-6">
                        Marcas con las que he colaborado
                    </div>
                    <div className="flex flex-row justify-between items-center px-4">
                        {Sponsors.sponsors.map((sponsor) => (
                            <img
                                className="block h-20 w-auto rounded-md"
                                src={sponsor.img}
                                alt={sponsor.name}
                                key={sponsor.id}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-row justify-around h-full bg-gray-100 rounded-lg mt-3 px-5 py-4">
                    <YoutubeViewsGraph className="w-68 h-68" />
                    <ColaborationGraph className="w-68 h-68" />
                </div>
            </div>
        </div>
    )
}

export default Profile
