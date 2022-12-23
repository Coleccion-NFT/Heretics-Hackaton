import { useState, useEffect, useContext } from "react"
import { NFTCard } from "../components"

import { Web3Context } from "../context/Web3Context"

import contractAddressJSON from "../constants/networkMapping.json"

const MyNfts = () => {
    const { checkIfWalletIsConnected, connectWallet, currentAccount } = useContext(Web3Context)

    const creatorNftContractAddress =
        contractAddressJSON[process.env.NEXT_PUBLIC_CHAIN_ID].CreatorNft[0]
    const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    const apiKeyMoralis = process.env.NEXT_PUBLIC_MORALIS_API_KEY

    const [NFTs, setNFTs] = useState([])

    const fetchNFTs = async () => {
        try {
            if (currentAccount) {
                console.log("Fetching nfts...")

                var requestOptions = {
                    method: "GET",
                    headers: { accept: "application/json", "X-API-Key": `${apiKeyMoralis}` },
                }

                let baseURL = `https://deep-index.moralis.io/api/v2`

                let nfts
                let fetchURL = `${baseURL}/${currentAccount}/nft?chain=bsc%20testnet&format=decimal&token_addresses=0x171b14a6505923e29ba195d7bc1a31a546fecd0b&normalizeMetadata=true`

                nfts = await fetch(fetchURL, requestOptions)
                    .then((data) => data.json())
                    .catch((error) => console.error({ error }))

                if (nfts) {
                    setNFTs(nfts.result)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Anonymus function
        ;(async () => {
            await checkIfWalletIsConnected()
            await fetchNFTs()
        })()
    }, [currentAccount])

    return (
        <>
            {!currentAccount ? (
                <div className="h-screen flex flex-col items-center justify-center">
                    <button
                        className="bg-black text-white px-9 py-1.5 my-5 w-80 text-center"
                        type="button"
                        onClick={async (e) => {
                            await connectWallet()
                        }}
                    >
                        Conéctate a Metamask
                    </button>
                </div>
            ) : (
                <>
                    <div className="w-full h-screen flex flex-col items-center justify-start pl-8 pr-4 py-14">
                        <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-5 justify-center">
                            {NFTs?.length &&
                                NFTs.map((nft, index) => {
                                    return <NFTCard key={index} nft={nft} />
                                })}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default MyNfts
