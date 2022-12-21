const { network } = require("hardhat")
const { developmentChains, MIN_DELAY } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
// TODO: Change to BSC

const deployTimeLock = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    let args = [MIN_DELAY, [], [], deployer]

    log("----------------------------------------------------")
    log("Deploying TimeLock and waiting for confirmations...")

    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args: args,
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log(`TimeLock at ${timeLock.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(timeLock.address, args)
        log("Verified")
    }

    log("--------------------------------------")
}

module.exports = deployTimeLock
deployTimeLock.tags = ["all", "timeLock", "DAO"]
