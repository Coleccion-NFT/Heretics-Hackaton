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
    const { updateStoreValue, getVotingInfo, delegateTokensTo, transferTokensTo } =
        useContext(DAOContext)
    const { checkIfWalletIsConnected, connectWallet, currentAccount } = useContext(Web3Context)

    useEffect(() => {
        checkIfWalletIsConnected()

        if (currentAccount) {
            ;(async () => {
                let votingData = await getVotingInfo(currentAccount)
                setVoteData(votingData)
                let newValue = await updateStoreValue()
                setStoreValue(newValue)
            })()
        }
    }, [currentAccount])

    const [voteData, setVoteData] = useState({ delegates: "", votesAmount: "", votesBalance: "" })
    const [delegateTo, setDelegateTo] = useState("")
    const [transferTo, setTransferTo] = useState("")
    const [transferAmount, setTransferAmount] = useState(0)
    const [storeValue, setStoreValue] = useState(0)

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
                    <div className="flex flex-row w-full items-center text-center justify-end pr-8">
                        <div className="mx-2">
                            <Link
                                href="/signin"
                                className="group relative flex w-full justify-center rounded-md border border-transparent text-white bg-amber-500 py-1 px-2 text-sm font-medium hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                            >
                                Sign in
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/signup"
                                className="group relative flex w-full justify-center rounded-md border border-transparent text-white bg-amber-500 py-1 px-2 text-sm font-medium hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <div className={`flex flex-col ${currentAccount ? "block" : "hidden"} h-full mt-5`}>
                <div className="flex flex-col justify-evenly bg-gray-100 rounded-lg px-5 py-3 mb-4">
                    <div className="text-white font-semibold text-sm bg-amber-500 rounded-xl py-1 my-2 text-center">
                        Tu información de voto
                    </div>
                    <div className="my-1">
                        <div className="text-black font-medium text-xs mb-1">Tu delegado</div>
                        <input
                            id="delegates"
                            name="delegates"
                            type="text"
                            required
                            className="text-black w-full px-3 py-1 font-light text-xs bg-gray-300 rounded-lg"
                            value={voteData.delegates}
                            readOnly
                        ></input>
                    </div>
                    <div className="my-1">
                        <div className="flex flex-row mb-1 items-end justify-between">
                            <div className="text-black font-medium text-xs w-7/12">
                                Cantidad de votos delegeados en ti
                            </div>
                            <div className="text-black font-extralight text-xs w-3/12">
                                {(voteData.votesAmount / 1e18 / 1e6) * 100}% de los votos
                            </div>
                        </div>
                        <input
                            id="delegates"
                            name="delegates"
                            type="text"
                            required
                            className="text-black w-full px-3 py-1 font-light text-xs bg-gray-300 rounded-lg"
                            value={voteData.votesAmount / 1e18}
                            readOnly
                        ></input>
                    </div>
                    <div className="my-1">
                        <div className="flex flex-row mb-1 items-end justify-between">
                            <div className="text-black font-medium text-xs w-7/12">
                                Cantidad de votos que posees
                            </div>
                            <div className="text-black font-extralight text-xs w-3/12">
                                {(voteData.votesBalance / 1e18 / 1e6) * 100}% de los votos
                            </div>
                        </div>
                        <input
                            id="delegates"
                            name="delegates"
                            type="text"
                            required
                            className="text-black w-full px-3 py-1 font-light text-xs bg-gray-300 rounded-lg"
                            value={voteData.votesBalance / 1e18}
                            readOnly
                        ></input>
                    </div>

                    <hr className="mt-3 mb-2"></hr>

                    <div className="my-1">
                        <div className="text-black font-medium text-xs mb-1">
                            Delegar tus votos a
                        </div>
                        <input
                            id="delegateTo"
                            name="delegateTo"
                            type="text"
                            required
                            className="text-black w-full px-3 py-1 font-light text-xs bg-gray-300 rounded-lg"
                            value={delegateTo}
                            onChange={(e) => {
                                setDelegateTo(e.target.value)
                            }}
                        ></input>
                    </div>
                    <button
                        className="text-white font-semibold text-sm bg-amber-500 hover:bg-black rounded-xl py-1 my-2"
                        type="button"
                        onClick={async (e) => {
                            e.preventDefault()
                            if (
                                confirm(
                                    `Estás seguro de que quieres delegar tus ${
                                        voteData.votesBalance / 1e18
                                    } votos a ${delegateTo}?`
                                )
                            ) {
                                await delegateTokensTo(delegateTo)
                            }
                        }}
                    >
                        Delegar votos
                    </button>

                    <hr className="mt-3 mb-2"></hr>

                    <div className="my-1">
                        <div className="text-black w-full font-medium text-xs mb-1">
                            Transferir tus tokens a
                        </div>
                        <input
                            id="transferTo"
                            name="transferTo"
                            type="text"
                            required
                            className="text-black w-full px-3 py-1 font-light text-xs bg-gray-300 rounded-lg"
                            value={transferTo}
                            onChange={(e) => {
                                setTransferTo(e.target.value)
                            }}
                        ></input>
                    </div>
                    <div className="my-1">
                        <div className="text-black font-medium text-xs mb-1">
                            Cantidad de tokens a transferir
                        </div>
                        <input
                            id="transferAmount"
                            name="transferAmount"
                            type="number"
                            required
                            className="text-black w-full px-3 py-1 font-light text-xs bg-gray-300 rounded-lg"
                            value={transferAmount}
                            onChange={(e) => {
                                setTransferAmount(e.target.value)
                            }}
                        ></input>
                    </div>
                    <button
                        className="text-white font-semibold text-sm bg-amber-500 hover:bg-black rounded-xl py-1 my-2"
                        type="button"
                        onClick={async (e) => {
                            e.preventDefault()
                            if (
                                confirm(
                                    `Estás seguro de que quieres transferir ${transferAmount} tokens a ${transferTo}`
                                )
                            ) {
                                await transferTokensTo(transferTo, transferAmount)
                            }
                        }}
                    >
                        Transferir tokens
                    </button>

                    <hr className="mt-3 mb-2"></hr>
                    <div className="my-1">
                        <div className="text-black font-medium text-xs mb-1">Valor de la store</div>
                        <input
                            id="delegates"
                            name="delegates"
                            type="text"
                            required
                            className="text-black w-full px-3 py-1 font-light text-xs bg-gray-300 rounded-lg"
                            value={storeValue}
                            readOnly
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DaoSidebar
