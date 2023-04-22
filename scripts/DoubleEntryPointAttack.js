const { ethers } = require("hardhat");

async function main() {
  const fortaContractAddr = "0x426007FF60D39Ec34C23238C9136fbeE9DBf38FB";
  const cryptoVaultAddr = "0x9a1f29e411014EAA56d2535490D26e3aAB6Cd7c0";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Forta = await ethers.getContractFactory("Forta");
  const forta = Forta.attach(fortaContractAddr);

  const DetectionBot = await ethers.getContractFactory(
    "DoubleEntryPointAttack"
  );
  const detectionBot = await DetectionBot.deploy(
    cryptoVaultAddr,
    fortaContractAddr
  );
  await detectionBot.deployed();

  // Attack

  await forta.setDetectionBot(detectionBot.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
