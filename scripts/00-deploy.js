const hre = require("hardhat");

async function main() {
    // Compile the contract
    await hre.run('compile');

    // Specify the network
    const networkName = 'amoy';

    // Get the signer from the specified network
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // Deploy the contract
    const ContractFactory = await hre.ethers.getContractFactory("MedicalRecords");
    const deployedContract = await ContractFactory.deploy();

    // Wait for deployment to be confirmed
    await deployedContract.deployed();

    console.log(
        `MedicalRecords contract deployed to https://rpc-amoy.polygon.technology/address/${deployedContract.address}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
