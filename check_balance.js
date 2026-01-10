const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://ethereum-sepolia.publicnode.com");

const TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

const AIRDROP_ADDRESS = "0xE9083563F123a455560F63C306534AC9e0DBAcA3";
const TOKEN_ADDRESS = "0x0654eaD0f0eada845ac5FcDe61788CA0f2d8b320";

async function main() {
  const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);
  const balance = await tokenContract.balanceOf(AIRDROP_ADDRESS);
  console.log("Airdrop Contract Balance: " + ethers.utils.formatEther(balance));
}

main();
