import React from "react"
import Link from "next/link"
import { useContext, useState, useEffect } from "react"

import { FirebaseContext } from "../context/FirebaseContext"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Loader from "./Loader"
import HeroIcon from "./HeroIcon"
import ProfilePopover from "./ProfilePopover"

const DaoSidebar = () => {
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
                    <div className="flex flex-row w-full text-center justify-end">
                        <div className="mx-2">
                            <Link
                                href="/signin"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-200 py-1 px-2 text-xs font-medium text-black hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                            >
                                Sign in
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/signup"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-200 py-1 px-2 text-xs font-medium text-black hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col h-full mt-16">
                <div className="flex flex-col bg-gray-100 rounded-lg px-5 py-4 mb-4"></div>
            </div>
        </div>
    )
}

export default DaoSidebar
