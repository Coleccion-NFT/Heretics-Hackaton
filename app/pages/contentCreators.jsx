import React, { createFactory } from "react"

import { Carousel } from "../components"

import contentCreator from "../public/contentCreator"

const ContentCreators = () => {
    return (
        <div className="w-full h-screen flex flex-col pl-8 pr-8 py-14">
            <div className="text-black font-bold text-4xl mb-8">Creadores de Contenido</div>
            <div className="bg-gray-100 rounded-lg w-full h-fit">
                <Carousel content={contentCreator} />
            </div>
        </div>
    )
}

export default ContentCreators
