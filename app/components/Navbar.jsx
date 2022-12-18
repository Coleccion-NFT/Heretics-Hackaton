import Link from "next/link"
import React from "react"

import NavItems from "../public/Navitems"

const logo = "https://t9h7n3i5.stackpathcdn.com/wp-content/uploads/2020/10/HERETICS.png"

export const Navbar = () => {
    return (
        <nav className="h-screen">
            <div className="flex flex-col h-full items-center justify-start py-8">
                <div className="flex items-center justify-center">
                    <img className="h-20 w-auto block" src={logo} alt="Heretics Logo" />
                </div>
                <div className="flex flex-col h-full items-center justify-evenly">
                    {NavItems.navitems.map((navitem) => (
                        <div
                            className="my-2 w-full focus:border-2 border-solid border-black"
                            key={navitem.id}
                        >
                            <Link
                                href="#"
                                className="block w-full focus:border-2 text-black focus:bg-black outline-none focus:text-white hover:border-2 hover:border-solid hover:border-amber-500 focus:hover:border-none px-3 py-3 rounded-md text-sm font-medium"
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
