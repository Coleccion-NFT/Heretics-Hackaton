import React from "react"
import Link from "next/link"
import { Popover, Transition } from "@headlessui/react"
import { useContext, useState, useEffect } from "react"
import { Fragment } from "react"

import { FirebaseContext } from "../context/FirebaseContext"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import HeroIcon from "./HeroIcon"

const popoverItems = [
    {
        id: 0,
        name: "Perfil",
        href: "/profile",
        icon: "UserIcon",
    },
    {
        id: 1,
        name: "Mis Nfts",
        href: "/mynfts",
        icon: "WalletIcon",
    },
    {
        id: 2,
        name: "Log out",
        href: "undefined",
        icon: "ArrowRightOnRectangleIcon",
    },
]

const ProfilePopover = () => {
    const { userFirebaseData, loadingFirebaseData, handleSignOut } = useContext(FirebaseContext)

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
                            <Popover.Panel className="absolute w-fit z-10 mt-1 -translate-x-1/2 transform px-4 sm:px-0">
                                <div className="overflow-hidden w-full rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative flex flex-col justify-start items-start bg-white py-2 px-4">
                                        {popoverItems.map((item) =>
                                            item.href === "undefined" ? (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        handleSignOut()
                                                    }}
                                                    className="flex w-full justify-start items-center rounded-lg transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                >
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-black sm:h-12 sm:w-12">
                                                        <HeroIcon
                                                            icon={item.icon}
                                                            color="text-black-700"
                                                            size={5}
                                                        />
                                                    </div>
                                                    <div className="pr-3 w-max">
                                                        <p className="text-sm font-medium text-black">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                </button>
                                            ) : (
                                                <Link
                                                    key={item.id}
                                                    href={item.href}
                                                    className="flex w-full justify-start items-center rounded-lg transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                >
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-black sm:h-12 sm:w-12">
                                                        <HeroIcon
                                                            icon={item.icon}
                                                            color="text-black-700"
                                                            size={5}
                                                        />
                                                    </div>
                                                    <div className="pr-3 w-max">
                                                        <p className="text-sm font-medium text-black">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}

export default ProfilePopover
