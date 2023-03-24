const { ethers } = require("hardhat");
const contractArtifact = require("../artifacts/contracts/MagicNumberAttack.yul/MagicNumberAttack.json");

async function main() {
  const instanceAddress = "0x61999270433159b92DAE16fE8b5854484a9EeD68";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory(
    contractArtifact.abi,
    contractArtifact.bytecode
  );
  const contract = await Contract.deploy();

  const Instance = await ethers.getContractFactory("MagicNumber");
  const instance = Instance.attach(instanceAddress);

  // Attack

  await instance.setSolver(contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
