import { useEffect, useContext, useState } from "react"
import Link from "next/link"
import { Loader, ChatMessage } from "../components"

import { useCollection } from "react-firebase-hooks/firestore"

import { FirebaseContext } from "../context/FirebaseContext"

import { toast } from "react-toastify"
import toastConfig from "../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"
import { setDoc } from "firebase/firestore"

export default function Chat() {
    const { handleSignOut, userFirebaseData, loadingFirebaseData, auth, db, collection, doc } =
        useContext(FirebaseContext)

    const [messages, loadingMessages, errorMessages] = useCollection(collection(db, "messages"), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })

    const [messageToSend, setMessageToSend] = useState("")

    const sendMessage = async (e) => {
        e.preventDefault()

        const { uid, photoURL } = userFirebaseData
        const date = new Date().getTime()

        try {
            await setDoc(doc(db, "messages", date.toString()), {
                message: messageToSend,
                sendAt: date,
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

    return (
        // <div className="flex flex-col h-screen w-full items-center justify-between py-5">
        //     {loadingFirebaseData ? (
        //         <Loader h={24} w={24} />
        //     ) : !userFirebaseData ? (
        //         <Link href="/signin">Go to login</Link>
        //     ) : (
        <>
            {/* <div className="flex flex-col w-full max-w-screen-sm h-full bg-black mb-5">
                        <div className="bg-white mx-2 my-4 px-2 py-4 text-center">Chat App</div>
                        <div className="px-2 py-4 bg-gray-400 h-full">
                            {messages &&
                                messages.docs.map((msg, index) => (
                                    <ChatMessage key={index} message={msg.data().message} />
                                ))}
                        </div>
                        <form
                            className="bg-white mx-2 my-2 rounded-full flex"
                            onSubmit={sendMessage}
                        >
                            <input
                                id="messageToSend"
                                name="messageToSend"
                                type="text"
                                required
                                className="w-full focus:outline-none py-3 pl-7 mr-1 rounded-full"
                                value={messageToSend}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setMessageToSend(e.target.value)
                                }}
                            ></input>
                            <button
                                type="submit"
                                className="rounded-full bg-green-300 px-7 py-1 font-semibold"
                            >
                                Send
                            </button>
                        </form>
                    </div> */}
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
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="h-12 w-12 rounded-full"
                                                        src="https://pps.whatsapp.net/v/t61.24694-24/229176898_144793694445495_5905855527830909530_n.jpg?ccb=11-4&oh=01_AdTTSS9SkGbIdjrbnvaNupEQeND1jYtWWnyj3Ih926GYTg&oe=63B1E2A1"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <a href="#" className="focus:outline-none">
                                                            <span className="absolute inset-0" />
                                                            <p className="text-sm font-bold text-red-600">
                                                                Caca Culo
                                                            </p>
                                                            <p className="text-sm text-gray-500 truncate">
                                                                Pedo Pis
                                                            </p>
                                                        </a>
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

                                                {/* USER 1 */}
                                                <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src="https://pps.whatsapp.net/v/t61.24694-24/229176898_144793694445495_5905855527830909530_n.jpg?ccb=11-4&oh=01_AdTTSS9SkGbIdjrbnvaNupEQeND1jYtWWnyj3Ih926GYTg&oe=63B1E2A1"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <a href="#" className="focus:outline-none">
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm font-bold text-red-600">
                                                                    Misco Jones
                                                                </p>
                                                                <div className="text-gray-400 text-xs">
                                                                    12:35 AM
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm text-gray-500 truncate">
                                                                    Hellouda
                                                                </p>
                                                                <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                                                                    2
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* USER 1 */}

                                                {/* USER 2 */}
                                                <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src="https://pps.whatsapp.net/v/t61.24694-24/229176898_144793694445495_5905855527830909530_n.jpg?ccb=11-4&oh=01_AdTTSS9SkGbIdjrbnvaNupEQeND1jYtWWnyj3Ih926GYTg&oe=63B1E2A1"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <a href="#" className="focus:outline-none">
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm font-bold text-red-600">
                                                                    Misco Jones
                                                                </p>
                                                                <div className="text-gray-400 text-xs">
                                                                    12:35 AM
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm text-gray-500 truncate">
                                                                    Hellouda
                                                                </p>
                                                                <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                                                                    2
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* USER 2 */}

                                                {/* USER 3 */}
                                                <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src="https://pps.whatsapp.net/v/t61.24694-24/229176898_144793694445495_5905855527830909530_n.jpg?ccb=11-4&oh=01_AdTTSS9SkGbIdjrbnvaNupEQeND1jYtWWnyj3Ih926GYTg&oe=63B1E2A1"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <a href="#" className="focus:outline-none">
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm font-bold text-red-600">
                                                                    Misco Jones
                                                                </p>
                                                                <div className="text-gray-400 text-xs">
                                                                    12:35 AM
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm text-gray-500 truncate">
                                                                    Hellouda
                                                                </p>
                                                                <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                                                                    2
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* USER 3 */}

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
                                                src="https://pps.whatsapp.net/v/t61.24694-24/229176898_144793694445495_5905855527830909530_n.jpg?ccb=11-4&oh=01_AdTTSS9SkGbIdjrbnvaNupEQeND1jYtWWnyj3Ih926GYTg&oe=63B1E2A1"
                                            />
                                            <div className="flex flex-col leading-tight">
                                                <div className="text-xl mt-1 flex items-center">
                                                    <span className="text-gray-700 mr-3">
                                                        Misco Jones
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
                                        {/* FIRST MESSAGE */}
                                        <div className="chat-message">
                                            <div className="flex items-end">
                                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                                    <div>
                                                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                                                            SEXOOOO
                                                        </span>
                                                    </div>
                                                </div>
                                                <img
                                                    className="w-6 h-6 rounded-full order-1"
                                                    src="https://pps.whatsapp.net/v/t61.24694-24/229176898_144793694445495_5905855527830909530_n.jpg?ccb=11-4&oh=01_AdTTSS9SkGbIdjrbnvaNupEQeND1jYtWWnyj3Ih926GYTg&oe=63B1E2A1"
                                                />
                                            </div>
                                        </div>
                                        {/* SECOND MESSAGE */}
                                        <div className="chat-message">
                                            <div className="flex items-end justify-end">
                                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                                                    <div>
                                                        <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-red-500 text-white">
                                                            SEXOOOO
                                                        </span>
                                                    </div>
                                                </div>
                                                <img
                                                    className="w-6 h-6 rounded-full order-2"
                                                    src="https://pps.whatsapp.net/v/t61.24694-24/229176898_144793694445495_5905855527830909530_n.jpg?ccb=11-4&oh=01_AdTTSS9SkGbIdjrbnvaNupEQeND1jYtWWnyj3Ih926GYTg&oe=63B1E2A1"
                                                />
                                            </div>
                                        </div>

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
                                                <input
                                                    placeholder="Write your message"
                                                    className="focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        //     )}
        // </div>
    )
}
