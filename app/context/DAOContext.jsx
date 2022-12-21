import { useState, useEffect, createContext } from "react"
import { ethers } from "ethers"
import { toast } from "react-toastify"
import fs from "fs"
// TODO: Cambiar el voting period a 300 o algo asi para que sea una horita 12 sec = 1 block

import toastConfig from "../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"

import governorContractABI from "../constants/GovernorContract.json"
import boxContractABI from "../constants/Box.json"
import contractAddressJSON from "../constants/networkMapping.json"
import proposalsFile from "../constants/proposals.json"

const chainId = process.env.NEXT_PUBLIC_CHAIN_ID

const governorContractAddress = contractAddressJSON[chainId].GovernorContract[0]
const boxContractAddress = contractAddressJSON[chainId].Box[0]

export const DAOContext = createContext()

export const DAOProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("")

    // WALLET --------------------------------------------------------------------------------------

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                toast.error(`Install Metamask`, toastConfig)
            }

            const accounts = await ethereum.request({ method: "eth_accounts" })

            if (accounts.length) {
                setCurrentAccount(accounts[0])
                console.log(`Connecting to ${accounts[0]}`)
            } else {
                console.log("No accounts found")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.")

            const accounts = await ethereum.request({ method: "eth_requestAccounts" })

            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object")
        }
    }

    // PROPOSE --------------------------------------------------------------------------------------

    const createPropose = async (args, functionToCall, proposalDescription) => {
        const governor = createEthereumContract(
            governorContractAddress,
            governorContractABI,
            currentAccount
        )
        const box = createEthereumContract(boxContractAddress, boxContractABI, currentAccount)

        const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args)

        console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`)
        console.log(`Proposal Description:\n  ${proposalDescription}`)
        toast.info(`Proposing with proposal description:\n  ${proposalDescription}`, toastConfig)

        const proposeTx = await governor.propose(
            [box.address], // Contracts that we are using
            [0], // ETH that we pass
            [encodedFunctionCall], // Encoded parameters and function
            proposalDescription // Text that we use ase description
        )

        const proposeReceipt = await proposeTx.wait(1)
        const proposalId = proposeReceipt.events[0].args.proposalId
        console.log(`Proposed with proposal ID:\n  ${proposalId}`)
        toast.info(`Proposed with proposal ID:\n  ${proposalId}`, toastConfig)

        const proposalState = await governor.state(proposalId)
        const proposalSnapShot = await governor.proposalSnapshot(proposalId)
        const proposalDeadline = await governor.proposalDeadline(proposalId)

        // Save the proposalId
        storeProposalId(proposalId)

        // The state of the proposal. 1 is not passed. 0 is passed.
        console.log(`Current Proposal State: ${proposalState}`)
        // What block # the proposal was snapshot
        console.log(`Current Proposal Snapshot: ${proposalSnapShot}`)
        // The block number the proposal voting expires
        console.log(`Current Proposal Deadline: ${proposalDeadline}`)

        console.log("--------------------------------------")
    }
    // STATUS --------------------------------------------------------------------------------------

    const checkStatus = async (proposalId) => {
        const governor = createEthereumContract(
            governorContractAddress,
            governorContractABI,
            currentAccount
        )

        const stateTx = await governor.state(proposalId)

        console.log(stateTx)

        console.log("--------------------------------------")
    }

    return (
        <DAOContext.Provider
            value={{
                checkIfWalletIsConnected,
                connectWallet,
                createPropose,
                checkStatus,
                currentAccount,
            }}
        >
            {children}
        </DAOContext.Provider>
    )
}

const createEthereumContract = (contractAddress, contractABI, currentAccount) => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractABI, signer)

    return contract
}

const storeProposalId = (proposalId, chainId) => {
    let proposals

    if (fs.existsSync(proposalsFile)) {
        proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
    } else {
        proposals = {}
        proposals[chainId] = []
    }

    proposals[chainId].push(proposalId.toString())

    fs.writeFileSync(proposalsFile, JSON.stringify(proposals), "utf8")
}
