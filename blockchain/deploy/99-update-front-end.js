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
    const governanceToken = await ethers.getContract("GovernanceToken")
    const box = await ethers.getContract("Box")

    const chainId = network.config.chainId.toString()

    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))

    if (chainId in contractAddresses) {
        if (contractAddresses[chainId]["GovernorContract"]) {
            if (!contractAddresses[chainId]["GovernorContract"].includes(governor.address)) {
                contractAddresses[chainId]["GovernorContract"].push(governor.address)
            }
        } else {
            contractAddresses[chainId] = {
                ...contractAddresses[chainId],
                GovernorContract: [governor.address],
            }
        }
        if (contractAddresses[chainId]["Box"]) {
            if (!contractAddresses[chainId]["Box"].includes(box.address)) {
                contractAddresses[chainId]["Box"].push(box.address)
            }
        } else {
            contractAddresses[chainId] = { ...contractAddresses[chainId], Box: [box.address] }
        }
        if (contractAddresses[chainId]["GovernanceToken"]) {
            if (!contractAddresses[chainId]["GovernanceToken"].includes(governanceToken.address)) {
                contractAddresses[chainId]["GovernanceToken"].push(governanceToken.address)
            }
        } else {
            contractAddresses[chainId] = {
                ...contractAddresses[chainId],
                GovernanceToken: [governanceToken.address],
            }
        }

        fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
    }
}

async function updateAbi() {
    const governor = await ethers.getContract("GovernorContract")
    const governanceToken = await ethers.getContract("GovernanceToken")
    const box = await ethers.getContract("Box")

    fs.writeFileSync(
        `${frontEndAbiLocation}GovernorContract.json`,
        governor.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndAbiLocation}GovernanceToken.json`,
        governanceToken.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndAbiLocation}Box.json`,
        box.interface.format(ethers.utils.FormatTypes.json)
    )
}

module.exports.tags = ["all", "frontend", "DAO"]
