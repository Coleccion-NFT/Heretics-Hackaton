import { useState, useEffect, createContext, useContext } from "react"
import { ethers } from "ethers"

import { Web3Context } from "./Web3Context"

import { toast } from "react-toastify"
import toastConfig from "../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"

import creatorNftABI from "../constants/CreatorNft.json"
import contractAddressJSON from "../constants/networkMapping.json"

const chainId = process.env.NEXT_PUBLIC_CHAIN_ID

const creatorNftContractAddress = contractAddressJSON[chainId].CreatorNft[0]

export const CreatorNftContext = createContext()

export const CreatorNftProvider = ({ children }) => {
    const { currentAccount } = useContext(Web3Context)

    // mintCreatorNft
    const mintNft = async (creatorTokenIdType) => {
        try {
            const creatorNft = createEthereumContract(creatorNftContractAddress, creatorNftABI)

            const creatorNftTx = await creatorNft.requestNft(creatorTokenIdType)
            await creatorNftTx.wait(1)

            toast.success(`Nft con id ${creatorTokenIdType} minteado`, toastConfig)

            console.log("--------------------------------------")
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error("Ha habido un error en el minteo", toastConfig)
        }
    }

    // RETURN --------------------------------------------------------------------------------------
    return <CreatorNftContext.Provider value={{ mintNft }}>{children}</CreatorNftContext.Provider>
}

const createEthereumContract = (contractAddress, contractABI) => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractABI, signer)

    return contract
}
