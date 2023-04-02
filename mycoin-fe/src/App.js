import './App.css';
import Web3 from 'web3';
import { useState,  useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from './utils/load-contract';

function App() {

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("faucet", provider);
      
      // debugger

      if (provider) {
        // provider.request({method: "eth_requestAccounts"});
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract
        })
      }
      else {
        console.error("please install metamask");
      }
    }
    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  useEffect(() => {
    const loadBalance = async () => {
      const {contract, web3} = web3Api;
      const _balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(_balance, "ether"));
    };
    web3Api.contract && loadBalance()
  }, [web3Api]) 

  return (
    <div className='faucet-wrapper'>
      <div className='faucet'>
        <div className='balance-view is-size-2'>
          Current Balance: <strong>{balance}</strong>ETH
        </div>
        <button className='button is-primary mr-5'>BUTTON 1</button>
        <button className='button is-danger mr-5'>BUTTON 2</button>
        <button className='button is-link'
          onClick={() => 
            web3Api.provider.request({method: "eth_requestAccounts"})
          }
        >
          Connect Wallets
        </button>
        <span>
          <p>
            <strong> Accounts Address: </strong>
            {
              account ? account:"Account Denied"
            }
          </p>
        </span>
      </div>
    </div>
  );
}

export default App;
