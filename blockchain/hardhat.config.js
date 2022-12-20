require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const GOERLI_TESTNET_RPC_URL =
    process.env.GOERLI_TESTNET_RPC_URL || "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
            gasPrice: 130000000000,
            gas: 12000000,
            blockGasLimit: 0x1fffffffffffff,
        },
        localhost: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
            gasPrice: 130000000000,
            gas: 12000000,
            blockGasLimit: 0x1fffffffffffff,
        },
        ganache: {
            url: "HTTP://127.0.0.1:7545",
            accounts: ["016ebbc96fe5c84af02247bcbbc1f6214851db797590b32f856ca843cec4f4b2"],
            chainId: 1337,
            gas: 6721975,
            gasPrice: 20000000000,
        },
        goerli: {
            url: GOERLI_TESTNET_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
            gas: 2100000,
            gasPrice: 8000000000,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
        ],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer.
            // Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
    mocha: {
        timeout: 200000, // 200 seconds max for running tests
    },
}
