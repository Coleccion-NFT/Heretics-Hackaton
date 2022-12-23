export const NFTCard = ({ nft }) => {
    const metadata = nft.normalized_metadata
    const name = metadata.name
    const description = metadata.description

    const tokenId = nft.token_id
    const nftAddress = nft.token_address

    const imageURI = metadata.image ? metadata.image : "nft.error"
    const imageURIURL = imageURI.startsWith("ipfs://")
        ? imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
        : imageURI

    return (
        <div className="w-1/4 flex flex-col ">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={imageURIURL}></img>
            </div>
            <div className="flex flex-col gap-y-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
                <div className="flex items-end justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                    <p className="text-gray-600 font-semibold">Id: {tokenId}</p>
                </div>
                <p className="text-gray-600 text-sm truncate">{nftAddress}</p>

                <div className="flex-grow">
                    <p className="text-gray-600 text-xs">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NFTCard
