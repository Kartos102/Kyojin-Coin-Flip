import React, { useEffect } from 'react'
import './App.css'
import useMetaMask from './hooks/useMetaMask';
import Coinflip from './components/coinflip/coinflip';
import LeftSideBar from './components/SideBar/leftsidebar';
import RightSideBar from './components/SideBar/rightsidebar';

import metamask from './images/metamask.png';


function App() {
  const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask()
  return (
    <div className='bg-[url("../public/img/bg_dark.png")] h-[100vh] bg-cover overflow-hidden'>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-1'><LeftSideBar /></div>
        <div className='col-span-2'>
          <div className='w-1/6 py-[3vh] mx-auto'>
            <img src="img/logo.png" alt="logo"/>
          </div>
          <div className="text-center pt-[5vh]">
          {
            !isActive?<button className=' px-[20px] py-[10px] font-bold text-[#ffffff] rounded-md border-2px bg-gradient-to-r from-purple-600 to-purple-400'  onClick={connect} disabled={shouldDisable}>
              Connect to MetaMask
            </button>:<Coinflip/>
          }
          </div>
        </div>
        <div className='col-span-1'><RightSideBar /></div>
      </div>
     
    </div>
  );
}

export default App;
