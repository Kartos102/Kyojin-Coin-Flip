import React, { useState } from "react";
import useMetaMask from "../../hooks/useMetaMask";
import Coinflipabi from "../../coinflip.json";
import { Link } from "react-router-dom";
// import MintAbi from "../../mint.json";
import "react-toastify/dist/ReactToastify.css";
const { ethers } = require("ethers");
const CoinflipAddress = "0x4b8CBBE89204aff1c2dD2adDF3960A42f89ffAD3";

// const obsidian = "0x6E73490b7E1d8b600fAB2606FD6B91D269cba92F";
// const gold = "0x41eA4D4dCE74efD5122d6Afc05461056aEE42b22";
// const ice = "0x4BB3563378278533C0f0f7b1d654F6CC83e976Dd";

const Coinflip = () => {
  const [guess, setGuess] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loseAlert, setLoseAlert] = useState("");
  const [winAlert, setWinAlert] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { account } = useMetaMask();


  const takecoinflip = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const coinflipcontract = new ethers.Contract(CoinflipAddress, Coinflipabi, signer);

    provider.getBalance(account).then((balance) => {
      // convert a currency unit from wei to ether
      const balanceInMatic = ethers.utils.formatEther(balance);
      if (balanceInMatic < betAmount) {
        setErrorMessage("You don't have enough Matic for this flip");
        return;
      }
    });

    setWinAlert("");
    setLoseAlert("");
    setErrorMessage("");

    if (guess === null) {
      setErrorMessage("Please pick one of HEADS or TAILS");
      return;
    }

    if (betAmount <= 0) {
      setErrorMessage("Please select the corret amount");
      return;
    }

    try {
      setIsLoading(true);
      const tx = await coinflipcontract.TakeCoinFlip(guess, { value: ethers.utils.parseEther((betAmount).toString()) });
      coinflipcontract.on("Win", (to, amount, event) => {
        console.log(to, amount, event);
        setIsLoading(false);
        setWinAlert("Congratulations! You win!");
      });

      coinflipcontract.on("Lose", (to, amount, event) => {
        console.log(to, amount, event);
        setIsLoading(false);
        setLoseAlert("Ooops! You Lose!");
      });

      const result = await tx.wait();
      if (result !== null) {
        console.log("success");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Failed, Please try again");
    }
    setBetAmount(0);
    setGuess(null);
  };

  return (
    <div>
      <div className=" w-full sm:w-[100%] 2xl:w-full m-auto mt-[20px] text-[#054462]">

        <div className='flex justify-center text-2xl font-bold pt-[2vh] uppercase'>CHOOSE</div>

        <div className='flex justify-center gap-x-4 pt-[3vh]'>
          <div className="flex flex-row text-xl space-x-4">
            <div className={`${guess === 1 ? "scale-110" : ""} flex flex-col hover:scale-110`}><button onClick={() => setGuess(1)}><img src="img/head.svg" />HEAD</button></div>
            <div className={`${guess === 0 ? "scale-110" : ""} flex flex-col hover:scale-110`}><button onClick={() => setGuess(0)}><img src="img/tail.svg" />TAIL</button></div>
          </div>
        </div>
        <div className='flex justify-center  font-bold  pt-[3vh] uppercase text-2xl py-4'>FOR</div>
        <div>
          <div className="flex-col justify-center font-medium pt-[1vh]">
            <button className="hover:scale-110 px-2" onClick={() => setBetAmount(1)}><img src={`${betAmount === 1 ? "buttons/1matic-hover.png" : "buttons/1matic.png"}`} /></button>
            <button className="hover:scale-110 px-2" onClick={() => setBetAmount(2)}><img src={`${betAmount === 2 ? "buttons/2matic-hover.png" : "buttons/2matic.png"}`} /></button>
            <button className="hover:scale-110 px-2" onClick={() => setBetAmount(5)}><img src={`${betAmount === 5 ? "buttons/5matic-hover.png" : "buttons/5matic.png"}`} /></button>
          </div>
          <div className=' flex-col justify-center font-medium pt-[1vh]'>
            <button className="hover:scale-110 px-2" onClick={() => setBetAmount(10)}><img src={`${betAmount === 10 ? "buttons/10matic-hover.png" : "buttons/10matic.png"}`} /></button>
            <button className="hover:scale-110 px-2" onClick={() => setBetAmount(25)}><img src={`${betAmount === 25 ? "buttons/25matic-hover.png" : "buttons/25matic.png"}`} /></button>
          </div>
          <div className={`${errorMessage ? "mt-4" : ""} flex justify-center font-bold text-[24px] text-[#ff0066] uppercase`} >
            {errorMessage}
          </div>
          {winAlert !== "" && <div className='flex justify-center font-bold text-[32px] text-[#00ff66] uppercase' >
            {winAlert}
          </div>}
          {loseAlert !== "" && <div className='flex justify-center font-bold text-[32px] text-[#ff0066] uppercase' >
            {loseAlert}
          </div>}
          {isLoading ?
            <div className="flex items-center justify-center">
              <div className="flex flex-row justify-center w-[322px] h-[50px] px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] my-[3vh] text-center bg-white text-xl sm:text-2xl">
                <svg className="w-5 h-5 animate-spin my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#054462" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="#054462"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                <p className="my-auto">Flipping...</p>
              </div>
            </div>
            :
            <div className='flex justify-center'>
              <button className=' w-[322px] h-[50px] px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] my-[3vh] text-center bg-white hover:scale-110  active:bg-cyan-300 text-xl sm:text-2xl' onClick={() => takecoinflip()}>
                Click here to flip
              </button>
            </div>
          }
        </div>
      </div>
      <div className="text-[#054462]"><Link to="/plays" className="visited:text-[#054462]">View Recent Plays</Link></div>
      <div className="mt-10 mb-20"><Link to="/faq" className=" text-sm sm:text-base text-[#054462] no-underline">FAQ</Link> | <Link to="/howto" className=" text-sm sm:text-base text-[#054462] no-underline">How To Play</Link> | <Link to="/responsibility" className=" text-sm sm:text-base text-[#054462] no-underline">Flip Responsibly</Link></div>
    </div>
  );
};

export default Coinflip;
