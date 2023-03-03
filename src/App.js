import React from 'react';
import './App.css';
import useMetaMask from './hooks/useMetaMask';
import Coinflip from './components/coinflip/coinflip';
import LeftSideBar from './components/SideBar/leftsidebar';
import RightSideBar from './components/SideBar/rightsidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
function App() {
  const { connect, isActive, shouldDisable } = useMetaMask()
  return (
    <div className='bg-[url("../public/img/iced.jpg")] h-[100vh] bg-cover overflow-x-hidden'>
      <div className='grid grid-cols-4 sm:gap-4'>
        <div className='col-span-1'><LeftSideBar /></div>
        <div className='col-span-4 sm:col-span-2 font-silkscreen'>
          <div className='w-2/6 py-[1vh] mx-auto mt-5'>
            <img src="img/logo2.png" alt="logo" />
          </div>
          <div className="text-center">
            {
              !isActive ? <button className=' mt-10 px-[20px] py-[10px] font-bold text-white outline-[2px] outline-dashed outline-cyan-400 bg-cyan-400 hover:bg-white hover:text-cyan-500 hover:scale-110 hover:outline-offset-4 duration-1000 hover:animate-pulse' onClick={connect} disabled={shouldDisable}>
                Connect to MetaMask
              </button> : <Coinflip />
            }
          </div>
        </div>
        <div className='col-span-1'><RightSideBar /></div>
      </div>
    </div>
  );
}

export default App;
