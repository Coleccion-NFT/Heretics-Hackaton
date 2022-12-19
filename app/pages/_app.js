import { FirebaseProvider } from "../context/FirebaseContext"
import { Web3Provider } from "../context/Web3Context"
import { ToastContainer } from "react-toastify"

import Head from "next/head"

import "react-toastify/dist/ReactToastify.css"
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Heretics Hackaton</title>
                <meta name="description" content="Heretics Blockchain dApp for the hackaton" />
                <link rel="icon" href="/favicon.svg" />
                <link href="../styles/global.css" rel="stylesheet" />
            </Head>
            <Web3Provider>
                <FirebaseProvider>
                    <Component {...pageProps} />
                    <ToastContainer />
                </FirebaseProvider>
            </Web3Provider>
        </>
    )
}
