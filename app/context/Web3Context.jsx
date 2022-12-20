import { createContext, useState } from "react"
import { web3 } from "../backend/web3"
import { toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
    const [publicAddress, setPublicAddress] = useState("")
    const [encryptedPrivateKey, setEncryptedPrivateKey] = useState("")

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

    return (
        <Web3Context.Provider
            value={{
                createPairKeys,
                publicAddress,
                encryptedPrivateKey,
            }}
        >
            {children}
        </Web3Context.Provider>
    )
}
