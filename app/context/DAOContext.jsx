import { useState, useEffect, createContext, useContext } from "react"
import { ethers, BigNumber } from "ethers"
import { db } from "../backend/firebase"
import { doc, setDoc, getDoc, collection, updateDoc } from "firebase/firestore"

import { Web3Context } from "./Web3Context"

import { toast } from "react-toastify"
import toastConfig from "../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"

import governorContractABI from "../constants/GovernorContract.json"
import governanceTokenABI from "../constants/GovernanceToken.json"
import boxContractABI from "../constants/Box.json"
import contractAddressJSON from "../constants/networkMapping.json"
import { parseEther } from "ethers/lib/utils"

const chainId = process.env.NEXT_PUBLIC_CHAIN_ID

const governorContractAddress = contractAddressJSON[chainId].GovernorContract[0]
const governanceTokenAddress = contractAddressJSON[chainId].GovernanceToken[0]
const boxContractAddress = contractAddressJSON[chainId].Box[0]

export const DAOContext = createContext()

export const DAOProvider = ({ children }) => {
    const { currentAccount, proposalState, voteWay } = useContext(Web3Context)

    // PROPOSE --------------------------------------------------------------------------------------

    const createPropose = async (args, functionToCall, proposalDescription) => {
        try {
            const governor = createEthereumContract(governorContractAddress, governorContractABI)
            const box = createEthereumContract(boxContractAddress, boxContractABI)

            const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args)

            console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`)
            console.log(`Proposal Description:\n  ${proposalDescription}`)
            toast.info(
                `Proposing with proposal description:\n  ${proposalDescription}`,
                toastConfig
            )

            const proposeTx = await governor.propose(
                [box.address], // Contracts that we are using
                [0], // ETH that we pass
                [encodedFunctionCall], // Encoded parameters and function
                proposalDescription // Text that we use ase description
            )

            const proposeReceipt = await proposeTx.wait(1)
            const proposalId = proposeReceipt.events[0].args.proposalId

            console.log(`Proposed with proposal ID:\n  ${proposalId}`)
            toast.success(`Proposed with proposal ID:\n  ${proposalId}`, toastConfig)

            const proposalStateId = await governor.state(proposalId)
            const proposalSnapShot = await governor.proposalSnapshot(proposalId)
            const proposalDeadline = await governor.proposalDeadline(proposalId)

            // Save the proposal
            await storeProposal(
                proposalId.toString(),
                proposalStateId,
                proposalSnapShot.toString(),
                proposalDeadline.toString(),
                currentAccount,
                proposalDescription,
                functionToCall,
                args
            )

            // The state of the proposal. 1 is not passed. 0 is passed.
            console.log(`Current Proposal State: ${proposalState[proposalStateId]}`)
            // What block # the proposal was snapshot
            console.log(`Current Proposal Snapshot: ${proposalSnapShot}`)
            // The block number the proposal voting expires
            console.log(`Current Proposal Deadline: ${proposalDeadline}`)

            console.log("--------------------------------------")
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error(
                "Algo ha ido mal en la realizaci??n de la propuesta, contacta con soprte",
                toastConfig
            )
        }
    }

    // VOTE --------------------------------------------------------------------------------------

    const votePropose = async (proposalIdVoting, vote, reason) => {
        try {
            console.log(`Voting ${voteWay[vote]} on ${proposalIdVoting} with reason ${reason}`)

            const governor = createEthereumContract(governorContractAddress, governorContractABI)

            const voteTx = await governor.castVoteWithReason(proposalIdVoting, vote, reason)

            const voteTxReceipt = await voteTx.wait(1)
            console.log(`Voted with reason: \n ${voteTxReceipt.events[0].args.reason}`)

            toast.success("Has votado!", toastConfig)

            console.log("--------------------------------------")
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error(
                "Algo ha ido mal en la realizaci??n de tu voto, contacta con soprte",
                toastConfig
            )
        }
    }

    // QUEUE --------------------------------------------------------------------------------------

    const queuePropose = async (args, functionToCall, description) => {
        try {
            const governor = createEthereumContract(governorContractAddress, governorContractABI)
            const box = createEthereumContract(boxContractAddress, boxContractABI)

            const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args)

            const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(description))

            console.log("Queueing...")

            const queueTx = await governor.queue(
                [box.address],
                [0],
                [encodedFunctionCall],
                descriptionHash
            )
            await queueTx.wait(1)

            console.log("Queued")
            toast.success("La propuesta se ha puesto en cola", toastConfig)

            console.log("--------------------------------------")
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error(
                "Algo ha ido al poner en cola la propuesta, contacta con soprte",
                toastConfig
            )
        }
    }

    // EXECUTE --------------------------------------------------------------------------------------

    const executePropose = async (args, functionToCall, description) => {
        try {
            const governor = createEthereumContract(governorContractAddress, governorContractABI)
            const box = createEthereumContract(boxContractAddress, boxContractABI)

            const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args)

            const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(description))

            console.log("Executing...")

            const executeTx = await governor.execute(
                [box.address],
                [0],
                [encodedFunctionCall],
                descriptionHash
            )
            await executeTx.wait(1)

            console.log("Executed")
            toast.success("La propuesta se ha ejecutado", toastConfig)

            console.log("--------------------------------------")
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error(
                "Algo ha ido al poner en cola la propuesta, contacta con soprte",
                toastConfig
            )
        }
    }

    // STATUS --------------------------------------------------------------------------------------

    const checkProposalStatus = async (proposalId, logs = false) => {
        try {
            const governor = createEthereumContract(governorContractAddress, governorContractABI)

            const stateTx = await governor.state(proposalId)

            if (logs) {
                console.log(`Current state is ${proposalState[stateTx]}`)
                toast.info(`Current state is ${proposalState[stateTx]}`, toastConfig)
                console.log("--------------------------------------")
            }

            return stateTx
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error(
                "Algo ha ido mal en la comprovaci??n del status, contacta con soprte",
                toastConfig
            )
        }
    }

    const updateProposalStatus = async (proposalFirebaseId) => {
        try {
            const proposalSnapshotData = (
                await getDoc(doc(db, "proposals", proposalFirebaseId))
            ).data()

            const { snapshot, state, proposalId } = proposalSnapshotData

            const actualState = await checkProposalStatus(proposalId)

            if (actualState != state) {
                await updateDoc(doc(db, "proposals", snapshot), {
                    state: actualState,
                })
            }
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error(
                `Ha habido un error actualizando la informaci??n de la propuesta ${proposalFirebaseId}, contacta con soprte`,
                toastConfig
            )
        }
    }

    const updateStoreValue = async () => {
        try {
            const box = createEthereumContract(boxContractAddress, boxContractABI)

            const retrieveTx = await box.retrieve()
            console.log(`El valor de la store es: ${retrieveTx.toString()}`)
            return retrieveTx.toString()
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error(
                `Ha habido un error actualizando la informaci??n de la store, contacta con soprte`,
                toastConfig
            )
        }
    }

    // GOVERNANCE TOKENS --------------------------------------------------------------------------------------

    const getVotingInfo = async (address) => {
        try {
            const governanceToken = createEthereumContract(
                governanceTokenAddress,
                governanceTokenABI
            )

            const delegates = await governanceToken.delegates(address)
            const votesAmount = await governanceToken.getVotes(address)
            const votesBalance = await governanceToken.balanceOf(address)

            // toast.info(`Se ha obtenido tu informaci??n de votaci??n`, toastConfig)

            return { delegates, votesAmount, votesBalance }
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error(
                `Ha habido un error actualizando la informaci??n de los votos, contacta con soprte`,
                toastConfig
            )
        }
    }

    const getOldVotingInfo = async (address, block) => {
        try {
            const governanceToken = createEthereumContract(
                governanceTokenAddress,
                governanceTokenABI
            )

            const votesAmount = await governanceToken.getPastVotes(address, block)

            // toast.info(`Se ha obtenido tu informaci??n de votaci??n`, toastConfig)

            return votesAmount
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    }

    const delegateTokensTo = async (address) => {
        try {
            const governanceToken = createEthereumContract(
                governanceTokenAddress,
                governanceTokenABI
            )

            const delegateTx = await governanceToken.delegate(address)
            await delegateTx.wait(1)
            toast.success(`Se han delegado tus votos`, toastConfig)
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error(`Ha habido un error delegando tus votos, contacta con soprte`, toastConfig)
        }
    }

    const transferTokensTo = async (address, amount) => {
        try {
            const governanceToken = createEthereumContract(
                governanceTokenAddress,
                governanceTokenABI
            )

            const transferTx = await governanceToken.transfer(address, parseEther(amount))
            await transferTx.wait(1)
            toast.success(`Se han transferido tus tokens`, toastConfig)
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error(
                `Ha habido un error transfiriendo tus tokens, contacta con soprte`,
                toastConfig
            )
        }
    }

    // RETURN --------------------------------------------------------------------------------------
    return (
        <DAOContext.Provider
            value={{
                createPropose,
                votePropose,
                queuePropose,
                executePropose,
                checkProposalStatus,
                updateProposalStatus,
                updateStoreValue,
                getVotingInfo,
                getOldVotingInfo,
                delegateTokensTo,
                transferTokensTo,
            }}
        >
            {children}
        </DAOContext.Provider>
    )
}

const createEthereumContract = (contractAddress, contractABI) => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractABI, signer)

    return contract
}

const storeProposal = async (
    proposalId,
    state,
    snapshot,
    deadline,
    proposer,
    description,
    functionToCall,
    args
) => {
    try {
        await setDoc(doc(db, "proposals", snapshot), {
            proposalId,
            state,
            snapshot,
            deadline,
            proposer,
            description,
            functionToCall,
            args,
        })

        toast.success(`Your proposal has been registered`, toastConfig)
    } catch (error) {
        console.log(error.code)
        console.log(error.message)

        toast.error(`There's been an error storing your proposal, contacta con soprte`, toastConfig)
    }
}
