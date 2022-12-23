import { useContext, useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { DAOContext } from "../context/DAOContext"
import { Web3Context } from "../context/Web3Context"
import { FirebaseContext } from "../context/FirebaseContext"

import { Proposal, Loader, SuggestionModal, NoMetamask } from "../components"

import { toast } from "react-toastify"
import toastConfig from "../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"

export default function DAO() {
    const { db, collection } = useContext(FirebaseContext)
    const { checkIfWalletIsConnected, connectWallet, currentAccount } = useContext(Web3Context)
    const { createPropose, updateProposalStatus, updateStoreValue } = useContext(DAOContext)

    const [allProposals, loadingAllProposals, errorAllProposals] = useCollection(
        collection(db, "proposals"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )

    const [formData, setFormData] = useState({
        newValue: "",
        functionToCall: "",
        proposalDescription: "",
    })

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    useEffect(() => {
        if (allProposals) {
            allProposals.docs.reverse().map(async (doc) => {
                await updateProposalStatus(doc.data().snapshot)
            })
        }
    }, [allProposals])

    const updateField = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            {currentAccount ? (
                <div className="w-full h-screen flex flex-col pl-8 pr-10 2xl:pr-8 pt-10 pb-4">
                    <div className="text-black font-bold text-4xl mb-8">
                        Sugerencias y votaciones
                    </div>
                    <div className="flex flex-row items-center justify-between bg-orange-100 rounded-lg w-full h-fit px-5 py-4">
                        <div className="flex flex-col w-1/2">
                            <div className="text-black font-bold text-xl">
                                ¿Tienes alguna sugerencia?
                            </div>
                            <div className="text-black text-sm">
                                No te olvides de rellenar todos los datos para poder realizar
                                correctamente tu sugerencia.
                            </div>
                        </div>
                        <SuggestionModal />
                    </div>
                    <div className="flex flex-col justify-start items-start bg-gray-100 rounded-lg w-full h-full px-5 py-4 mt-4">
                        <div className="text-black font-bold text-xl">
                            Lista de votaciones activas
                        </div>
                        <div className="flex flex-col justify-start items-center w-full h-fit">
                            {loadingAllProposals ? (
                                <div className="h-full w-full items-center justify-center">
                                    <Loader h={32} w={32} />
                                </div>
                            ) : (
                                allProposals?.docs
                                    .reverse()
                                    .map((doc) => <Proposal key={doc.id} data={doc.data()} />)
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <NoMetamask />
            )}
        </>
    )
}
