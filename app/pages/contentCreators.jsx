import React, { createFactory } from "react"

import Creators from "../public/Creators"

const ContentCreators = () => {
    return (
        <div class="flex flex-col">
            <div class="text-black font-medium text-2xl mb-8">Creadores de Contenido</div>
            <div class="flex flex-wrap items-center justify-center">
                {Creators.creators.map((creator) => (
                    <div class="flex flex-col items-center justify-center p-4 w-1/5 border-2 border-amber-500 mx-3 my-2 rounded-md">
                        <div>
                            <img
                                class="block h-20 w-auto rounded-md"
                                src={creator.img}
                                alt="Heretics Logo"
                            />
                        </div>
                        <div class="flex flex-col items-center justify-center w-full">
                            <div class="text-black font-medium my-2">{creator.name}</div>
                            <div class="flex justify-between items-center w-4/5">
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
