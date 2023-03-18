const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x65DEF3dD4e73f16B59f67A72F7A6B2b58Aef2597";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("ElevatorAttack");
  const contract = await Contract.deploy(instanceAddress);

  // Attack

  await contract.attack();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
