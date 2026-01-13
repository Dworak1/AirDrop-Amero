import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";

//INTERNAL IMPORT
import airdrop from "./airdrop.json";
import AmeroToken from "./AmeroToken.json";

export const airdrop_ADDRESS = "0x00C90f104558eD14491d9BAbcB7C0eA767E65DCD";
const airdrop_ABI = airdrop.abi;

//AMEROTOKEN
export const AMEROTOKEN_ADDRESS = "0x62B9330aAeDB14A0853a61eE4875437ca0b10301";
const AmeroToken_ABI = AmeroToken.abi;

const fetchContract = (signer, ABI, ADDRESS) =>
  new ethers.Contract(ADDRESS, ABI, signer);

const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia Test Network",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/demo"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  bscTestnet: {
    chainId: `0x${Number(97).toString(16)}`,
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "tBNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

export const handleNetworkSwitch = async () => {
  const networkName = "bscTestnet"; // Change to "bsc" for mainnet
  await changeNetwork({ networkName });
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networks[networkName].chainId }],
    });
  } catch (switchError) {
    // This error code 4902 indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks[networkName],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding network:", addError.message);
      }
    } else {
      console.log("Error switching network:", switchError.message);
    }
  }
};

export const web3Provider = async () => {
  try {
    // Try standard connection first
    if (typeof window !== "undefined" && window.ethereum) {
      return new ethers.providers.Web3Provider(window.ethereum);
    }
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    return provider;
  } catch (error) {
    console.log(error);
  }
};

export const AirdropContract = async () => {
  try {
    let provider;
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      provider = new ethers.providers.Web3Provider(connection);
    }

    // We use getSigner() to allow write transactions if possible
    const signer = provider.getSigner();
    const contract = fetchContract(signer, airdrop_ABI, airdrop_ADDRESS);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const AmeroTokenContract = async () => {
  try {
    let provider;
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      provider = new ethers.providers.Web3Provider(connection);
    }

    const signer = provider.getSigner();
    const contract = fetchContract(signer, AmeroToken_ABI, AMEROTOKEN_ADDRESS);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const getBalance = async () => {
  try {
    let provider;
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      provider = new ethers.providers.Web3Provider(connection);
    }

    const signer = provider.getSigner();
    return await signer.getBalance();
  } catch (error) {
    console.log(error);
  }
};
