import React, { createFactory } from "react"

import Creators from "../public/Creators"

const ContentCreators = () => {
    return (
        <div className="flex flex-col">
            <div className="text-black font-bold text-2xl mb-8">Creadores de Contenido</div>
            <div className="flex flex-wrap items-center justify-center">
                {Creators.creators.map((creator) => (
                    <div
                        className="flex flex-col items-center justify-center p-4 w-1/5 border-2 border-amber-500 mx-3 my-2 rounded-md"
                        key={creator.id}
                    >
                        <div>
                            <img
                                className="block h-20 w-auto rounded-md"
                                src={creator.img}
                                alt="creator img"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            <div className="text-black font-medium my-2">{creator.name}</div>
                            <div className="flex justify-between items-center w-4/5">
                                <a href={creator.socials.instagram}>ig</a>
                                <a href={creator.socials.twitch}>st</a>
                                <a href={creator.socials.twitter}>tw</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContentCreators
