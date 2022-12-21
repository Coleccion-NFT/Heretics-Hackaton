const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

const tokenUris = [
    "ipfs://QmVY3rdgjrCcTfApLHZmGLpgNiV3FWkRdXM3crq6rHQT6w",
    "ipfs://QmVFZKNGrUtwASkrAmWtUuKBM18xZQGC9hLic33QjkVjdP",
    "ipfs://QmdoZZyGhqo3a1dQhjAfiu7VSxGJ1ipCLZQTZm66ddecWs",
    "ipfs://QmcgRWxcGRjusDd4S67fjtzTVycTfqBjU71P6W31KJetSS",
    "ipfs://QmerJNKNUKievT8GRV2THQxxNsCN8qd6Mni3Fge2YFNqnk",
    "ipfs://QmXS8hpkyPTcogePFdKiZvC8afFrwUQbPVL3FVChsDskic",
    "ipfs://Qmbk6KjyvX3eWxTShFkhDm329wLBGz5ZP7LV1j9XSUkh2c",
    "ipfs://QmX1aszDMsJid88RYd8YA7LT6Td33r6ACqMHoUJKz7sZwt",
    "ipfs://QmRCqAvSCUqLCSdBHsAC6iT5o2WyeVHXbAKPwfb4y6xSa6",
]

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = [tokenUris]

    const creatorNft = await deploy("CreatorNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("----------------------------------------------")

    if (!developmentChains.includes(network.name) && process.env.ETHERESCAN_API_KEY) {
        log("Verifying...")
        await verify(randomIpfsNft.address, args)
    }
}

module.exports.tags = ["all", "creatorNft", "Nfts"]
