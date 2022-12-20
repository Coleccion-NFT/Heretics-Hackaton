import React, { createFactory } from "react"

import { Navbar, Carousel, Sidebar } from "../components"

import contentCreator from "../public/contentCreator"

const ContentCreators = () => {
    return (
        <div className="flex">
            <div className="w-1/6 h-screen">
                <Navbar />
            </div>
            <div className="w-full lg:w-4/6 h-screen flex flex-col justify-between pl-8 pr-4 py-14">
                <div className="text-black font-bold text-2xl mb-8">Creadores de Contenido</div>
                <div className="bg-gray-100 w-full h-full">
                    <Carousel content={contentCreator} />
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/6 h-screen">
                <Sidebar />
            </div>
        </div>
    )
}

export default ContentCreators
