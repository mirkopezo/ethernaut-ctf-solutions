const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x1482Bc19853FB80a99461DB902b763A90c8bCE7f";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("ShopAttack");
  const contract = await Contract.deploy(instanceAddress);

  // Attack

  await contract.attack();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
