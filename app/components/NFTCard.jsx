export const NFTCard = ({ nft }) => {
    const metadata = nft.metadata
    console.log(metadata)
    const name = metadata.name
    const description = metadata.description

    const tokenId = nft.id.tokenId
    const nftAddress = nft.contract.address

    const imageURI = metadata.image ? metadata.image : "nft.error"
    const imageURIURL = imageURI.startsWith("ipfs://")
        ? imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
        : imageURI

    return (
        <div className="w-1/4 flex flex-col ">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={imageURIURL}></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
                <div className="">
                    <h2 className="text-xl text-gray-800">{name}</h2>
                    <p className="text-gray-600">Id: {tokenId}</p>
                    <p className="text-gray-600">{nftAddress}</p>
                </div>

                <div className="flex-grow mt-2">
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NFTCard
