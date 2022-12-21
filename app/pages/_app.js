import { FirebaseProvider } from "../context/FirebaseContext"
import { Web3Provider } from "../context/Web3Context"
import { DAOProvider } from "../context/DAOContext"
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
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Web3Provider>
                <FirebaseProvider>
                    <DAOProvider>
                        <Component {...pageProps} />
                        <ToastContainer />
                    </DAOProvider>
                </FirebaseProvider>
            </Web3Provider>
        </>
    )
}
