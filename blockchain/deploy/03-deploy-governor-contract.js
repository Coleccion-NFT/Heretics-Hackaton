const { network } = require("hardhat")
const {
    developmentChains,
    QUORUM_PERCENTAGE,
    VOTING_PERIOD,
    VOTING_DELAY,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
// TODO: Change to BSC

const deployGovernorContract = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()

    const governanceToken = await get("GovernanceToken")
    const timeLock = await get("TimeLock")

    const args = [
        governanceToken.address,
        timeLock.address,
        QUORUM_PERCENTAGE,
        VOTING_PERIOD,
        VOTING_DELAY,
    ]

    log("----------------------------------------------------")
    log("Deploying GovernorContract and waiting for confirmations...")

    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: args,
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log(`GovernorContract at ${governorContract.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(governorContract.address, args)
        log("Verified")
    }
}

module.exports = deployGovernorContract
deployGovernorContract.tags = ["all", "governorContract", "governor", "DAO"]
