import { useContext, useEffect, useState } from "react"
import { CreatorNftContext } from "../../context/CreatorNftContext"
import { Web3Context } from "../../context/Web3Context"

import { toast } from "react-toastify"
import toastConfig from "../../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"

import { Navbar, Sidebar } from "../../components"

import ContentCreators from "../../public/contentCreator"

export default function CreatorProfile({ Creator }) {
    const { checkIfWalletIsConnected, connectWallet, currentAccount } = useContext(Web3Context)
    const { mintNft } = useContext(CreatorNftContext)
    return (
        <div className="flex">
            <div className="w-1/6 h-screen">
                <Navbar />
            </div>
            <div className="w-full lg:w-4/6 h-screen flex flex-col items-center justify-center pl-8 pr-4 py-14">
                <img src={Creator.src} alt={Creator.alt} className="w-52 h-auto my-5 rounded-3xl" />
                <div className="my-5 text-black font-bold text-xl">{Creator.name}</div>
                {currentAccount ? (
                    <button
                        className="bg-black my-5 text-white text-bold py-2 px-10 rounded-xl hover:bg-gray-200 hover:text-black border-2 hover:border-black"
                        onClick={(e) => {
                            e.preventDefault()
                            mintNft(Creator.index)
                        }}
                    >
                        Mint
                    </button>
                ) : (
                    <button
                        className="bg-black my-5 text-white text-bold py-2 px-10 rounded-xl hover:bg-gray-200 hover:text-black border-2 hover:border-black"
                        onClick={(e) => {
                            e.preventDefault()
                            toast.info("Conecta tu wallet para poder mintear", toastConfig)
                        }}
                    >
                        Mint
                    </button>
                )}
                {currentAccount ? (
                    <p>El Nft se enviará a: {currentAccount}</p>
                ) : (
                    <button
                        className="bg-black my-5 text-white text-bold py-2 px-10 rounded-xl hover:bg-gray-200 hover:text-black border-2 hover:border-black"
                        onClick={(e) => {
                            e.preventDefault()
                            connectWallet()
                        }}
                    >
                        Conéctate
                    </button>
                )}
            </div>
            <div className="hidden lg:block lg:w-1/6 h-screen">
                <Sidebar />
            </div>
        </div>
    )
}

export async function getStaticProps({ params }) {
    let contentCreator
    ContentCreators.map((creator) => {
        if (creator.name === params.creatorProfile) {
            contentCreator = creator
        }
    })
    return {
        props: {
            Creator: contentCreator,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: ContentCreators.map((creator) => {
            return {
                params: {
                    creatorProfile: creator.name,
                },
            }
        }),
        fallback: false,
    }
}
