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
    const {
        handleSignOut,
        userFirebaseData,
        loadingFirebaseData,
        errorFirebaseData,
        auth,
        db,
        collection,
        doc,
    } = useContext(FirebaseContext)

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
        <div className="flex flex-col h-screen w-screen items-center justify-between py-5">
            {loadingFirebaseData ? (
                <Loader h={24} w={24} />
            ) : !userFirebaseData ? (
                <Link href="/signin">Go to login</Link>
            ) : (
                <>
                    <div className="flex flex-col w-full max-w-screen-sm h-full bg-black mb-5">
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
                    </div>
                    <button
                        type="button"
                        className="border-2 border-black h-10"
                        onClick={() => {
                            handleSignOut()
                        }}
                    >
                        Sign out
                    </button>
                </>
            )}
        </div>
    )
}
