import React from "react"
import Link from "next/link"
import { useContext, useState, useEffect } from "react"

import { FirebaseContext } from "../context/FirebaseContext"
import { DAOContext } from "../context/DAOContext"
import { Web3Context } from "../context/Web3Context"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Loader from "./Loader"
import HeroIcon from "./HeroIcon"
import ProfilePopover from "./ProfilePopover"

const DaoSidebar = () => {
    const { userFirebaseData, loadingFirebaseData, errorFirebaseData, getUserData } =
        useContext(FirebaseContext)
    const {
        createPropose,
        checkProposalStatus,
        updateProposalStatus,
        updateStoreValue,
        getVotingInfo,
        delegateTokensTo,
        transferTokensTo,
    } = useContext(DAOContext)
    const { checkIfWalletIsConnected, connectWallet, currentAccount } = useContext(Web3Context)

    const [voteData, setVoteData] = useState({ delegates: "", votesAmount: "", votesBalance: "" })

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
            <div className="flex flex-col h-full mt-4">
                <div className="flex flex-col bg-gray-100 rounded-lg px-5 py-3 mb-4">
                    <button
                        className="text-white font-semibold text-base bg-amber-500 rounded-xl py-1 my-2"
                        type="button"
                        onClick={async (e) => {
                            e.preventDefault()
                            let votingData = await getVotingInfo(currentAccount)
                            setVoteData(votingData)
                            console.log(votingData)
                        }}
                    >
                        Obtener tu vote data
                    </button>
                    <div className="my-1">
                        <div className="text-black font-medium text-sm mb-1">Delegado</div>
                        <input
                            id="delegates"
                            name="delegates"
                            type="text"
                            required
                            className="text-black px-3 py-1 font-light text-sm bg-gray-300 rounded-lg"
                            value={voteData.delegates}
                            readOnly
                        ></input>
                    </div>
                    <div className="my-1">
                        <div className="flex flex-row mb-1 items-end">
                            <div className="text-black font-medium text-sm">
                                Cantidad de votos delegeados en ti
                            </div>
                            <div className="text-black font-extralight text-xs">
                                Sobre 1.000.000
                            </div>
                        </div>
                        <input
                            id="delegates"
                            name="delegates"
                            type="text"
                            required
                            className="text-black px-3 py-1 font-light text-sm bg-gray-300 rounded-lg"
                            value={voteData.votesAmount / 1e18}
                            readOnly
                        ></input>
                    </div>
                    <div className="my-1">
                        <div className="flex flex-row mb-1 items-end">
                            <div className="text-black font-medium text-sm">
                                Cantidad de votos que posees
                            </div>
                            <div className="text-black font-extralight text-xs">
                                Sobre 1.000.000
                            </div>
                        </div>
                        <input
                            id="delegates"
                            name="delegates"
                            type="text"
                            required
                            className="text-black px-3 py-1 font-light text-sm bg-gray-300 rounded-lg"
                            value={voteData.votesBalance / 1e18}
                            readOnly
                        ></input>
                    </div>
                    <div className="my-1">
                        <div className="text-black font-medium text-sm mb-1">Delegar votos a</div>
                        <div className="text-black px-3 py-1 font-light text-sm bg-gray-300 rounded-lg">
                            jkgdnbv5v4d5v5
                        </div>
                    </div>
                    <button className="text-white font-semibold text-base bg-amber-500 rounded-xl py-1 my-2">
                        Delegar votos
                    </button>
                    <div className="my-1">
                        <div className="text-black font-medium text-sm mb-1">
                            Transferir tokens a
                        </div>
                        <div className="text-black px-3 py-1 font-light text-sm bg-gray-300 rounded-lg">
                            jkgdnbv5v4d5v5
                        </div>
                    </div>
                    <div className="my-1">
                        <div className="text-black font-medium text-sm mb-1">
                            Cantidad de tokens a transferir
                        </div>
                        <div className="text-black px-3 py-1 font-light text-sm bg-gray-300 rounded-lg">
                            jkgdnbv5v4d5v5
                        </div>
                    </div>
                    <button className="text-white font-semibold text-base bg-amber-500 rounded-xl py-1 my-2">
                        Delegar votos
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DaoSidebar