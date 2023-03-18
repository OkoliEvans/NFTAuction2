import { ethers } from "hardhat";

async function main() {
  
  const [ owner, account1 ] = await ethers.getSigners();
  const NftAuction = await ethers.getContractFactory("Auction");
  const nftAuction = await NftAuction.deploy();
  await nftAuction.deployed();
  const nftAuctionAddress = nftAuction.address;
  // console.log(nftAuctionAddress);

  /////////   CONNECT NFT   ///////////
  // const ENFT = "0x3791dC91d33bC7cc4fBFE033478afa06E2E154Bc";
  const BAYC = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
  
  const BAYCAddr = await ethers.getContractAt("IENFT", BAYC);
  
  ///  SET START PRICE ///
  await nftAuction.setStartPrice(ethers.utils.parseEther("0.5"));


  /////////  ASSIGN BENEFICIARY  //////////
  // const beneficiary = "0xc6d123c51c7122d0b23e8B6ff7eC10839677684d";
  const BAYC_holder = "0x08c1AE7E46D4A13b766566033b5C47c735e19F6f";
  await nftAuction.assignBeneficiary(BAYC_holder);
  console.log("successful...");

  ///////////   IMPERSONATE SIGNER  /////////////////////
  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  await helpers.impersonateAccount(BAYC_holder);
  
  const signer = await ethers.getSigner(BAYC_holder);
  console.log("Impersonation cool...");
  

  ///////////  APPROVE SMART CONTRACT  /////////////////
  await BAYCAddr.connect(signer).approve(nftAuctionAddress,1);
  console.log("approved coool...");
  

  ///////// ADD NFT  //////////
  await nftAuction.addNFT(BAYC, 9547);
  console.log("added NFT...");

  //////////// START AUCTION ////////////
  nftAuction.startAuction(1679042970, 1679142970);
  console.log("Auction started...");
  
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
