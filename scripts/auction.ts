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

  
  ///////////   IMPERSONATE SIGNER  /////////////////////
  const BAYC_holder = "0x08c1AE7E46D4A13b766566033b5C47c735e19F6f";
  const impersonatedSigner = await ethers.getImpersonatedSigner(BAYC_holder);
  console.log("Impersonation cool...");
  

  /////////  ASSIGN BENEFICIARY  //////////
  await nftAuction.assignBeneficiary(BAYC_holder);
  console.log("successful...");

  ///////////  APPROVE SMART CONTRACT  /////////////////
  await BAYCAddr.connect(impersonatedSigner).approve(nftAuctionAddress,9547);
  console.log("approved coool...");
  

  ///////// ADD NFT  //////////
  await nftAuction.addNFT(BAYC, 9547);
  console.log("added NFT...");

  //////////// START AUCTION ////////////
  nftAuction.startAuction(1679042970, 1679142970);
  console.log("Auction started...");
  
  ///////////  ENTER BID  ///////////
  // nftAuction.enterBid();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
