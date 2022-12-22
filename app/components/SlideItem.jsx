import React, { useContext } from "react"
import Link from "next/link"
import { Slide } from "pure-react-carousel"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../backend/firebase"
import "pure-react-carousel/dist/react-carousel.es.css"
import { useRouter } from "next/router"

const SlideItem = ({ index, src, alt, h3, name }) => {
    const router = useRouter()
    return (
        <>
            <Slide index={index || 0}>
                <Link
                    href={`/contentcreators/${name}`}
                    className="flex flex-shrink-0 relative w-full sm:w-auto"
                >
                    <img
                        src={src || "undefined"}
                        alt={alt || "Slide image for the slider carousel"}
                        className="object-cover object-center w-full"
                    />
                    <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                        <div className="flex h-full items-end pb-6 relative">
                            <h3 className="text-xl lg:text-2xl font-semibold w-1/2 leading-5 lg:leading-6 text-white">
                                {h3 || ""}
                            </h3>
                        </div>
                    </div>
                </Link>
            </Slide>
        </>
    )
}

export default SlideItem
