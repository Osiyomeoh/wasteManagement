// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WasteToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("WasteToken", "WST") {
        _mint(msg.sender, initialSupply);
    }

    // Function to mint new tokens, only callable by the owner (admin)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Function to burn tokens, only callable by the owner (admin)
    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}

