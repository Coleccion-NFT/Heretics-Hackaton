import { useContext, useState, useEffect } from "react"
import React from "react"
import Link from "next/link"
import Image from "next/image"

import { FirebaseContext } from "../context/FirebaseContext"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Loader from "./Loader"
import HeroIcon from "./HeroIcon"
import ProfilePopover from "./ProfilePopover"

import UpcomingMeetings from "../public/UpcomingMeetings"
import LastColaborations from "../public/LastColaborations"

const logo = "./HereticsLogo.png"

const Sidebar = () => {
    const { userFirebaseData, loadingFirebaseData, errorFirebaseData, getUserData } =
        useContext(FirebaseContext)

    return (
        <div className="h-screen flex flex-col pr-2">
            <div className="flex flex-row items-center pt-5">
                {loadingFirebaseData ? (
                    <div className="w-full">
                        <div className="h-1/6 w-full hidden items-center justify-center sm:flex">
                            <Loader h={4} w={4} />
                        </div>
                    </div>
                ) : userFirebaseData ? (
                    <div className="flex flex-row w-full text-center justify-end">
                        <div className="flex felx-col items-center justify-center bg-black w-10 h-10 rounded-lg">
                            <HeroIcon icon={"BellIcon"} color="text-white" size={5} />
                        </div>
                        <ProfilePopover />
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex felx-col items-center justify-center bg-amber-500 rounded-lg px-2">
                                <div className="font-medium text-xs">Creador</div>
                            </div>
                            <div className="font-semibold text-sm">
                                {userFirebaseData.displayName}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row w-full items-center text-center justify-end pr-8">
                        <div className="mx-2">
                            <Link
                                href="/signin"
                                className="group relative flex w-full justify-center rounded-md border border-transparent text-white bg-amber-500 py-1 px-2 text-sm font-medium hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                            >
                                Sign in
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/signup"
                                className="group relative flex w-full justify-center rounded-md border border-transparent text-white bg-amber-500 py-1 px-2 text-sm font-medium hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col h-full mt-16">
                <div className="flex flex-col bg-gray-100 rounded-lg px-5 py-4 mb-4">
                    <div className="text-black font-normal text-base">Proximas reuniones</div>
                    <div className="flex flex-col justify-evenly">
                        {/* Aqu?? podira ir un script que mire upcoming meetings y ense??e las 3 mas cercanas */}
                        <div className="text-black font-medium text-sm text-opacity-50">
                            Enero 10 2023
                        </div>
                        {UpcomingMeetings.upcomingMeetings.map((meetings, index) => (
                            <div
                                key={index}
                                className="flex flex-row w-full items-center justify-start my-1"
                            >
                                <div className="text-black font-medium text-base w-1/4">
                                    {meetings.time}
                                </div>
                                <span className="w-1 h-full rounded-lg bg-amber-500 mx-1"></span>
                                <div className="flex flex-col">
                                    <div className="text-black md:font-medium text-xs text-opacity-50">
                                        {meetings.job}
                                    </div>
                                    <div className="text-black font-medium text-xs">
                                        {meetings.topic}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col bg-gray-100 rounded-lg px-5 py-4">
                    <div className="text-black font-normal text-base">Colaboraciones</div>
                    <div className="flex flex-col">
                        {LastColaborations.lastColaborations.map((colaboration, index) => (
                            <div
                                key={index}
                                className="flex flex-row w-full items-center justify-start my-1"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gray-200 mr-2 flex items-center justify-center">
                                    <Image src={colaboration.img} alt="Colab" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-black font-medium text-xs">
                                        {colaboration.brand}
                                    </div>
                                    <div className="text-black md:font-medium text-xs text-opacity-50">
                                        {colaboration.campaign}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
