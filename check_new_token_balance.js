const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://ethereum-sepolia.publicnode.com");

const TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

const AIRDROP_ADDRESS = "0xE9083563F123a455560F63C306534AC9e0DBAcA3";
const NEW_TOKEN_ADDRESS = "0x27B6918629A1f04a709007fae6f3CDfD7f37B7F7";

async function main() {
  try {
    const tokenContract = new ethers.Contract(NEW_TOKEN_ADDRESS, TOKEN_ABI, provider);
    const balance = await tokenContract.balanceOf(AIRDROP_ADDRESS);
    console.log("Airdrop Contract Balance of New Token: " + ethers.utils.formatEther(balance));
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}

main();
