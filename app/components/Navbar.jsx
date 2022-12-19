import Link from "next/link"
import React from "react"

import NavItems from "../public/Navitems"

import HouseLogo from "../public/carpetaLogoSvg/houseLogo.svg"

const logo = "https://t9h7n3i5.stackpathcdn.com/wp-content/uploads/2020/10/HERETICS.png"

export const Navbar = () => {
    return (
        <div className="flex flex-col h-screen items-center justify-start py-4 pl-1.5">
            <div className="flex h-auto w-32 items-center justify-center">
                <img className="h-full w-auto block" src={logo} alt="Heretics Logo" />
            </div>
            <div className="flex flex-col h-5/6 items-center justify-evenly">
                {NavItems.navitems.map((navitem) => (
                    <div className="block w-full" key={navitem.id}>
                        <Link
                            href="#"
                            className="block focus:border-2 text-xs tracking-wider text-black focus:font-semibold focus:bg-black focus:text-white border-2 border-white border-solid hover:border-amber-500 px-3 py-3 rounded-xl"
                        >
                            {navitem.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Navbar
