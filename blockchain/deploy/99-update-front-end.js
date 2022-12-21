const { ethers, network } = require("hardhat")
const fs = require("fs")

const frontEndContractsFile = "../app/constants/networkMapping.json"
const frontEndAbiLocation = "../app/constants/"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating the frontend...")
        await updateContractAddresses()
        await updateAbi()
    }
}

async function updateContractAddresses() {
    const governor = await ethers.getContract("GovernorContract")
    const box = await ethers.getContract("Box")
    const creatorNft = await ethers.getContract("CreatorNft")

    const chainId = network.config.chainId.toString()

    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))

    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["GovernorContract"].includes(governor.address)) {
            contractAddresses[chainId]["GovernorContract"].push(governor.address)
        } else {
            contractAddresses[chainId] = { GovernorContract: [governor.address] }
        }
        if (contractAddresses[chainId]["Box"]) {
            if (!contractAddresses[chainId]["Box"].includes(box.address)) {
                contractAddresses[chainId]["Box"].push(box.address)
            }
        } else {
            contractAddresses[chainId] = { Box: [box.address] }
        }
        if (contractAddresses[chainId]["CreatorNft"]) {
            if (!contractAddresses[chainId]["CreatorNft"].includes(creatorNft.address)) {
                contractAddresses[chainId]["CreatorNft"].push(creatorNft.address)
            }
        } else {
            contractAddresses[chainId] = { CreatorNft: [creatorNft.address] }
        }

        fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
    }
}

async function updateAbi() {
    const governor = await ethers.getContract("GovernorContract")
    const box = await ethers.getContract("Box")
    const creatorNft = await ethers.getContract("CreatorNft")

    fs.writeFileSync(
        `${frontEndAbiLocation}GovernorContract.json`,
        governor.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndAbiLocation}Box.json`,
        box.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndAbiLocation}CreatorNft.json`,
        creatorNft.interface.format(ethers.utils.FormatTypes.json)
    )
}

module.exports.tags = ["all", "frontend", "DAO", "Nfts"]
