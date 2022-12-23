const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

const tokenUris = [
    "ipfs://QmeoBxoSSoJG4X8vFrZsSRXFtp2bfhW2bZnqiNPKiefjrh",
    "ipfs://QmXQKobHR79p3TYco31QGiqEE6NPtsaXcZWzsNWgRuadcS",
    "ipfs://QmWhHtcLAN9SuzxXj4zjEMhuS8uQgNPQ5cWVBRtL2d6Rew",
    "ipfs://QmXA7pt5ysG6VVWTstx5DmF2iiAmKmgXgCnFPfgw1vKGNn",
    "ipfs://QmdbmyNpna3DHDuNqwf88nk7bHZAJgQ4jPTzBd6NaVxCVf",
    "ipfs://Qmcyz1hqrCcznBhMeAiGCgRUX4vChbF9t3UVtW2qhCwvmo",
    "ipfs://QmPda6TMHcQvB6XfWqoeJwH4v6ZcrmT7itcbi3hxjQ5zhi",
    "ipfs://QmQECjkqMcHmzGmDyyq1TyXpQurf3v7Mk6xBfr2bgGQPKM",
    "ipfs://QmSQWofL8jQn1LF2NAka2CrdiDYUpVi7xpBm6gzPkE9Pzd",
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

    log(`creatorNft adress: ${creatorNft.address}`)

    log("----------------------------------------------")

    if (!developmentChains.includes(network.name) && process.env.ETHERESCAN_API_KEY) {
        log("Verifying...")
        await verify(randomIpfsNft.address, args)
    }
}

module.exports.tags = ["all", "creatorNft", "Nfts"]
