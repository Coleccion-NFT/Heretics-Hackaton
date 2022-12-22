import { useState } from "react"
import { NFTCard } from "../components"

const MyNfts = () => {
    const [wallet, setWalletAddress] = useState("")
    const [NFTs, setNFTs] = useState([])
    const [chain, setChain] = useState("eth")

    const fetchNFTs = async () => {
        console.log("Fetching nfts...")
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        }

        const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

        let baseURL
        switch (chain) {
            case "eth":
                baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs`
                break
            case "polygon":
                baseURL = `https://polygon-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs`
                break
            case "goerli":
                baseURL = `https://eth-goerli.g.alchemy.com/nft/v2/${apiKey}/getNFTs`
                break
            default:
                baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs`
                break
        }
        console.log("BaseURL: " + baseURL)

        let nfts
        console.log("Fetching nfts owned by address...")

        const fetchURL = `${baseURL}?owner=${wallet}&pageSize=100&withMetadata=true`
        console.log("Fetching URL: " + fetchURL)

        nfts = await fetch(fetchURL, requestOptions)
            .then((data) => data.json())
            .catch((error) => console.log("error", error))

        if (nfts) {
            console.log("NFTs:", nfts)
            setNFTs(nfts.ownedNfts)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center py-8 gap-y-3">
            <div className="flex flex-col w-full justify-center items-center gap-y-2">
                <input
                    type="text"
                    placeholder="Add your wallet address"
                    value={wallet}
                    onChange={(e) => {
                        setWalletAddress(e.target.value)
                    }}
                ></input>{" "}
                <label>
                    Choose a chain:
                    <select value={chain} onChange={(e) => setChain(e.target.value)}>
                        <option value="eth">Ethereum</option>
                        <option value="polygon">Polygon</option>
                        <option value="goerli">Goerli</option>
                    </select>
                </label>
                <button
                    className={
                        "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
                    }
                    onClick={async (e) => {
                        e.preventDefault()
                        console.log("Clicked!")
                        await fetchNFTs()
                    }}
                >
                    Let's go!{" "}
                </button>
            </div>

            <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
                {NFTs.length &&
                    NFTs.map((nft, index) => {
                        return <NFTCard key={index} nft={nft} />
                    })}
            </div>
        </div>
    )
}

export default MyNfts
