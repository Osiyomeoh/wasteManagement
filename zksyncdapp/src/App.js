import React, { useState, useEffect } from "react";
import { Web3 } from "web3";
import { Web3ZKsyncL2, ZKsyncPlugin, ZKsyncWallet, types } from "web3-plugin-zksync";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    // Initialize Web3 and zkSync Plugin
    async function initWeb3() {
      const web3Instance = new Web3("https://rpc2.sepolia.org");
      web3Instance.registerPlugin(new ZKsyncPlugin(Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia)));
      setWeb3(web3Instance);

      if (window.ethereum) {
        try {
          // Request account access if needed
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.error("Please install MetaMask or another Ethereum wallet");
      }
    }

    initWeb3();
  }, []);

  const connectWallet = async () => {
    if (web3) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    }
  };

  const getBalance = async () => {
    if (account && web3) {
      const balance = await web3.eth.getBalance(account);
      setBalance(web3.utils.fromWei(balance, 'ether'));
    }
  };

  const mintTokens = async () => {
    const PRIVATE_KEY = "YOUR_PRIVATE_KEY"; // In a real app, avoid storing this in the frontend
    const wallet = new ZKsyncWallet(PRIVATE_KEY);
    const wasteTokenAbi = "Your_WasteToken_ABI";
    const wasteTokenAddress = "Your_WasteToken_Address";

    // Initialize WasteToken contract instance
    const wasteTokenContract = new web3.eth.Contract(wasteTokenAbi, wasteTokenAddress);

    const mintAmount = web3.utils.toWei('10', 'ether');
    await wasteTokenContract.methods.mint(account, mintAmount).send({
      from: account
    });

    alert("Minted 10 tokens");
  };

  return (
    <div>
      <h1>zkSync DApp</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <p>Connected Account: {account}</p>
      <button onClick={getBalance}>Get Balance</button>
      <p>Balance: {balance} ETH</p>
      <button onClick={mintTokens}>Mint Tokens</button>
    </div>
  );
}

export default App;
