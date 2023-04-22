// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import {IForta} from "./DoubleEntryPoint.sol";

contract DoubleEntryPointAttack is Ownable {
    address public cryptoVault;
    address public forta;

    constructor(address cryptoVault_, address forta_) {
        cryptoVault = cryptoVault_;
        forta = forta_;
    }

    function handleTransaction(address, bytes calldata msgData) external {
        if (msg.sender != forta) revert();

        address origSender;
        (, , origSender) = abi.decode(msgData[4:], (address, uint256, address));
        if (origSender == cryptoVault) {
            IForta(forta).raiseAlert(owner());
        }
    }
}
