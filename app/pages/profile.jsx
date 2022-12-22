import { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import { FirebaseContext } from "../context/FirebaseContext"

import { toast } from "react-toastify"
import toastConfig from "../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"

import { Navbar, Loader, Sidebar } from "../components"
import { LockClosedIcon } from "@heroicons/react/20/solid"

import DefaultPfp from "../public/defaultPfp.svg"
import YoutubeViewsGraph from "../public/youtubeViewsGraph.svg"
import ColaborationGraph from "../public/colaborationGraph.svg"

import Sponsors from "../public/Sponsors"

const Profile = () => {
    const { userFirebaseData, loadingFirebaseData, errorFirebaseData, getUserData } =
        useContext(FirebaseContext)

    const [profileData, setProfileData] = useState({
        displayName: "",
        email: "",
        profileImageUrl: "",
        publicAddress: "",
    })

    const router = useRouter()

    useEffect(() => {
        try {
            // Anonymus function
            ;(async () => {
                if (userFirebaseData) {
                    // Get the data
                    let userData = (await getUserData(userFirebaseData.uid))[0].data
                    let newData = {}
                    for (const key in profileData) {
                        newData = { ...newData, [key]: userData[key] }
                    }
                    // Set the data
                    setProfileData(newData)
                }
            })()
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error("Ha habido un error cargando el perfil", toastConfig)
        }
    }, [userFirebaseData])

    return (
        <>
            {loadingFirebaseData ? (
                <div className="w-4/6 h-screen">
                    <div className="h-1/3 w-full hidden items-center justify-center sm:flex">
                        <Loader h={24} w={24} />
                    </div>
                </div>
            ) : userFirebaseData ? (
                <div className="w-full h-screen flex flex-col justify-start pl-8 pr-8 py-14">
                    <div className="text-black font-bold text-4xl mb-4">Ficha Personal</div>
                    <div className="flex flex-col lg:flex-row w-full h-fit justify-between items-center bg-gray-100 rounded-lg mt-3 px-5 py-4">
                        {profileData.profileImageUrl === "undefined" ? (
                            <DefaultPfp className="w-auto h-40 lg:h-full lg:max-h-40 xl:max-h-56 rounded-xl mx-4" />
                        ) : (
                            <img
                                src={profileData.profileImageUrl}
                                className="w-auto h-40 lg:h-full lg:max-h-40 xl:max-h-56 rounded-xl mx-4"
                                alt="Pfp Img"
                            />
                        )}
                        <div className="flex flex-col pl-2 py-8">
                            <div className="text-black font-bold text-lg sm:text-2xl md:text-3xl">
                                {profileData.displayName}
                            </div>
                            <div className="my-2 xl:my-6 text-black font-normal text-sm sm:text-lg md:text-xl">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the 1500s, when an unknown printer took a galley of type
                                and scrambled it to make a type specimen book.
                            </div>
                            <div className="text-black font-normal text-sm sm:text-lg md:text-xl">
                                {profileData.publicAddress}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-gray-100 rounded-lg mt-4 px-5 py-4">
                        <div className="text-black font-bold text-2xl mb-6">
                            Marcas con las que he colaborado
                        </div>
                        <div className="flex flex-wrap sm:flex-row sm:justify-between items-center px-4">
                            {Sponsors.sponsors.map((sponsor) => (
                                <div className="w-16 h-auto rounded-lg bg-gray-200 m-1 sm:m-0 p-2">
                                    <Image
                                        src={sponsor.img}
                                        alt={sponsor.name}
                                        key={sponsor.id}
                                        className="w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap md:flex-row justify-around h-fit bg-gray-100 rounded-lg mt-4 px-5 pb-4">
                        <YoutubeViewsGraph className="w-96 h-auto" />
                        <ColaborationGraph className="w-96 h-auto" />
                    </div>
                </div>
            ) : (
                <div className="w-full h-screen flex flex-col items-center justify-center pl-8 pr-4 py-32">
                    <div className="w-4/5 md:w-2/5 flex flex-col justify-center">
                        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-black">
                            Ups... Parece que no tienes cuenta
                        </h2>
                        <div>
                            <button
                                onClick={() => {
                                    router.push("/signin")
                                }}
                                className="mb-6 group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-white group-hover:text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                                Sign in
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    router.push("/signup")
                                }}
                                className="mb-6 group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-white group-hover:text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile
