import Link from "next/link"
import { React } from "react"
import { useRouter } from "next/router"

import NavItems from "../public/Navitems"
import HeroIcon from "./HeroIcon"

const logo = "./HereticsLogo.png"

export const Navbar = () => {
    const router = useRouter()

    return (
        <div className="flex flex-col h-screen lg:w-60 items-center lg:items-start justify-start py-4 px-4 shadow-2xl">
            <div className="flex h-auto w-full items-center justify-center">
                <img className="sm:h-full sm:w-16 block" src={logo} alt="Heretics Logo" />
            </div>
            <div className="flex flex-col h-5/6 justify-evenly">
                {NavItems.navitems.map((navitem) => (
                    <div className="block w-full" key={navitem.id}>
                        <Link
                            href={`/${navitem.path}`}
                            className="md:hidden group block relative focus:border-black text-xs tracking-wider hover:border-amber-500 text-black focus:font-semibold focus:bg-black focus:text-white border-2 border-white border-solid pl-2 pr-2 py-2 rounded-xl"
                        >
                            <span className="flex items-center">
                                <HeroIcon icon={navitem.logo} color="text-black-700" size={5} />
                            </span>
                        </Link>
                        <Link
                            href={`/${navitem.path}`}
                            className={`${
                                router.pathname === `/${navitem.path}`
                                    ? "border-black bg-black font-semibold text-white"
                                    : ""
                            } hidden group md:flex sm:flex-row relative focus:border-black text-xs tracking-wide hover:border-amber-500 focus:font-semibold focus:bg-black focus:text-white border-2 border-white border-solid pl-10 pr-3 py-3 rounded-xl`}
                        >
                            <span
                                className={`${
                                    router.pathname === `/${navitem.path}` ? "bg-black" : ""
                                } hidden lg:block absolute inset-y-0 -left-8 w-4 h-auto rounded-r-md group-focus:bg-black`}
                            ></span>
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
