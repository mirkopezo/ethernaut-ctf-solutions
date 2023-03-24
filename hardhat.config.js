require("@nomicfoundation/hardhat-toolbox");
require("@tovarishfin/hardhat-yul");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
      {
        version: "0.6.0",
      },
    ],
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY, process.env.SECONDARY_PRIVATE_KEY],
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY, process.env.SECONDARY_PRIVATE_KEY],
    },
  },
};
