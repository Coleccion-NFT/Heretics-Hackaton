import Link from "next/link"
import React from "react"

import NavItems from "./NavItems"

export const Navbar = () => {
    return (
        <nav>
            <div class="flex flex-col flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex flex-shrink-0 items-center justify-center">
                    <img
                        class="hidden h-20 w-auto lg:block"
                        src="https://t9h7n3i5.stackpathcdn.com/wp-content/uploads/2020/10/HERETICS.png"
                        alt="Heretics Logo"
                    />
                </div>
                <div class="hidden sm:ml-6 sm:block">
                    <div class="flex flex-col justify-content-between">
                        {NavItems.navitems.map((navitem) => (
                            <Link
                                href="#"
                                class="text-black focus:bg-black focus:outline-none focus:text-white hover:border-2 border-solid hover:border-yellow-600 focus:hover:border-none px-3 py-3 rounded-md text-sm font-medium"
                            >
                                {navitem.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
