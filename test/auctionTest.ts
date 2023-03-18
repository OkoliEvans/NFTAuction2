import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Nft Blind Auction", function() {
  it("Deployment should initialize an NFT auction contract and assign Admin role to  msg.sender", async function() {
    const nftAuctionAddress = "0x773330693cb7d5D233348E25809770A32483A940";
    const deployer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const beneficiary = "0xc6d123c51c7122d0b23e8B6ff7eC10839677684d";
    
    const NftAuction = await ethers.getContractFactory("Auction");
    const nftAuction = await NftAuction.deploy();
    await nftAuction.deployed();
    
    //////////////  CONNECT INTERFACE  ////////////////
    
    const [ owner, account1, account3 ] = await ethers.getSigners();

    const ENFT = "0x3791dC91d33bC7cc4fBFE033478afa06E2E154Bc"
    const ENftToken = await ethers.getContractAt("IENFT", ENFT);

    console.log(await nftAuction.getAdmin());
    console.log(await nftAuction.getContractAddress());



    const startPrice = ethers.utils.parseEther("0.5");
    await nftAuction.setStartPrice(startPrice);
    await nftAuction.assignBeneficiary(owner);

    /// APPROVE CONTRACT TO TRADE NFT

    await ENftToken.connect(owner).approve(nftAuctionAddress, 200);
    console.log("Approval successful...");
    

    // await nftAuction.addNFT(ENFT, 200);
    // await nftAuction.startAuction(1679042970, 1679142970);


    // expect(await nftAuction.checkDuration).to.equal(100000);
    
    // address NFTOwner20 = address(0x9fE9e92012e97f6F0C884fEe5436D4f07B505517);
    // address NFTOwner23 = address(0x14ae8100Ea85a11bbb36578f83AB1b5C1cFDd61c);
    // address boredApeNft = address(0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D);
    // uint idOfNFT = 20;
    // uint idOfNFT2 = 23;

  });
});