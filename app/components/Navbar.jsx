import Link from "next/link"
import React from "react"

import NavItems from "../public/Navitems"

export const Navbar = () => {
    return (
        <nav>
            <div class="flex flex-col flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex items-center justify-center">
                    <img
                        class="h-20 w-auto block"
                        src="https://t9h7n3i5.stackpathcdn.com/wp-content/uploads/2020/10/HERETICS.png"
                        alt="Heretics Logo"
                    />
                </div>
                <div class="flex flex-col justify-between">
                    {NavItems.navitems.map((navitem) => (
                        <div class="my-2 w-full focus:border-2 border-solid border-black sm:pl-6">
                            <Link
                                href="#"
                                class="block w-full focus:border-2 text-black focus:bg-black outline-none focus:text-white hover:border-2 hover:border-solid hover:border-amber-500 focus:hover:border-none px-3 py-3 rounded-md text-sm font-medium"
                            >
                                {navitem.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
