import React from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/silkscreen";
import { Link } from 'react-router-dom';

function Responsibility() {
  return (
    <div className=' h-[100vh] bg-[url("../public/img/bg.jpg")] bg-bottom bg-cover bg-repeat-x overflow-x-hidden text-[#054462] font-silkscreen'>
      <div className=' py-[1vh] mx-auto mt-5'>
        <img src="img/logo2.png" className="max-w-[265px] mx-auto" alt="logo" />
      </div>
      <div className='w-full sm:w-[100%] 2xl:w-2/5 mx-auto my-20 max-w-[800px] text-2xl font-bold uppercase justify-center'><Link to="/"><img src="img/back-arrow.png" className="absolute" alt="logo" /></Link><p className="text-center">DON’T BE WRECKLESS</p></div>
      <div className='w-full sm:w-[100%] 2xl:w-2/5 mx-auto my-4 max-w-[800px] justify-center text-center'>
        <p className="text-center uppercase">
          <b>FLIP RESPONSIBLY</b>
          <br />
          IOCF IS A NEW FUN GAME ON POLYGON AND WE WANT ALL OF OUR COMMUNITY MEMBERS TO PLAY RESPONSIBLY. PLEASE ONLY PLAY WITH FUNDS YOU ARE COMFORTABLE PARTING WITH AND THAT WON’T IMPACT
          YOUR OVERALL PHYSICAL AND MENTAL WELL-BEING.
        </p>
      </div>
      <div className='w-full sm:w-[100%] 2xl:w-2/5 mx-auto max-w-[800px] justify-center text-center'>
        <p className="text-center uppercase">
          <b>FLIP RESPONSIBLY</b>
          <br />
          FLIPPING PROBLEM INCLUDES ALL BEHAVIOR PATTERNS THAT
          COMPROMISE, DISRUPT, OR DAMAGE ANY PERSONAL, FAMILY, OR VOCATIONAL PURSUITS. SYMPTOMS INCLUDE INCREASING
          PREOCCUPATION WITH FLIPPING, A NEED TO FLIP MORE AND MORE
          FREQUENTLY, RESTLESSNESS OR IRRITABILITY WHEN ATTEMPTING TO STOP, “CHASING” LOSSES, AND LOSS OF CONTROL MANIFESTED BY CONTINUATION OF THE FLIPPING BEHAVIOR IN SPITE OF MOUNTING, SERIOUS, AND/OR NEGATIVE CONSEQUENCE
        </p>
      </div>
      <div className='w-full sm:w-[100%] 2xl:w-2/5 mx-auto max-w-[800px] justify-center text-center'>
        <p className="text-center uppercase">
          <b>RESOURCES</b>
          <br />
          <span className='flex flex-row justify-center my-1'><img src='img/call.png' className='bg-[#22D3EE] w-4 h-4 p-0.5 mt-1.5 mr-1' />CALL 1-800-522-4700</span>
          <span className='flex flex-row justify-center my-1'><img src='img/chat.png' className='bg-[#22D3EE] w-4 h-4 p-0.5 mt-1.5 mr-1' />CHAT NCPGAMBLING.ORG/CHAT</span>
          <span className='flex flex-row justify-center my-1'><img src='img/text.png' className='bg-[#22D3EE] w-4 h-4 p-0.5 mt-1.5 mr-1' />TEXT 1-800-522-4700</span>
        </p>
      </div>


      <div className=" w-full sm:w-[100%] 2xl:w-2/5 mx-auto max-w-[800px] mt-20 text-center mb-20"><Link to="/faq" className=" text-sm sm:text-base text-[#054462] no-underline">FAQ</Link> | <Link to="/howto" className="text-sm sm:text-base text-[#054462] no-underline">How To Play</Link> | <span className="text-sm sm:text-base text-[#054462] underline underline-offset-2">Flip Responsibly</span></div>

    </div>
  );
}

export default Responsibility;
