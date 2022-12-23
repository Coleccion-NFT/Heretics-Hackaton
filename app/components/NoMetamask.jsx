import { React, useContext } from "react"

import { Web3Context } from "../context/Web3Context"

import HeroIcon from "./HeroIcon"

const NoMetamask = () => {
    const { connectWallet } = useContext(Web3Context)
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <button
                onClick={async (e) => {
                    await connectWallet()
                }}
                className="group relative flex w-4/5 md:w-2/5 justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
            >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HeroIcon icon={"ArrowTopRightOnSquareIcon"} color="text-black-700" size={5} />
                </span>
                Conéctate a Metamask
            </button>
        </div>
    )
}

export default NoMetamask
