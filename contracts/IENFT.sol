//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IENFT {

    function balanceOf(address owner) external view returns (uint256 balance);

    function approve(address to, uint256 tokenId) external;

     function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

}