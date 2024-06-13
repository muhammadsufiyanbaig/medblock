require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {},
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [privateKeys], 
    },
  },
};
