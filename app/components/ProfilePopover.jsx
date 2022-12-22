import React from "react"
import { Popover, Transition } from "@headlessui/react"
import { useContext, useState, useEffect } from "react"
import { Fragment } from "react"

import { FirebaseContext } from "../context/FirebaseContext"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ProfilePopover = () => {
    const { userFirebaseData, loadingFirebaseData } = useContext(FirebaseContext)

    return (
        <div>
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? "" : "text-opacity-90"}`}
                        >
                            <img
                                src={userFirebaseData.photoURL || "./Profile.png"}
                                className="w-10 h-auto rounded-lg mx-4"
                                alt="Pfp Img"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                <div>olawo</div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}

export default ProfilePopover
