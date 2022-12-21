const { ethers } = require("hardhat")
const { ADDRESS_ZERO } = require("../helper-hardhat-config")
// TODO: Change to BSC

const setupContracts = async ({ getNamedAccounts, deployments }) => {
    const { log, get } = deployments
    const { deployer } = await getNamedAccounts()

    const governanceTokenAddress = (await get("GovernanceToken")).address
    const timeLockAddress = (await get("TimeLock")).address
    const governorAddress = (await get("GovernorContract")).address

    const governanceToken = await ethers.getContract("GovernanceToken")
    const timeLock = await ethers.getContract("TimeLock")
    const governor = await ethers.getContract("GovernorContract")

    log("----------------------------------------------------")
    log("Setting up contracts for roles...")

    const proposerRole = await timeLock.PROPOSER_ROLE()
    const executorRole = await timeLock.EXECUTOR_ROLE()
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

    const proposerTx = await timeLock.grantRole(proposerRole, governor.address)
    await proposerTx.wait(1)
    const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
    await executorTx.wait(1)
    const revokeTx = await timeLock.revokeRole(adminRole, deployer)
    await revokeTx.wait(1)

    log(`Contracts set up done`)

    log("--------------------------------------")
}

module.exports = setupContracts
setupContracts.tags = ["all", "setup", "DAO"]
