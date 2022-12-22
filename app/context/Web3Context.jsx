import { createContext, useState } from "react"
import { web3 } from "../backend/web3"

import { toast } from "react-toastify"
import toastConfig from "../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"

export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
    const [publicAddress, setPublicAddress] = useState("")
    const [encryptedPrivateKey, setEncryptedPrivateKey] = useState("")
    const [currentAccount, setCurrentAccount] = useState("")

    const proposalState = [
        "Pending",
        "Active",
        "Canceled",
        "Defeated",
        "Succeeded",
        "Queued",
        "Expired",
        "Executed",
    ]

    const voteWay = ["Against", "In favor", "Null"]

    const generateEntropy = () => {
        return web3.utils.sha3(Math.random(0, 1000000).toString(16) + web3.utils.randomHex(32))
    }

    const createPairKeys = (passwordForPrivateKeyEncrypt) => {
        const entropy = generateEntropy()
        const account = web3.eth.accounts.create(entropy)

        setPublicAddress(account.address)

        const encryptedPrivateKey = web3.eth.accounts.encrypt(
            account.privateKey,
            passwordForPrivateKeyEncrypt
        )
        setEncryptedPrivateKey(encryptedPrivateKey)
        // toast.info("Tu wallet personal ha sido creada correctamente", {
        //     position: "bottom-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        // })

        return [account.address, encryptedPrivateKey]
    }

    const truncateStr = (fullStr, strLen) => {
        if (fullStr.length <= strLen) return fullStr

        const separator = "..."
        const separatorLength = separator.length
        const charToShow = strLen - separatorLength
        const frontChars = Math.ceil(charToShow / 2)
        const backChars = Math.floor(charToShow / 2)
        return (
            fullStr.substring(0, frontChars) +
            separator +
            fullStr.substring(fullStr.length - backChars)
        )
    }

    // WALLET --------------------------------------------------------------------------------------

    const checkIfWalletIsConnected = async () => {
        try {
            let { ethereum } = window
            if (!ethereum) {
                toast.error(`Please install Metamask`, toastConfig)
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
            let { ethereum } = window
            if (!ethereum) {
                toast.error(`Install Metamask`, toastConfig)
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" })

            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)

            toast.error(`Ha habido un error conectando tu wallet`, toastConfig)
        }
    }

    return (
        <Web3Context.Provider
            value={{
                createPairKeys,
                checkIfWalletIsConnected,
                connectWallet,
                truncateStr,
                publicAddress,
                encryptedPrivateKey,
                currentAccount,
                proposalState,
                voteWay,
            }}
        >
            {children}
        </Web3Context.Provider>
    )
}
