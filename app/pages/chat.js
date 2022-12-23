import { useEffect, useContext, useState } from "react"
import Link from "next/link"
import { Loader, ChatMessage } from "../components"
// TODO: Que vaya el fetching de nfts en la binance smartchain

import { useCollection } from "react-firebase-hooks/firestore"
import { setDoc } from "firebase/firestore"

import { FirebaseContext } from "../context/FirebaseContext"
import { Web3Context } from "../context/Web3Context"

import contractAddressJSON from "../constants/networkMapping.json"

import { toast } from "react-toastify"
import toastConfig from "../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"
const logo = "./HereticsLogo.png"

export default function Chat() {
    const { handleSignOut, userFirebaseData, loadingFirebaseData, auth, db, collection, doc } =
        useContext(FirebaseContext)
    const { checkIfWalletIsConnected, connectWallet, currentAccount } = useContext(Web3Context)

    const [messages, loadingMessages, errorMessages] = useCollection(collection(db, "messages"), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })
    const [nilOjedaMsg, loadingNilOjedaMsg, errorNilOjedaMsg] = useCollection(
        collection(db, "nilOjeda"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
    const [werlybMsg, loadingWerlybMsg, errorWerlybMsg] = useCollection(collection(db, "werlyb"), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })
    const [calitosMsg, loadingCalitosMsg, errorCalitosMsg] = useCollection(
        collection(db, "calitos"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
    const [espeMsg, loadingEspeMsg, errorEspeMsg] = useCollection(collection(db, "espe"), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })
    const [grefgMsg, loadingGrefgMsg, errorGrefgMsg] = useCollection(collection(db, "grefg"), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })
    const [guanyarMsg, loadingGuanyarMsg, errorGuanyarMsg] = useCollection(
        collection(db, "guanyar"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
    const [jcorkoMsg, loadingJcorkoMsg, errorJcorkoMsg] = useCollection(collection(db, "jcorko"), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })
    const [liaSikoraMsg, loadingLiaSikoraMsg, errorLiaSikoraMsg] = useCollection(
        collection(db, "liaSikora"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
    const [mixwellMsg, loadingMixwellMsg, errorMixwellMsg] = useCollection(
        collection(db, "mixwell"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )

    const [currentChat, setCurrentChat] = useState("messages")
    const [messageToSend, setMessageToSend] = useState("")
    const [ownedNFTs, setOwnedNFTs] = useState([])
    const [ownedNFTsMetadata, setOwnedNFTsMetadata] = useState([])

    const creatorNftContractAddress =
        contractAddressJSON[process.env.NEXT_PUBLIC_CHAIN_ID].CreatorNft[0]
    const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

    const sendMessage = async (e) => {
        e.preventDefault()

        const { uid, photoURL } = userFirebaseData
        const date = new Date()
        const h_m_s_d_mth_y = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}_${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

        try {
            await setDoc(doc(db, currentChat, date.getTime().toString()), {
                message: messageToSend,
                sendAt: h_m_s_d_mth_y,
                uid,
                photoURL,
            })
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.warning("Ha habido un error en el envío del mensaje", toastConfig)
        }

        setMessageToSend("")
    }

    useEffect(() => {
        // Anonymus function
        ;(async () => {
            await checkIfWalletIsConnected()
            await fetchNFTs()
        })()
    }, [currentAccount])

    const fetchNFTs = async () => {
        if (currentAccount) {
            console.log("Fetching nfts...")

            var requestOptions = {
                method: "GET",
                redirect: "follow",
            }

            let baseURL
            switch (process.env.NEXT_PUBLIC_CHAIN_ID) {
                case "1":
                    baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`
                    break
                case "137":
                    baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}/getNFTs/`
                    break
                case "5":
                    baseURL = `https://eth-goerli.g.alchemy.com/v2/${apiKey}/getNFTs/`
                    break
                default:
                    baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`
                    break
            }

            let nfts
            const fetchURL = `${baseURL}?owner=${currentAccount}&contractAddresses%5B%5D=${creatorNftContractAddress}`

            nfts = await fetch(fetchURL, requestOptions)
                .then((data) => data.json())
                .catch((error) => console.error({ error }))

            if (nfts) {
                setOwnedNFTs(
                    nfts.ownedNfts.map((nft) => {
                        return nft.metadata.name
                    })
                )
                setOwnedNFTsMetadata(
                    nfts.ownedNfts.map((nft) => {
                        return nft.metadata
                    })
                )
                console.log(nfts)
            }
        }
    }

    return (
        <>
            {loadingFirebaseData ? (
                <div className="h-screen flex items-center justify-center">
                    <Loader />
                </div>
            ) : !userFirebaseData ? (
                <div className="h-screen flex flex-col items-center justify-center">
                    <Link
                        href="/signin"
                        className="bg-black text-white px-9 py-1.5 my-5 w-80 text-center"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/signup"
                        className="bg-black text-white px-9 py-1.5 my-5 w-80 text-center"
                    >
                        Sign Up
                    </Link>
                </div>
            ) : !currentAccount ? (
                <div className="h-screen flex flex-col items-center justify-center">
                    <button
                        className="bg-black text-white px-9 py-1.5 my-5 w-80 text-center"
                        type="button"
                        onClick={async (e) => {
                            await connectWallet()
                        }}
                    >
                        Conéctate a Metamask
                    </button>
                </div>
            ) : (
                <div>
                    <div>
                        <div className="relative min-h-screen flex flex-col bg-gray-50">
                            {/* CHAT SECTION START */}

                            <div className="flex-grow w-full max-w-7xl mx-auto lg:flex">
                                <div className="flex-1 min-w-0 bg-white xl:flex">
                                    <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl-border-r xl:border-gray-200 bg-gray-50">
                                        <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                                            <div className="h-full relative">
                                                <div className="relative rounded-lg px-2 py-2 mb-4 flex flex-col items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <img
                                                            className="h-12 w-12 rounded-full"
                                                            src={userFirebaseData.photoURL}
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <span className="absolute inset-0" />
                                                            <p className="text-sm font-bold text-red-600 text-center">
                                                                {userFirebaseData.displayName}
                                                            </p>
                                                            <p className="text-sm text-gray-500 truncate text-center">
                                                                {
                                                                    userFirebaseData.metadata.lastSignInTime.split(
                                                                        "202"
                                                                    )[0]
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* SEARCH BOX START */}
                                                    <div className="mb-4">
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <svg
                                                                    className="h-5 w-5 text-gray-400"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <input
                                                                name="search"
                                                                className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-100 rounded-full p-2 border"
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* SEARCH BOX END */}

                                                    {/* NOTIFY BOX START */}

                                                    {/* ALL */}
                                                    <div className="relative rounded-lg px-2 py-2 flex w-full items-center space-x-5 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                className="h-10 w-10 rounded-full"
                                                                src={logo}
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <button
                                                                type="button"
                                                                className="focus:outline-none w-full"
                                                                onClick={() => {
                                                                    setCurrentChat("messages")
                                                                }}
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <p className="text-sm font-bold text-red-600">
                                                                        Heretics Chat
                                                                    </p>
                                                                    <div className="text-gray-400 text-xs">
                                                                        {!loadingMessages &&
                                                                            messages.docs.map(
                                                                                (msg) => {
                                                                                    return msg.data()
                                                                                }
                                                                            ).length != 0 &&
                                                                            `${
                                                                                messages.docs
                                                                                    .map((msg) => {
                                                                                        return msg.data()
                                                                                    })
                                                                                    .at(-1)
                                                                                    ?.sendAt.split(
                                                                                        ":"
                                                                                    )[0]
                                                                            }:${
                                                                                messages.docs
                                                                                    .map((msg) => {
                                                                                        return msg.data()
                                                                                    })
                                                                                    .at(-1)
                                                                                    ?.sendAt.split(
                                                                                        ":"
                                                                                    )[1]
                                                                            }
                                                                            `}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <p className="text-sm text-gray-500 truncate">
                                                                        {!loadingMessages &&
                                                                            messages.docs.map(
                                                                                (msg) => {
                                                                                    return msg.data()
                                                                                }
                                                                            ).length != 0 &&
                                                                            messages.docs
                                                                                .map((msg) => {
                                                                                    return msg.data()
                                                                                })
                                                                                .at(-1)?.message}
                                                                    </p>
                                                                    <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                                                                        {!loadingMessages &&
                                                                            messages.docs.map(
                                                                                (msg) => {
                                                                                    return msg.data()
                                                                                }
                                                                            ).length != 0 &&
                                                                            messages.docs
                                                                                .map((msg) => {
                                                                                    return msg.data()
                                                                                })
                                                                                .at(-1)?.uid !=
                                                                                userFirebaseData.uid &&
                                                                            "..."}
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* ALL */}

                                                    {Array.from(new Set(ownedNFTs)).map(
                                                        (nft, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="relative rounded-lg px-2 py-2 flex w-full items-center space-x-5 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200"
                                                                >
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            className="h-10 w-10 rounded-full"
                                                                            src={
                                                                                ownedNFTsMetadata.filter(
                                                                                    (nftM) => {
                                                                                        if (
                                                                                            nftM.name ==
                                                                                            nft
                                                                                        ) {
                                                                                            return nftM.image
                                                                                        } else {
                                                                                        }
                                                                                    }
                                                                                ).length != 0 &&
                                                                                ownedNFTsMetadata
                                                                                    .filter(
                                                                                        (nftM) => {
                                                                                            if (
                                                                                                nftM.name ==
                                                                                                nft
                                                                                            ) {
                                                                                                return nftM.image
                                                                                            } else {
                                                                                            }
                                                                                        }
                                                                                    )[0]
                                                                                    .image.replace(
                                                                                        "ipfs://",
                                                                                        "https://ipfs.io/ipfs/"
                                                                                    )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <button
                                                                            type="button"
                                                                            className="focus:outline-none w-full"
                                                                            onClick={() => {
                                                                                setCurrentChat(nft)
                                                                            }}
                                                                        >
                                                                            <div className="flex items-center justify-between">
                                                                                <p className="text-sm font-bold text-red-600">
                                                                                    {nft}
                                                                                </p>
                                                                                <div className="text-gray-400 text-xs">
                                                                                    {nft ==
                                                                                        "nilOjeda" &&
                                                                                        !loadingNilOjedaMsg &&
                                                                                        nilOjedaMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        `${
                                                                                            nilOjedaMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[0]
                                                                                        }:${
                                                                                            nilOjedaMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[1]
                                                                                        }
                                                                            `}
                                                                                    {nft ==
                                                                                        "werlyb" &&
                                                                                        !loadingWerlybMsg &&
                                                                                        werlybMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        `${
                                                                                            werlybMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[0]
                                                                                        }:${
                                                                                            werlybMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[1]
                                                                                        }
                                                                            `}
                                                                                    {nft ==
                                                                                        "calitos" &&
                                                                                        !loadingCalitosMsg &&
                                                                                        calitosMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        `${
                                                                                            calitosMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[0]
                                                                                        }:${
                                                                                            calitosMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[1]
                                                                                        }
                                                                            `}
                                                                                    {nft ==
                                                                                        "espe" &&
                                                                                        !loadingEspeMsg &&
                                                                                        espeMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        `${
                                                                                            espeMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[0]
                                                                                        }:${
                                                                                            espeMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[1]
                                                                                        }
                                                                            `}
                                                                                    {nft ==
                                                                                        "grefg" &&
                                                                                        !loadingGrefgMsg &&
                                                                                        grefgMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        `${
                                                                                            grefgMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[0]
                                                                                        }:${
                                                                                            grefgMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[1]
                                                                                        }
                                                                            `}
                                                                                    {nft ==
                                                                                        "guanyar" &&
                                                                                        !loadingGuanyarMsg &&
                                                                                        guanyarMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        `${
                                                                                            guanyarMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[0]
                                                                                        }:${
                                                                                            guanyarMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[1]
                                                                                        }
                                                                            `}
                                                                                    {nft ==
                                                                                        "jcorko" &&
                                                                                        !loadingJcorkoMsg &&
                                                                                        jcorkoMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        `${
                                                                                            jcorkoMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[0]
                                                                                        }:${
                                                                                            jcorkoMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[1]
                                                                                        }
                                                                            `}
                                                                                    {nft ==
                                                                                        "liaSikora" &&
                                                                                        !loadingLiaSikoraMsg &&
                                                                                        liaSikoraMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        `${
                                                                                            liaSikoraMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[0]
                                                                                        }:${
                                                                                            liaSikoraMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[1]
                                                                                        }
                                                                            `}
                                                                                    {nft ==
                                                                                        "mixwell" &&
                                                                                        !loadingMixwellMsg &&
                                                                                        mixwellMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        `${
                                                                                            mixwellMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[0]
                                                                                        }:${
                                                                                            mixwellMsg.docs
                                                                                                .map(
                                                                                                    (
                                                                                                        msg
                                                                                                    ) => {
                                                                                                        return msg.data()
                                                                                                    }
                                                                                                )
                                                                                                .at(
                                                                                                    -1
                                                                                                )
                                                                                                ?.sendAt.split(
                                                                                                    ":"
                                                                                                )[1]
                                                                                        }
                                                                            `}
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center justify-between">
                                                                                <p className="text-sm text-gray-500 truncate">
                                                                                    {nft ==
                                                                                        "nilOjeda" &&
                                                                                        !loadingNilOjedaMsg &&
                                                                                        nilOjedaMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        nilOjedaMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.message}
                                                                                    {nft ==
                                                                                        "werlyb" &&
                                                                                        !loadingWerlybMsg &&
                                                                                        werlybMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        werlybMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.message}
                                                                                    {nft ==
                                                                                        "calitos" &&
                                                                                        !loadingCalitosMsg &&
                                                                                        calitosMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        calitosMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.message}
                                                                                    {nft ==
                                                                                        "espe" &&
                                                                                        !loadingEspeMsg &&
                                                                                        espeMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        espeMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.message}
                                                                                    {nft ==
                                                                                        "grefg" &&
                                                                                        !loadingGrefgMsg &&
                                                                                        grefgMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        grefgMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.message}
                                                                                    {nft ==
                                                                                        "guanyar" &&
                                                                                        !loadingGuanyarMsg &&
                                                                                        guanyarMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        guanyarMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.message}
                                                                                    {nft ==
                                                                                        "jcorko" &&
                                                                                        !loadingJcorkoMsg &&
                                                                                        jcorkoMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        jcorkoMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.message}
                                                                                    {nft ==
                                                                                        "liaSikora" &&
                                                                                        !loadingLiaSikoraMsg &&
                                                                                        liaSikoraMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        liaSikoraMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.message}
                                                                                    {nft ==
                                                                                        "mixwell" &&
                                                                                        !loadingMixwellMsg &&
                                                                                        mixwellMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        mixwellMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.message}
                                                                                </p>
                                                                                <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                                                                                    {nft ==
                                                                                        "nilOjeda" &&
                                                                                        !loadingNilOjedaMsg &&
                                                                                        nilOjedaMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        nilOjedaMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.uid !=
                                                                                            userFirebaseData.uid &&
                                                                                        "..."}
                                                                                    {nft ==
                                                                                        "werlyb" &&
                                                                                        !loadingWerlybMsg &&
                                                                                        werlybMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        werlybMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.uid !=
                                                                                            userFirebaseData.uid &&
                                                                                        "..."}
                                                                                    {nft ==
                                                                                        "calitos" &&
                                                                                        !loadingCalitosMsg &&
                                                                                        calitosMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        calitosMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.uid !=
                                                                                            userFirebaseData.uid &&
                                                                                        "..."}
                                                                                    {nft ==
                                                                                        "espe" &&
                                                                                        !loadingEspeMsg &&
                                                                                        espeMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        espeMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.uid !=
                                                                                            userFirebaseData.uid &&
                                                                                        "..."}
                                                                                    {nft ==
                                                                                        "grefg" &&
                                                                                        !loadingGrefgMsg &&
                                                                                        grefgMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        grefgMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.uid !=
                                                                                            userFirebaseData.uid &&
                                                                                        "..."}
                                                                                    {nft ==
                                                                                        "guanyar" &&
                                                                                        !loadingGuanyarMsg &&
                                                                                        guanyarMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        guanyarMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.uid !=
                                                                                            userFirebaseData.uid &&
                                                                                        "..."}
                                                                                    {nft ==
                                                                                        "jcorko" &&
                                                                                        !loadingJcorkoMsg &&
                                                                                        jcorkoMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        jcorkoMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.uid !=
                                                                                            userFirebaseData.uid &&
                                                                                        "..."}
                                                                                    {nft ==
                                                                                        "liaSikora" &&
                                                                                        !loadingLiaSikoraMsg &&
                                                                                        liaSikoraMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        liaSikoraMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.uid !=
                                                                                            userFirebaseData.uid &&
                                                                                        "..."}
                                                                                    {nft ==
                                                                                        "mixwell" &&
                                                                                        !loadingMixwellMsg &&
                                                                                        mixwellMsg.docs.map(
                                                                                            (
                                                                                                msg
                                                                                            ) => {
                                                                                                return msg.data()
                                                                                            }
                                                                                        ).length !=
                                                                                            0 &&
                                                                                        mixwellMsg.docs
                                                                                            .map(
                                                                                                (
                                                                                                    msg
                                                                                                ) => {
                                                                                                    return msg.data()
                                                                                                }
                                                                                            )
                                                                                            .at(-1)
                                                                                            ?.uid !=
                                                                                            userFirebaseData.uid &&
                                                                                        "..."}
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    )}

                                                    {/* NOTIFY BOX END */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CHAT MESSAGES CONTENT */}

                                    <div className="flex-1 p-2 sm:pb-6 justify-between sm:flex flex-col h-screen hidden xl:flex">
                                        <div className="flex sm:items-center justify-between py-3 border-gray-200 p-3">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor-pointer"
                                                    src={
                                                        ownedNFTsMetadata
                                                            .filter((nftM) => {
                                                                return nftM.name == currentChat
                                                            })[0]
                                                            ?.image.replace(
                                                                "ipfs://",
                                                                "https://ipfs.io/ipfs/"
                                                            ) || logo
                                                    }
                                                />
                                                <div className="flex flex-col leading-tight">
                                                    <div className="text-xl mt-1 flex items-center">
                                                        <span className="text-gray-700 mr-3">
                                                            {currentChat == "messages"
                                                                ? "Heretics Chat"
                                                                : currentChat}
                                                        </span>
                                                        <span className="text-green-500">
                                                            <svg width={10} height={10}>
                                                                <circle
                                                                    cx={5}
                                                                    cy={5}
                                                                    r={5}
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <button className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* MESSAGES START */}

                                        <div
                                            id="messages"
                                            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                                        >
                                            {!loadingMessages &&
                                                currentChat == "messages" &&
                                                messages.docs.map((msg, index) => {
                                                    return (
                                                        <ChatMessage
                                                            key={index}
                                                            message={msg.data().message}
                                                            authorUid={msg.data().uid}
                                                            userUid={userFirebaseData.uid}
                                                            photoURL={msg.data().photoURL}
                                                        />
                                                    )
                                                })}
                                            {!loadingNilOjedaMsg &&
                                                currentChat == "nilOjeda" &&
                                                nilOjedaMsg.docs.map((msg, index) => {
                                                    return (
                                                        <ChatMessage
                                                            key={index}
                                                            message={msg.data().message}
                                                            authorUid={msg.data().uid}
                                                            userUid={userFirebaseData.uid}
                                                            photoURL={msg.data().photoURL}
                                                        />
                                                    )
                                                })}
                                            {!loadingWerlybMsg &&
                                                currentChat == "werlyb" &&
                                                werlybMsg.docs.map((msg, index) => {
                                                    return (
                                                        <ChatMessage
                                                            key={index}
                                                            message={msg.data().message}
                                                            authorUid={msg.data().uid}
                                                            userUid={userFirebaseData.uid}
                                                            photoURL={msg.data().photoURL}
                                                        />
                                                    )
                                                })}
                                            {!loadingCalitosMsg &&
                                                currentChat == "calitos" &&
                                                calitosMsg.docs.map((msg, index) => {
                                                    return (
                                                        <ChatMessage
                                                            key={index}
                                                            message={msg.data().message}
                                                            authorUid={msg.data().uid}
                                                            userUid={userFirebaseData.uid}
                                                            photoURL={msg.data().photoURL}
                                                        />
                                                    )
                                                })}
                                            {!loadingEspeMsg &&
                                                currentChat == "espe" &&
                                                espeMsg.docs.map((msg, index) => {
                                                    return (
                                                        <ChatMessage
                                                            key={index}
                                                            message={msg.data().message}
                                                            authorUid={msg.data().uid}
                                                            userUid={userFirebaseData.uid}
                                                            photoURL={msg.data().photoURL}
                                                        />
                                                    )
                                                })}
                                            {!loadingGrefgMsg &&
                                                currentChat == "grefg" &&
                                                grefgMsg.docs.map((msg, index) => {
                                                    return (
                                                        <ChatMessage
                                                            key={index}
                                                            message={msg.data().message}
                                                            authorUid={msg.data().uid}
                                                            userUid={userFirebaseData.uid}
                                                            photoURL={msg.data().photoURL}
                                                        />
                                                    )
                                                })}
                                            {!loadingGuanyarMsg &&
                                                currentChat == "guanyar" &&
                                                guanyarMsg.docs.map((msg, index) => {
                                                    return (
                                                        <ChatMessage
                                                            key={index}
                                                            message={msg.data().message}
                                                            authorUid={msg.data().uid}
                                                            userUid={userFirebaseData.uid}
                                                            photoURL={msg.data().photoURL}
                                                        />
                                                    )
                                                })}
                                            {!loadingJcorkoMsg &&
                                                currentChat == "jcorko" &&
                                                jcorkoMsg.docs.map((msg, index) => {
                                                    return (
                                                        <ChatMessage
                                                            key={index}
                                                            message={msg.data().message}
                                                            authorUid={msg.data().uid}
                                                            userUid={userFirebaseData.uid}
                                                            photoURL={msg.data().photoURL}
                                                        />
                                                    )
                                                })}
                                            {!loadingLiaSikoraMsg &&
                                                currentChat == "liaSikora" &&
                                                liaSikoraMsg.docs.map((msg, index) => {
                                                    return (
                                                        <ChatMessage
                                                            key={index}
                                                            message={msg.data().message}
                                                            authorUid={msg.data().uid}
                                                            userUid={userFirebaseData.uid}
                                                            photoURL={msg.data().photoURL}
                                                        />
                                                    )
                                                })}
                                            {!loadingMixwellMsg &&
                                                currentChat == "mixwell" &&
                                                mixwellMsg.docs.map((msg, index) => {
                                                    return (
                                                        <ChatMessage
                                                            key={index}
                                                            message={msg.data().message}
                                                            authorUid={msg.data().uid}
                                                            userUid={userFirebaseData.uid}
                                                            photoURL={msg.data().photoURL}
                                                        />
                                                    )
                                                })}

                                            {/* MESSAGES END */}

                                            {/* MESSAGES SEND START */}

                                            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2">
                                                <div className="relative flex">
                                                    <span className="absolute inset-y-0 flex items-center">
                                                        <button className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300">
                                                            <svg
                                                                className="h-6 w-6 text-gray-600"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                    <form
                                                        className="flex focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full border-gray-200"
                                                        onSubmit={sendMessage}
                                                    >
                                                        <input
                                                            id="messageToSend"
                                                            name="messageToSend"
                                                            type="text"
                                                            required
                                                            placeholder="Write your message"
                                                            value={messageToSend}
                                                            onChange={(e) => {
                                                                e.preventDefault()
                                                                setMessageToSend(e.target.value)
                                                            }}
                                                            className="px-3 py-3 focus:ring-red-500 focus:border-red-500 w-full h-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 rounded-full border-gray-200"
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="rounded-full bg-green-300 px-7 py-1 font-semibold"
                                                        >
                                                            Send
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
