import Link from "next/link"
import React from "react"

import NavItems from "../public/Navitems"
import HeroIcon from "./HeroIcon"

const logo = "https://t9h7n3i5.stackpathcdn.com/wp-content/uploads/2020/10/HERETICS.png"

export const Navbar = () => {
    return (
        <div className="flex flex-col h-screen items-center justify-start py-4 pl-5 pr-4 shadow-2xl">
            <div className="flex h-auto w-32 items-center justify-center">
                <img className="w-8 h-8 sm:h-full sm:w-auto block" src={logo} alt="Heretics Logo" />
            </div>
            <div className="flex flex-col h-5/6 justify-evenly">
                {NavItems.navitems.map((navitem) => (
                    <div className="block w-full" key={navitem.id}>
                        <Link
                            href="#"
                            className="sm:hidden group block relative focus:border-2 focus:border-black text-xs tracking-wider hover:border-amber-500 text-black focus:font-semibold focus:bg-black focus:text-white border-2 border-white border-solid pl-2 pr-2 py-2 rounded-xl"
                        >
                            <span className="flex items-center">
                                <HeroIcon icon={navitem.logo} color="text-black-700" size={5} />
                            </span>
                        </Link>
                        <Link
                            href="#"
                            className="hidden group sm:block relative focus:border-2 focus:border-black text-xs tracking-wider hover:border-amber-500 text-black focus:font-semibold focus:bg-black focus:text-white border-2 border-white border-solid pl-10 pr-3 py-3 rounded-xl"
                        >
                            <span className="absolute inset-y-0 -left-8 w-4 h-auto rounded-r-md group-focus:bg-black"></span>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <HeroIcon icon={navitem.logo} color="text-black-700" size={5} />
                            </span>
                            {navitem.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Navbar
