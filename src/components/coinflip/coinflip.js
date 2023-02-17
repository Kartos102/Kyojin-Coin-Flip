import React, { useEffect, useState } from 'react'
import useMetaMask from '../../hooks/useMetaMask';
import Coinflipabi from '../../coinflip.json'
const { ethers, utils, getBalance } = require("ethers")
const CoinflipAddress = "0xF9dfB466bb8A6aE4436fae29ca00a1c168A945E6";

const Coinflip = () => {
  const [guess, setGuess] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const { connect, disconnect, isActive, account, shouldDisable }= useMetaMask();

  const takecoinflip = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const coinflipcontract =  new ethers.Contract(CoinflipAddress, Coinflipabi, signer);

    provider.getBalance(account).then((balance) => {
      // convert a currency unit from wei to ether
      const balanceInMatic = ethers.utils.formatEther(balance)
      if(balanceInMatic <betAmount) {
        setErrorMessage("You don't have enough matic for this flip")
      }
    })
    
    if(betAmount <= 0) {
      alert("please select the corret amount");
    }
    try {
      const result = await coinflipcontract.TakeCoinFlip(guess, {value: ethers.utils.parseEther((betAmount).toString())});
      const receipt = await result.wait();
      if(receipt!=null){
        console.log(receipt)
        coinflipcontract.on("Win", (to, amount, event) => {
          console.log(to,amount,event)
          console.log(`${ utils.formatEther(amount)} is sent to ${to}`);
        });
        coinflipcontract.on("Lose", (to, amount, event) => {
          console.log(to,amount,event)
          console.log(`${ to } loss ${ utils.formatEther(amount) }`);
      });
      }
    } catch (error) {
      console.log(error)
    }

    
  }

  return (
    <div className="text-[#000000] rounded-md border-[2px] bg-[#0f172aaa]">
        <div className='flex justify-center  font-bold  pt-[5vh] text-[#ffffff] uppercase'>I like</div>
        <div className='flex justify-center  font-bold  gap-x-4 pt-[3vh]'>
            <button className='px-[30px] py-[10px] bg-[#000000] text-center uppercase bg-[#FEDF57] rounded-md hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-800' onClick={()=>setGuess(1)}>Heaos</button>
            <button className='px-[30px] py-[10px] bg-[#000000] text-center uppercase bg-[#FEDF57] rounded-md hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-800' onClick={()=>setGuess(0)}>Tails</button>
        </div>
        <div className='flex justify-center  font-bold  pt-[3vh] text-[#ffffff] uppercase'>For</div>
        <div >
            <div className='flex justify-center font-medium gap-x-4 pt-[3vh]'>
                <button className= 'px-[10px] py-[5px] bg-[#000000] text-center bg-[#FEDF57] rounded-md hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-800' onClick={()=>setBetAmount(1)}>1 MATIC</button>
                <button  className='px-[10px] py-[5px] bg-[#000000] text-center bg-[#FEDF57] rounded-md hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-800'  onClick={()=>setBetAmount(2)}>2 MATIC</button>
                <button  className='px-[10px] py-[5px] bg-[#000000] text-center bg-[#FEDF57] rounded-md hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-800'  onClick={()=>setBetAmount(5)}>5 MATIC</button>
            </div>
            <div className='flex justify-center font-medium gap-x-4 pt-[3vh] pb-[3vh]'>
                <button  className='px-[10px] py-[5px] bg-[#000000] text-center bg-[#FEDF57] rounded-md hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-800'  onClick={()=>setBetAmount(10)}>10 MATIC</button>
                <button  className='px-[10px] py-[5px] bg-[#000000] text-center bg-[#FEDF57] rounded-md hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-800' onClick={()=>setBetAmount(25)}>25 MATIC</button>
            </div>
            <div className='flex justify-center text-[#ee0000]' >
              {errorMessage}
            </div>
            <div className='flex justify-center'>
              <button  className='px-[10px] py-[5px] mb-[5vh]  bg-[#000000] text-center bg-[#FEDF57] rounded-md hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-800'  onClick={() => takecoinflip()}>
                  Double or Nothing
              </button>
            </div>
        </div>
    </div>
  );
}

export default Coinflip;
