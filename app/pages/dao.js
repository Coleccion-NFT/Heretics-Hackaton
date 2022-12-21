import { useContext, useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { DAOContext } from "../context/DAOContext"
import { Web3Context } from "../context/Web3Context"
import { FirebaseContext } from "../context/FirebaseContext"

import { Proposal, Loader } from "../components"

import { toast } from "react-toastify"
import toastConfig from "../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"

export default function DAO() {
    const { db, collection } = useContext(FirebaseContext)
    const { checkIfWalletIsConnected, connectWallet, currentAccount } = useContext(Web3Context)
    const { createPropose, checkProposalStatus, updateProposalStatus, updateStoreValue } =
        useContext(DAOContext)

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
    const [storeValue, setStoreValue] = useState(0)

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
            <div className="h-screen w-screen flex flex-col justify-start items-center p-10">
                {currentAccount ? (
                    <p>Has iniciado sesión con: {currentAccount}</p>
                ) : (
                    <button
                        className="bg-black text-white w-fit px-9 py-1.5"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            connectWallet()
                        }}
                    >
                        Conéctate
                    </button>
                )}
                <div className="flex items-center justify-center my-5">
                    <label htmlFor="storeValue" className="w-48 font-bold text-base mr-5">
                        Store Value
                    </label>
                    <input
                        id="storeValue"
                        name="storeValue"
                        type="text"
                        required
                        className="w-full border px-2 py-0.5"
                        value={storeValue}
                        readOnly
                    ></input>
                </div>
                <button
                    className="bg-black text-white w-fit px-9 py-1.5 my-5"
                    type="button"
                    onClick={async (e) => {
                        e.preventDefault()
                        let newValue = await updateStoreValue()
                        setStoreValue(newValue)
                    }}
                >
                    Update Store
                </button>
                <form className="mt-5 flex flex-col items-center">
                    <div className="flex items-center justify-center my-5">
                        <label htmlFor="newValue" className="w-48 font-bold text-base mr-5">
                            New Value
                        </label>
                        <input
                            id="newValue"
                            name="newValue"
                            type="text"
                            required
                            className="w-full border px-2 py-0.5"
                            value={formData.newValue}
                            onChange={updateField}
                        ></input>
                    </div>
                    <div className="flex items-center justify-center my-5">
                        <label htmlFor="functionToCall" className="w-48 font-bold text-base mr-5">
                            Function
                        </label>
                        <input
                            id="functionToCall"
                            name="functionToCall"
                            type="text"
                            required
                            className="w-full border px-2 py-0.5"
                            value={formData.functionToCall}
                            onChange={updateField}
                        ></input>
                    </div>
                    <div className="flex items-center justify-center my-5">
                        <label
                            htmlFor="proposalDescription"
                            className="w-48 font-bold text-base mr-5"
                        >
                            Description
                        </label>
                        <input
                            id="proposalDescription"
                            name="proposalDescription"
                            type="text"
                            required
                            className="w-full border px-2 py-0.5"
                            value={formData.proposalDescription}
                            onChange={updateField}
                        ></input>
                    </div>

                    <button
                        className="bg-black text-white w-fit my-5 px-9 py-1.5"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault()
                            createPropose(
                                [formData.newValue],
                                formData.functionToCall,
                                formData.proposalDescription
                            )
                        }}
                    >
                        Enviar la propuesta
                        {/* TODO: Make a loader while a proposal is being transacted */}
                    </button>
                </form>
                <div className="w-full h-full flex flex-wrap">
                    {loadingAllProposals ? (
                        <div className="h-full w-full items-center justify-center">
                            <Loader h={32} w={32} />
                        </div>
                    ) : (
                        <>
                            {allProposals.docs.reverse().map((doc) => (
                                <Proposal key={doc.id} data={doc.data()} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
