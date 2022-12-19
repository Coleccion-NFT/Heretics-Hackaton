import React, { createFactory } from "react"

import { Navbar, Carousel } from "../components"

import contentCreator from "../public/contentCreator"

const ContentCreators = () => {
    return (
        <div className="flex">
            <div className="w-56 h-screen">
                <Navbar />
            </div>
            <div className="w-4/6 h-screen flex flex-col justify-between py-14">
                <div className="text-black font-bold text-2xl mb-8">Creadores de Contenido</div>
                <div className="bg-gray-100 w-full h-full">
                    <Carousel content={contentCreator} />
                </div>
            </div>
        </div>
    )
}

export default ContentCreators
