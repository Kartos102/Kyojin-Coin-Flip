import React from 'react';
import DisplayPlays from "../components/coinflip/recentplays";
import "./App.css";
import useMetaMask from "../hooks/useMetaMask";
import LeftSideBar from "../components/SideBar/leftsidebar";
import RightSideBar from "../components/SideBar/rightsidebar";
//import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/silkscreen";

function Plays() {
  const {
    connect,
    isActive,
    shouldDisable
  } = useMetaMask();

  return (
    <div className=' h-[100vh] bg-[url("../public/img/bg.jpg")] bg-bottom bg-cover bg-repeat-x overflow-x-hidden'>
      <div className='grid grid-cols-4 sm:gap-4'>
        <div className='col-span-1'><LeftSideBar /></div>
        <div className='col-span-4 sm:col-span-2 font-silkscreen'>
          <div className='py-[1vh] mx-auto mt-5'>
            <img src="img/logo2.png" className="max-w-[265px] mx-auto" alt="logo" />
          </div>
          <div className="text-center">
            {
              !isActive ?
                <button className=' mt-10 px-[20px] py-[10px] font-bold text-white outline-[2px] outline-dashed outline-cyan-400 bg-cyan-400 hover:bg-white hover:text-cyan-500 hover:scale-110 hover:outline-offset-4 duration-1000 hover:animate-pulse' onClick={connect} disabled={shouldDisable}>
                  Connect to MetaMask
                </button>
                :
                <DisplayPlays />
            }
          </div>
        </div>
        <div className='col-span-1'><RightSideBar /></div>
      </div>
    </div>
  );
}

export default Plays;
