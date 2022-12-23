import { useContext } from "react"
import { Web3Context } from "../context/Web3Context"
import { DAOContext } from "../context/DAOContext"

const logo = "./HereticsLogo.png"

const Proposal = ({ data }) => {
    const { truncateStr, proposalState } = useContext(Web3Context)
    const { votePropose, queuePropose, executePropose, updateProposalStatus } =
        useContext(DAOContext)

    const { proposalId, state, snapshot, deadline, proposer, description, functionToCall, args } =
        data
    return (
        <div className="flex flex-row bg-gray-100 rounded-lg w-full h-fit mx-2 my-4 p-4">
            <div className="flex flex-col w-7/12 items-start justify-center">
                <div className="text-black font-semibold text-base">
                    {truncateStr(proposer, 12)}
                </div>
                <div className="text-black font-normal text-sm">{description}</div>
            </div>
            <div className="flex flex-row w-5/12 items-center justify-between">
                <img className="w-1/12 h-auto block" src={logo} alt="Heretics Logo" />
                <button
                    className="rounded-lg font-bold text-xs w-5/12 h-full text-white text-center bg-green-100 hover:bg-green-200"
                    onClick={() => {
                        votePropose(proposalId, 1, "none yet")
                    }}
                    type="button"
                >
                    A FAVOR
                </button>
                <button
                    className="rounded-lg font-bold text-xs w-5/12 h-full text-white text-center bg-red-100 hover:bg-red-200"
                    onClick={() => {
                        votePropose(proposalId, 0, "none yet")
                    }}
                    type="button"
                >
                    EN CONTRA
                </button>
            </div>
        </div>
    )
}

export default Proposal
{
    /* <div className="m-3 bg-gray-100 rounded-md border-black border-2 p-3 flex flex-col h-fit">
            <div className="flex-1">Proposal id: {truncateStr(proposalId, 12)}</div>
            <div className="flex-1">State: {proposalState[state]}</div>
            <div className="flex-1">Snapshot: {snapshot}</div>
            <div className="flex-1">Deadline: {deadline}</div>
            <div className="flex-1">Proposer: {truncateStr(proposer, 12)}</div>
            <div className="flex-1">Description: {description}</div>

            <div className="flex justify-between mt-3">
                <button
                    className="border-green-900 rounded-full text-center px-1 border-2 bg-green-600"
                    onClick={() => {
                        votePropose(proposalId, 1, "none yet")
                    }}
                    type="button"
                >
                    In favor
                </button>
                <button
                    className="border-red-900 rounded-full text-center px-1 border-2 bg-red-600"
                    onClick={() => {
                        votePropose(proposalId, 0, "none yet")
                    }}
                    type="button"
                >
                    Against
                </button>
                <button
                    className="border-yellow-900 rounded-full text-center px-1 border-2 bg-yellow-600"
                    onClick={() => {
                        votePropose(proposalId, 2, "none yet")
                    }}
                    type="button"
                >
                    Null
                </button>
            </div>
            <button
                type="button"
                className="bg-black text-white mt-5 py-2"
                onClick={() => {
                    updateProposalStatus(snapshot)
                }}
            >
                Update
            </button>

            <button
                type="button"
                className="bg-black text-white mt-5 py-2"
                onClick={() => {
                    queuePropose(args, functionToCall, description)
                }}
            >
                Poner en cola
            </button>

            <button
                type="button"
                className="bg-black text-white mt-5 py-2"
                onClick={() => {
                    executePropose(args, functionToCall, description)
                }}
            >
                Ejecutar
            </button>
        </div> */
}
