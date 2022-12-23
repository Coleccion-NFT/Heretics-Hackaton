import { FirebaseProvider } from "../context/FirebaseContext"
import { Web3Provider } from "../context/Web3Context"
import { DAOProvider } from "../context/DAOContext"
import { CreatorNftProvider } from "../context/CreatorNftContext"
import { ToastContainer } from "react-toastify"
import { Poppins } from "@next/font/google"
import { useRouter } from "next/router"

import Head from "next/head"

import { Navbar, Sidebar, DaoSidebar } from "../components"

import "react-toastify/dist/ReactToastify.css"
import "../styles/globals.css"

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    // weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
})

export default function App({ Component, pageProps }) {
    const router = useRouter()
    return (
        <main className={`${poppins.variable} font-sans`}>
            <Head>
                <title>Heretics Hackaton</title>
                <meta name="description" content="Heretics Blockchain dApp for the hackaton" />
                <link rel="icon" href="/favicon.ico" />
                <link href="../styles/global.css" rel="stylesheet" />
            </Head>
            <Web3Provider>
                <FirebaseProvider>
                    <DAOProvider>
                        <CreatorNftProvider>
                            <div className="flex flex-row">
                                <div className="w-1/6 lg:max-w-max h-fit fixed left-0">
                                    <Navbar />
                                </div>
                                <div className="fixed right-0 w-5/6 lg:mr-10 lg:w-9/12 xl:static xl:w-4/6 h-fit xl:mx-auto">
                                    <Component {...pageProps} />
                                </div>
                                {router.pathname === "/dao" ? (
                                    <div className="hidden xl:block w-1/6 lg:max-w-sm h-fit fixed right-0">
                                        <DaoSidebar />
                                    </div>
                                ) : (
                                    <div className="hidden xl:block lg:max-w-sm h-fit fixed right-0">
                                        <Sidebar />
                                    </div>
                                )}
                                <ToastContainer />
                            </div>
                        </CreatorNftProvider>
                    </DAOProvider>
                </FirebaseProvider>
            </Web3Provider>
        </main>
    )
}
