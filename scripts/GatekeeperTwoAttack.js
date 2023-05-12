const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x011b9eb54BDD0Dd3e8D34b2be95C5bb521a0F7c0";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const AttackContract = await ethers.getContractFactory("GatekeeperTwoAttack");
  const attackContract = await AttackContract.deploy(instanceAddress);
  await attackContract.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
