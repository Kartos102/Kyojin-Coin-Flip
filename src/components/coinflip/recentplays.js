import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Coinflipabi from "../../coinflip.json";
// import MintAbi from "../../mint.json";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const { ethers } = require("ethers");
const CoinflipAddress = "0x4b8CBBE89204aff1c2dD2adDF3960A42f89ffAD3";

function DisplayPlays(props) {

  if (props.transactions !== undefined) {
    return (
      <div className='flex items-center justify-center'>
        <table className="table-fixed w-full">
          <tbody>
            {props.transactions.map((item, index) => {
              return (
                <tr key={index} className='border-transparent text-[16px]'>
                  <td className=' text-xs min-[0px]:max-[390px]:truncate min-[640px]:max-[819px]:truncate min-[1200px]:text-base text-left w-1/5 min-[1200px]:w-1/5 border-t-2 border-b-2 border-[#2995b399] py-[10px] ' >{item.address}</td>
                  <td className=' pr-2 text-xs min-[1200px]:text-base text-right w-1/5 min-[640px]:max-[819px]:pr-2 min-[1200px]:w-1/5 border-t-2 border-b-2 border-[#2995b399] border-l-0 py-[10px] '>{item.amount}</td>
                  <td className=' pr-4 text-xs min-[1200px]:text-base text-center w-1/5 min-[640px]:max-[819px]:pr-2 min-[1200px]:w-1/5 border-t-2 border-b-2 border-[#2995b399] border-l-0 py-[10px] '>{item.result}</td>
                  <td className=' min-[0px]:max-[390px]:pl-5 text-xs min-[0px]:max-[390px]:truncate min-[640px]:max-[875px]:truncate min-[1200px]:text-base text-right w-3/5 min-[1200px]:w-3/5 border-t-2 border-b-2 border-[#2995b399] border-l-0 py-[10px] '>{item.time}</td>
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


const History = () => {
  const [transactions, setTransaction] = useState();

  const handleShow = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const coinflipcontract = new ethers.Contract(CoinflipAddress, Coinflipabi, signer);
    console.log(coinflipcontract);
    const historyCount = await coinflipcontract.flipCount();
    console.log(historyCount);
    console.log(historyCount);
    let temp_history = [];
    console.log(historyCount);
    for (let i = historyCount; i > historyCount - 3; i--) {
      if (i < 1) continue;
      const temp_flip_history = await coinflipcontract.flipResult(i);
      console.log(temp_flip_history);

      const currentDate = new Date();
      const timeStamp = currentDate.getTime();
      const flowTime = timeStamp / 1000 - Number(temp_flip_history["time"]);
      let temp_flow_time = "";
      const hour = flowTime / 3600 >> 0;
      const minute = (flowTime - 3600 * hour) / 60 >> 0;
      let second = flowTime - 3600 * hour - 60 * minute;
      second = second - second % 1;
      temp_flow_time = hour.toString() + " hr: " + minute.toString() + " min: " + second.toString() + " sec";

      temp_history.push({
        "address": temp_flip_history["user"].slice(0, 4) + "..." + temp_flip_history["user"].slice(-4),
        "amount": ethers.utils.formatEther((temp_flip_history["amount"]).toString()),
        "result": temp_flip_history["result"] ? "doubled" : "rugged",
        "time": temp_flow_time.toString() + " ago "
      });
    }
    setTransaction(temp_history);
  };

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <div className=" w-full sm:w-[100%] min-[1750px]:w-3/5 m-auto text-[#054462]">
      <div className=' text-2xl font-bold my-20 uppercase justify-center'><Link to="/"><img src="img/back-arrow.png" className="absolute" alt="logo" /></Link><p className="text-center">Recent Plays</p></div>
      <DisplayPlays transactions={transactions} />
    </div>
  );
};

DisplayPlays.propTypes = {
  transactions: PropTypes.array
};

export default History;