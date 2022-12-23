import { useContext, useEffect, useState } from "react"
import { CreatorNftContext } from "../../context/CreatorNftContext"
import { Web3Context } from "../../context/Web3Context"

import { toast } from "react-toastify"
import toastConfig from "../../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"

import ContentCreators from "../../public/contentCreator"

export default function CreatorProfile({ Creator }) {
    const { checkIfWalletIsConnected, connectWallet, currentAccount } = useContext(Web3Context)
    const { mintNft } = useContext(CreatorNftContext)

    useEffect(() => {
        // Anonymus function
        ;(async () => {
            await checkIfWalletIsConnected()
        })()
    }, [currentAccount])

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center pl-8 pr-4 py-14">
            <img src={Creator.src} alt={Creator.alt} className="w-52 h-auto my-5 rounded-3xl" />
            <div className="my-5 text-black font-bold text-xl">{Creator.name}</div>
            {currentAccount ? (
                <button
                    className="bg-black text-white px-9 py-1.5 my-5 w-80 text-center"
                    type="button"
                    onClick={async (e) => {
                        e.preventDefault()
                        mintNft(Creator.index)
                    }}
                >
                    Mint
                </button>
            ) : (
                <button
                    className="bg-black text-white px-9 py-1.5 my-5 w-80 text-center"
                    type="button"
                    onClick={async (e) => {
                        e.preventDefault()
                        await connectWallet()
                    }}
                >
                    Conéctate a Metamask
                </button>
            )}
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
