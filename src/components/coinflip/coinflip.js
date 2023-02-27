import React, { useEffect, useState } from 'react'
import useMetaMask from '../../hooks/useMetaMask';
import Coinflipabi from '../../coinflip.json'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const { ethers, utils, getBalance } = require("ethers")
const CoinflipAddress = "0x530195D2c21C8e4db8cDDAeb120847046998e532";



const Coinflip = () => {
  const [guess, setGuess] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [loseAlert, setLoseAlert] = useState("");
  const [winAlert, setWinAlert] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { connect, disconnect, isActive, account, shouldDisable }= useMetaMask();
  const [show, setShow] = useState(false);
  const [transactions, setTransaction] = useState();

  const handleClose = () => setShow(false);

  const takecoinflip = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const coinflipcontract =  new ethers.Contract(CoinflipAddress, Coinflipabi, signer);

    provider.getBalance(account).then((balance) => {
      // convert a currency unit from wei to ether
      const balanceInMatic = ethers.utils.formatEther(balance)
      if(balanceInMatic < betAmount) {
        setErrorMessage("You don't have enough Matic for this flip");
        return;
      }
    })

    setWinAlert("");
    setLoseAlert("");
    setErrorMessage("");

    if(guess === null) {
      setErrorMessage("Please pick one of HEADS or TAILS");
      return;
    }
    
    if(betAmount <= 0) {
      setErrorMessage("Please select the corret amount");
      return;
    }

    try {
      setIsLoading(true);
      await coinflipcontract.TakeCoinFlip(guess, {value: ethers.utils.parseEther((betAmount).toString())});
      coinflipcontract.on("Win", (to, amount, event) => {
        setIsLoading(false);
        setWinAlert("Congratulations!, You win!")
      });
      
      coinflipcontract.on("Lose", (to, amount, event) => {
        setIsLoading(false);
        setLoseAlert("Ooops!, You Lose!")

      });
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setErrorMessage("Failed, Please try again");
    } 
    setBetAmount(0);
    setGuess(null);
  }
  const handleShow = async()=> {
    setShow(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const coinflipcontract =  new ethers.Contract(CoinflipAddress, Coinflipabi, signer);
    const historyCount = await coinflipcontract.flipCount();
    let temp_history = [];
    for(let i = historyCount; i>0 ;i--) {
      const temp_flip_history = await coinflipcontract.flipResult(i);
      const currentDate = new Date();
      const timeStamp = currentDate.getTime();
      const flowTime = timeStamp/1000-Number(temp_flip_history["time"]);
      let temp_flow_time = "";
      const hour = flowTime/3600 >> 0;
      const minute = (flowTime - 3600 * hour ) /60 >>0;
      let second = flowTime - 3600 * hour - 60 * minute;
      second = second - second % 1;
      temp_flow_time = hour.toString() + " hr: " + minute.toString() + " min: " + second.toString() + " sec";
      

      temp_history.push({
        "address":temp_flip_history["user"],
        "amount":ethers.utils.formatEther(temp_flip_history["amount"].toString()),
        "result":temp_flip_history["result"],
        "time": temp_flow_time
      })
    }
    setTransaction(temp_history);
  }
 

  return (
    <div className="text-[#000000] rounded-md border-[2px] bg-[#0f172aaa]">
        <ToastContainer />
        <div className='flex justify-center  font-bold  pt-[5vh] text-[#ffffff] uppercase'>I Pick</div>
        <div className='flex justify-center  font-bold  gap-x-4 pt-[3vh]'>
            {guess===0?<button className='px-[20px] sm:px-[30px] py-[8px] sm:py-[10px] text-center uppercase rounded-md bg-[#00ff55]' onClick={()=>setGuess(0)}>Heads</button>
            :
            <button className='px-[20px] sm:px-[30px] py-[8px] sm:py-[10px] bg-[#000000] text-center uppercase bg-[#FEDF57] rounded-md hover:bg-[#00ff55]' onClick={()=>setGuess(0)}>Heads</button>
            }
            {guess===1?<button className='px-[20px] sm:px-[30px] py-[8px] sm:py-[10px]  text-center uppercase bg-[#00ff55] rounded-md' onClick={()=>setGuess(1)}>Tails</button>
            :
            <button className='px-[20px] sm:px-[30px] py-[8px] sm:py-[10px] bg-[#000000] text-center uppercase bg-[#FEDF57] rounded-md hover:bg-[#00ff55]' onClick={()=>setGuess(1)}>Tails</button>}
        </div>
        <div className='flex justify-center  font-bold  pt-[3vh] text-[#ffffff] uppercase'>For</div>
        <div >
            <div className='flex justify-center font-medium gap-x-4 pt-[3vh]'>
                {betAmount===1?<button className= 'px-[8px] sm:px-[10px] py-[3px] sm:py-[5px]  text-center bg-[#00ff55] rounded-md 'disabled>1 MATIC</button>
                :
                <button className= 'px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] bg-[#000000] text-center bg-[#FEDF57] rounded-md hover:bg-[#00ff55]' onClick={()=>setBetAmount(1)}>1 MATIC</button>}

               {betAmount===2?<button className= 'px-[8px] sm:px-[10px] py-[3px] sm:py-[5px]  text-center bg-[#00ff55] rounded-md ' disabled>2 MATIC</button>
                :
                <button className= 'px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] bg-[#000000] text-center bg-[#FEDF57] rounded-md hover:bg-[#00ff55]' onClick={()=>setBetAmount(2)}>2 MATIC</button>}

               {betAmount===5?<button className= 'px-[8px] sm:px-[10px] py-[3px] sm:py-[5px]  text-center bg-[#00ff55] rounded-md ' disabled>5 MATIC</button>
                :
                <button className= 'px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] bg-[#000000] text-center bg-[#FEDF57] rounded-md hover:bg-[#00ff55]' onClick={()=>setBetAmount(5)}>5 MATIC</button>}
            </div>
            <div className='flex justify-center font-medium gap-x-4 pt-[3vh] pb-[3vh]'>
                {betAmount===10?<button className= 'px-[8px] sm:px-[10px] py-[3px] sm:py-[5px]  text-center bg-[#00ff55] rounded-md ' disabled>10 MATIC</button>
                :
                <button className= 'px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] bg-[#000000] text-center bg-[#FEDF57] rounded-md hover:bg-[#00ff55]' onClick={()=>setBetAmount(10)}>10 MATIC</button>}

                {betAmount===25?<button className= 'px-[8px] sm:px-[10px] py-[3px] sm:py-[5px]  text-center bg-[#00ff55] rounded-md ' disabled>25 MATIC</button>
                :
                <button className= 'px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] bg-[#000000] text-center bg-[#FEDF57] rounded-md hover:bg-[#00ff55]' onClick={()=>setBetAmount(25)}>25 MATIC</button>}
            </div>
            <div className='flex justify-center font-medium text-[#ff2200] pb-[3px]' >
              {errorMessage}
            </div>
            <div className='flex justify-center font-medium text-[#ff2200] pb-[3px]' >
              {loseAlert}
            </div>
            <div className='flex justify-center font-medium text-[#22ff00] pb-[3px]' >
              {winAlert}
            </div>
            {isLoading? <div className="flex items-center justify-center">
              <button type="button"
                  className=" mb-[5vh]  inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-green-500 rounded-md shadow cursor-not-allowed hover:bg-green-400"
                  disabled="">
                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                  </svg>
                  Flipping...
              </button>
            </div>:
            <div className='flex justify-center'>
              <button  className='px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] mb-[5vh]  bg-[#000000] text-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:bg-[#00ff55] font-semibold'  onClick={() => takecoinflip()}>
                  Double or Nothing
              </button>
            </div>
            }
        </div>
        <button  className='px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] mb-[5vh]  bg-[#000000] text-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:bg-[#00ff55] font-semibold'  onClick={() => handleShow()}>
            History
        </button>
        <Modal show={show} fullscreen={true}  onHide={handleClose} className='bg-[#0f172a55]'>
          <Modal.Header closeButton>
            <Modal.Title>CoinFlip History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {transactions && transactions.map(transaction => (  
              <li>  
                {transaction.address.slice(0,5)}...{transaction.address.slice(-5)}&nbsp;&nbsp;flipped&nbsp;&nbsp;{transaction.amount}&nbsp;Matic&nbsp;&nbsp;and&nbsp;&nbsp;{transaction.result?'doubled':'got rugged'}&nbsp;&nbsp;{transaction.time}&nbsp;&nbsp;ago
              </li>  
            ))}  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default Coinflip;
