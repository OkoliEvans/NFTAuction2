import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Nft Blind Auction", function() {
  it("Deployment should initialize an NFT auction contract and assign Admin role to  msg.sender", async function() {
    const [ owner ] = await ethers.getSigners();

    const NftAuction = await ethers.getContractFactory("Auction");
    const nftAuction = await NftAuction.deploy();
    await nftAuction.deployed();
    const nftAuctionAddress = nftAuction.getAddress();

    const beneficiary = "0x9fE9e92012e97f6F0C884fEe5436D4f07B505517";

    const startPrice = ethers.parseEther("0.5");
    await nftAuction.setStartPrice(startPrice);
    await nftAuction.assignBeneficiary();




    expect(nftAuction.);
    
    // address NFTOwner20 = address(0x9fE9e92012e97f6F0C884fEe5436D4f07B505517);
    // address NFTOwner23 = address(0x14ae8100Ea85a11bbb36578f83AB1b5C1cFDd61c);
    // address boredApeNft = address(0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D);
    // uint idOfNFT = 20;
    // uint idOfNFT2 = 23;

  });
});