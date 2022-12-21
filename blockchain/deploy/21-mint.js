const { network, ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts()

    const creatorNft = await ethers.getContract("CreatorNft", deployer)
    const CreatorMintTx = await creatorNft.requestNft(0)
    await CreatorMintTx.wait(1)
    console.log(`Creator NFT index 0 tokenURI: ${await creatorNft.tokenURI(1)}`)

    const creatorNft1 = await ethers.getContract("CreatorNft", deployer)
    const CreatorMintTx1 = await creatorNft.requestNft(1)
    await CreatorMintTx.wait(1)
    console.log(`Creator NFT index 1 tokenURI: ${await creatorNft1.tokenURI(2)}`)
}
module.exports.tags = ["all", "mint", "Nfts"]
