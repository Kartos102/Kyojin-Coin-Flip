import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useMetaMask from "../../hooks/useMetaMask";
import Coinflipabi from "../../coinflip.json";
// import MintAbi from "../../mint.json";
import "react-toastify/dist/ReactToastify.css";
const { ethers } = require("ethers");
const CoinflipAddress = "0x442E8E6c2B63deE40B22BD9FA227F6F0ec77B090";

// const obsidian = "0x6E73490b7E1d8b600fAB2606FD6B91D269cba92F";
// const gold = "0x41eA4D4dCE74efD5122d6Afc05461056aEE42b22";
// const ice = "0x4BB3563378278533C0f0f7b1d654F6CC83e976Dd";

function DisplayPlays(props) {
  if (props.transactions !== undefined) {
    return (
      <div className='flex items-center justify-center'>
        <table className="table-fixed w-full m-[10px]">
          <tbody>
            {props.transactions.map((item, index) => {
              return (
                <tr key={index} className=''>
                  <td className=' text-center w-1/3 border border-cyan-800 border-r-0 p-[10px]' >{item.address}</td>
                  <td className=' text-center  border border-cyan-800 border-l-0 p-[10px]'>{item.amount}</td>
                  <td className=' text-center  border border-cyan-800 border-l-0 p-[10px]'>{item.result}</td>
                  <td className=' text-center  border border-cyan-800 border-l-0 p-[10px]'>{item.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}


const Coinflip = () => {
  const [guess, setGuess] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loseAlert, setLoseAlert] = useState("");
  const [winAlert, setWinAlert] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { account }= useMetaMask();
  const [transactions, setTransaction] = useState();


  const takecoinflip = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const coinflipcontract =  new ethers.Contract(CoinflipAddress, Coinflipabi, signer);

    provider.getBalance(account).then((balance) => {
      // convert a currency unit from wei to ether
      const balanceInMatic = ethers.utils.formatEther(balance);
      if(balanceInMatic < betAmount) {
        setErrorMessage("You don't have enough Matic for this flip");
        return;
      }
    });

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
      const tx = await coinflipcontract.TakeCoinFlip(guess, {value: ethers.utils.parseEther((betAmount).toString())});
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
      if(result!==null) {
        console.log("success");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Failed, Please try again");
    } 
    setBetAmount(0);
    setGuess(null);
    handleShow();
  };

  // const ObsidianMint = async() => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const ObsidianMintContract =  new ethers.Contract(obsidian, MintAbi, signer);
  //   console.log(ObsidianMintContract);
  //   try {
  //     await ObsidianMintContract.mint();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const IceMint = async() => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const IceMintContract =  new ethers.Contract(ice, MintAbi, signer);
  //   try {
  //     await IceMintContract.mint();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const GoldMint = async() => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const GoldMintContract =  new ethers.Contract(gold, MintAbi, signer);
  //   try {
  //     await GoldMintContract.mint();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const Distribute = async() => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const coinflipcontract =  new ethers.Contract(CoinflipAddress, Coinflipabi, signer);

  //   provider.getBalance(account).then(async (balance) => {
  //     const balanceInMatic = ethers.utils.formatEther(balance);
  //     try {
  //       await coinflipcontract.distributeTokens( {value: ethers.utils.parseEther((balanceInMatic*0.95).toString())});
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // };

  const handleShow = async()=> {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const coinflipcontract =  new ethers.Contract(CoinflipAddress, Coinflipabi, signer);
    const historyCount = await coinflipcontract.flipCount();
    let temp_history = [];
    for(let i = historyCount; i>historyCount-3 ;i--) {
      if(i<1) continue;
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
        "address":temp_flip_history["user"].slice(0,4)+"..."+temp_flip_history["user"].slice(-4),
        "amount":ethers.utils.formatEther((temp_flip_history["amount"]).toString()),
        "result":temp_flip_history["result"]?"doubled":"rugged",
        "time": temp_flow_time.toString()+" ago "
      });
    }
    setTransaction(temp_history);
  };

  // const SetTreasury = async() => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const coinflipcontract =  new ethers.Contract(CoinflipAddress, Coinflipabi, signer);
  //   try {
  //     await coinflipcontract.updateTreasuryWallet("0xbBFa44eD81431770BcEf2C5d48ABf3F478E36716")
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
 
  useEffect(() => {
    handleShow();
  },[transactions]);

  return (
    <div>
      <div className=" w-11/12 sm:w-[100%] 2xl:w-1/2 m-auto mt-[20px] rounded-sm border-[2px] bg-[#0f172aaa] backdrop-blur-sm outline-3 outline-dashed outline-cyan-300 hover:outline-2 hover:outline-offset-8 duration-1000">
        <div className='flex justify-center text-2xl font-bold pt-[2vh] text-[#ffffff] uppercase'>I Pick</div>
        <div className='flex justify-center gap-x-4 pt-[3vh]'>
          <button className={`${guess === 1 ?"text-white border-cyan-300 bg-cyan-300 outline-cyan-300" : "text-cyan-500 border-cyan-300 bg-white outline-cyan-300"} outline-dashed border-4 outline-4 rounded-full w-20 h-20 sm:w-28 sm:h-28 text-xl sm:text-2xl text-center uppercase hover:outline-cyan-300 hover:text-white hover:animate-spin hover:outline-dashed hover:bg-cyan-300 active:bg-cyan-300 `} onClick={() => setGuess(1)}>Heads</button>

          <button className={`${guess === 0 ? "text-white border-cyan-300 bg-cyan-300 outline-cyan-300" : "text-cyan-500 border-cyan-300 bg-white outline-cyan-300"} outline-dashed border-4 outline-4 rounded-full w-20 h-20 sm:w-28 sm:h-28 text-xl sm:text-2xl text-center uppercase hover:outline-cyan-300 hover:text-white hover:animate-spin hover:outline-dashed hover:bg-cyan-300 active:bg-cyan-300 `} onClick={() => setGuess(0)}>Tails</button>

        </div>
                
        <div className='flex justify-center  font-bold  pt-[3vh] text-[#ffffff] uppercase'>For</div>
        <div >
          <div className=' flex-col justify-center font-medium gap-x-4 pt-[1vh]'>
            <button className={`${betAmount === 1 ? "text-white bg-cyan-300 outline-cyan-300" : "text-cyan-500 bg-white outline-cyan-300"}                     
                    w-[150px] outline-dotted outline-2 mx-5 my-2 px-[10px] py-[3px] text-center hover:text-white hover:bg-cyan-300 hover:outline-white hover:scale-110 hover:outline-offset-4 duration-700 text-xl sm:text-2xl`}
            onClick={() => setBetAmount(1)}>1 MATIC</button>

            <button className={`${betAmount === 2 ? "text-white bg-cyan-300 outline-cyan-300" : "text-cyan-500 bg-white outline-cyan-300"}                     
                    w-[150px] outline-dotted outline-2 mx-5 my-2 px-[10px] py-[3px] text-center hover:text-white hover:bg-cyan-300 hover:outline-white hover:scale-110 hover:outline-offset-4 duration-1000 text-xl sm:text-2xl`}
            onClick={() => setBetAmount(2)}>2 MATIC</button>

            <button className={`${betAmount === 5 ? "text-white bg-cyan-300 outline-cyan-300" : "text-cyan-500 bg-white outline-cyan-300"}                     
                    w-[150px] outline-dotted outline-2 mx-5 my-2 px-[10px] py-[3px] text-center hover:text-white hover:bg-cyan-300 hover:outline-white hover:scale-110 hover:outline-offset-4 duration-1000 text-xl sm:text-2xl`}
            onClick={() => setBetAmount(5)}>5 MATIC</button>

          </div>
          <div className=' flex-col justify-center font-medium gap-x-4 pb-[3vh]'>
            <button className={`${betAmount === 10 ? "text-white bg-cyan-300 outline-cyan-300" : "text-cyan-500 bg-white outline-cyan-300"}                     
                    w-[150px] outline-dotted outline-2 mx-5 my-2 px-[10px] py-[3px] text-center hover:text-white hover:bg-cyan-300 hover:outline-white hover:scale-110 hover:outline-offset-4 duration-1000 text-xl sm:text-2xl`}
            onClick={() => setBetAmount(10)}>10 MATIC</button>

            <button className={`${betAmount === 25 ? "text-white bg-cyan-300 outline-cyan-300" : "text-cyan-500 bg-white outline-cyan-300"}                     
                    w-[150px] outline-dotted outline-2 mx-5 my-2 px-[10px] py-[3px] text-center hover:text-white hover:bg-cyan-300 hover:outline-white hover:scale-110 hover:outline-offset-4 duration-1000 text-xl sm:text-2xl`}
            onClick={() => setBetAmount(25)}>25 MATIC</button>
          </div>
          <div className='flex justify-center font-bold text-[32px] text-[#ff0066] uppercase' >
            {errorMessage}
          </div>
          {winAlert!==""&&<div className='flex justify-center font-bold text-[32px] text-[#00ff66] uppercase' >
            {winAlert}
          </div>}
          {loseAlert!==""&&<div className='flex justify-center font-bold text-[32px] text-[#ff0066] uppercase' >
            {loseAlert}
          </div>}
          {isLoading ? <div className="flex items-center justify-center">
            <button type="button"
              className="outline-dotted outline-1 outline-green-500 mb-[3vh] inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-green-500 rounded-sm shadow cursor-not-allowed hover:bg-green-400"
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
          </div> 
            :
            <div className='flex justify-center'>
              <button className='w-[150px] px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] mb-[3vh] text-center bg-green-500 text-white outline-dotted outline-1 outline-green-500 rounded-sm hover:bg-yellow-400 hover:outline-yellow-400 hover:outline-offset-4 hover:scale-110 duration-1000 active:bg-cyan-300 text-xl sm:text-2xl' onClick={() => takecoinflip()}>
                    Flip
              </button>
            </div>
          } 
        </div>
      </div>

      {/* <div className='pt-[20px]'>
        <button className='w-[150px] px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] mb-[3vh] text-center bg-green-500 text-white outline-dotted outline-1 outline-green-500 rounded-sm hover:bg-yellow-400 hover:outline-yellow-400 hover:outline-offset-4 hover:scale-110 duration-1000 active:bg-cyan-300 text-xl sm:text-2xl' onClick={() => ObsidianMint()}>
            Obsidian
        </button>

        <button className='w-[150px] px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] mb-[3vh] text-center bg-green-500 text-white outline-dotted outline-1 outline-green-500 rounded-sm hover:bg-yellow-400 hover:outline-yellow-400 hover:outline-offset-4 hover:scale-110 duration-1000 active:bg-cyan-300 text-xl sm:text-2xl' onClick={() => IceMint()}>
            Ice
        </button>

        <button className='w-[150px] px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] mb-[3vh] text-center bg-green-500 text-white outline-dotted outline-1 outline-green-500 rounded-sm hover:bg-yellow-400 hover:outline-yellow-400 hover:outline-offset-4 hover:scale-110 duration-1000 active:bg-cyan-300 text-xl sm:text-2xl' onClick={() => GoldMint()}>
            Gold
        </button>

        <button className='w-[150px] px-[8px] sm:px-[10px] py-[3px] sm:py-[5px] mb-[3vh] text-center bg-green-500 text-white outline-dotted outline-1 outline-green-500 rounded-sm hover:bg-yellow-400 hover:outline-yellow-400 hover:outline-offset-4 hover:scale-110 duration-1000 active:bg-cyan-300 text-xl sm:text-2xl' onClick={() => Distribute()}>
            Airdrop
        </button>
      </div> */}
        
      <div className="w-11/12 sm:w-[100%] 2xl:w-1/2 m-auto mt-[10px] text-[#ffffff] rounded-sm border-[2px] bg-[#0f172aaa] backdrop-blur-sm outline-dashed outline-cyan-300 hover:outline-2 hover:outline-offset-8 duration-1000">
        <div className='text-2xl font-bold pt-[2vh] uppercase'>Recent Plays</div>
        <DisplayPlays transactions={transactions} />
      </div>
    </div>
  );
};

DisplayPlays.propTypes = {
  transactions: PropTypes.array
};

export default Coinflip;
