const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
// TODO: Change to BSC

const deployBox = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()

    let args = []

    log("----------------------------------------------------")
    log("Deploying Box and waiting for confirmations...")

    const box = await deploy("Box", {
        from: deployer,
        args: args,
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log(`Box at ${box.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(box.address, args)
        log("Verified")
    }

    const boxContract = await ethers.getContractAt("Box", box.address)
    const timeLockAddress = (await get("TimeLock")).address
    const transferTx = await boxContract.transferOwnership(timeLockAddress)
    await transferTx.wait(1)

    log(`Ownership transfered`)

    log("--------------------------------------")
}

module.exports = deployBox
deployBox.tags = ["all", "box", "DAO"]
