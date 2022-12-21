import { useContext, useEffect, useState } from "react"
import { DAOContext } from "../context/DAOContext"
import { Web3Context } from "../context/Web3Context"
import { toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export default function DAO() {
    const { createPropose, checkStatus } = useContext(DAOContext)
    const { checkIfWalletIsConnected, connectWallet, currentAccount } = useContext(Web3Context)

    const [formData, setFormData] = useState({
        newValue: "",
        functionToCall: "",
        proposalDescription: "",
    })
    const [proposalId, setProposalId] = useState("")

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    const updateField = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="h-screen w-screen flex flex-col justify-start items-center p-10">
                {currentAccount ? (
                    <p>{currentAccount}</p>
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
                    <label htmlFor="proposalId" className="w-48 font-bold text-base mr-5">
                        Proposal Id
                    </label>
                    <input
                        id="proposalId"
                        name="proposalId"
                        type="text"
                        required
                        className="w-full border px-2 py-0.5"
                        value={proposalId}
                        onChange={(e) => {
                            setProposalId(e.target.value)
                        }}
                    ></input>
                </div>
                <button
                    className="bg-black text-white w-fit px-9 py-1.5 my-5"
                    type="button"
                    onClick={(e) => {
                        e.preventDefault()
                        checkStatus(proposalId)
                    }}
                >
                    Status
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
            </div>
        </>
    )
}
