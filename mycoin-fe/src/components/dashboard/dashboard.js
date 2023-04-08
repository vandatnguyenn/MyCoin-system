import './dashboard.css';
import Web3 from 'web3';
import { useState,  useEffect, useCallback } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from '../../utils/load-contract';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';

function Dashboard (props) {

    const [web3Api, setWeb3Api] = useState({
      provider: null,
      web3: null,
      contract: null,
    });
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [shouldReload, setShouldReload] = useState(false);
    const reloadEffect = () => {setShouldReload(!shouldReload)};
      
    
      useEffect(() => {
        const loadProvider = async () => {
          const provider = await detectEthereumProvider();
          const contract = await loadContract("faucet", provider);
          
          // debugger
    
          if (provider) {
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
    
          console.log(contract.address);
          const _balance = await web3.eth.getBalance(contract.address);
          console.log(_balance);
    
          setBalance(await web3.utils.fromWei(_balance, "ether"));
        };
        web3Api.contract && loadBalance()
      }, [web3Api, reloadEffect])
      
      const addFunds = useCallback(async () => {
        const {contract, web3} = web3Api;
        const result = await contract.addFunds({
          from: account,
          value: web3.utils.toWei("1", "ether")
        });
        console.log(result);
        reloadEffect();
      }, [web3Api, account]);
    
      const withdraw = async () => {
        const {contract, web3} = web3Api;
        const withdrawAmount = web3.utils.toWei("0.5", "ether");
        const result = await contract.withdraw(withdrawAmount, {
          from: account
        });
        console.log(result);
        reloadEffect();
      };


    return (
        <div>
            <div className='balance-view is-size-2'>
                Current Balance: <strong>{balance}</strong>ETH
            </div>
            <span>
                <p>
                <strong> Accounts Address: </strong>
                {
                    account ? account:"Account Denied"
                }
                </p>
            </span>
            <div className='wallet-controllers'>
                <div className='network-activity__action-wrap'>
                <div className='network-activity__action-item'>
                    <a 
                    // onClick={}
                    className='network-activity__action-item'
                    >
                    <InputIcon />
                    Deposit
                    </a>
                </div>
                <div className='network-activity__action-divider'></div>
                <div className='network-activity__action-item'>
                    <a 
                    onClick={addFunds} 
                    className='network-activity__action-item'
                    >
                    <CreditCardIcon />
                    Buy
                    </a>
                </div>
                <div className='network-activity__action-divider'></div>
                <div className='network-activity__action-item'>
                    <a 
                    // onClick={} 
                    className='network-activity__action-item'
                    >
                    <OutputIcon />
                    Send
                    </a>
                </div>
                <div className='network-activity__action-divider'></div>
                <div className='network-activity__action-item'>
                    <a 
                    // onClick={} 
                    className='network-activity__action-item'
                    >
                    <SwapHorizontalCircleIcon />
                    Swap
                    </a>
                </div>
                </div>
                
            </div>
            <div className='wallet-controllers'>
                <button className='button is-primary mr-5'
                    onClick={addFunds}
                >
                    Donate
                </button>
                <button className='button is-danger mr-5'
                    onClick={withdraw}
                >
                    Withdraw
                </button>
                <button className='button is-link'
                    onClick={() => 
                    web3Api.provider.request({method: "eth_requestAccounts"})
                    }
                >
                    Connect Wallets
                </button>
            </div>
        </div>
    )
}

export default Dashboard;