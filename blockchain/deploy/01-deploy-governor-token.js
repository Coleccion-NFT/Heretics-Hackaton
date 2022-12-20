const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
// TODO: Change to BSC

const deployGovernanceToken = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    let args = []

    log("----------------------------------------------------")
    log("Deploying GovernanceToken and waiting for confirmations...")

    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: args,
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log(`GovernanceToken at ${governanceToken.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(governanceToken.address, args)
        log("Verified")
    }

    log(`Delegating to ${deployer}`)
    await delegate(governanceToken.address, deployer)
    log("Delegated!")
}

const delegate = async (governanceTokenAddress, delegatedAccount) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)

    const transactionResponse = await governanceToken.delegate(delegatedAccount)
    await transactionResponse.wait(1)

    console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)

    log("--------------------------------------")
}

module.exports = deployGovernanceToken
deployGovernanceToken.tags = ["all", "governorToken", "governor", "DAO"]
