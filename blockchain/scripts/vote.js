const { ethers, network } = require("hardhat")
const fs = require("fs")
const { proposalsFile, developmentChains, VOTING_PERIOD } = require("../helper-hardhat-config")
const { moveBlocks } = require("../utils/move-blocks")

async function main() {
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))

    // Get the last proposal for the network. You could also change it for your index
    const proposalId = proposals[network.config.chainId].at(-1)

    // 0 = Against, 1 = In favor, 2 = Abstain for this example
    const voteWay = 1
    const reason = "I lika do da cha cha"

    await vote(proposalId, voteWay, reason)
}

async function vote(proposalId, voteWay, reason) {
    console.log("Voting...")

    const governor = await ethers.getContract("GovernorContract")

    const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason)

    const voteTxReceipt = await voteTx.wait(1)
    console.log(`Reason: \n ${voteTxReceipt.events[0].args.reason}`)

    const proposalState = await governor.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)

    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1)
    }
    console.log("Voted! Ready to go!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
