const { ethers, run, network } = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("---Deploying contract---");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Contract address: ${simpleStorage.address}`);

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  //Interaction with the functions
  const currentValue = await simpleStorage.favoriteNumber();
  console.log(`Current valus is: ${currentValue}`);

  const updateValue = await simpleStorage.store("69");
  await updateValue.wait(1);
  const newValue = await simpleStorage.favoriteNumber();
  console.log(`Current valus is: ${newValue}`);
}

async function verify(contractAddress, args) {
  //args: constructor args
  console.log("---Beginning verification---");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Contract already verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
