import React from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/silkscreen";
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

function HowTo() {
  return (
    <div className=' h-[100vh] bg-[url("../public/img/bg.jpg")] bg-bottom bg-cover bg-repeat-x overflow-x-hidden text-[#054462] font-silkscreen'>
      <div className='py-[1vh] mx-auto mt-5'>
        <img src="img/logo2.png" className="max-w-[265px] mx-auto" alt="logo" />
      </div>
      <div className='w-full sm:w-[100%] 2xl:w-2/5 mx-auto my-20 max-w-[800px] text-2xl font-bold uppercase justify-center'><Link to="/"><img src="img/back-arrow.png" className="absolute" alt="logo" /></Link><p className="text-center">How to Play</p></div>
      <Accordion defaultActiveKey="0" className='mx-auto max-w-[600px]'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How to play?</Accordion.Header>
          <Accordion.Body>
            1. CONNECT YOUR METAMASK WALLET. <br />
            &nbsp;&nbsp; (GET METAMASK @ METAMASK.IO) <br />
            2. PICK EITHER HEADS OR TAILS. <br />
            3. SELECT YOUR DESIRED FLIP AMOUNT. <br />
            4. CLICK “CLICK HERE TO FLIP”. <br />
            5. CLICK APPROVE AND WAIT FOR CONFIRMATION <br />
            6. CONGRATS, YOU’RE NOW A CERTIFIED FLIPPER! <br />
          </Accordion.Body>
        </Accordion.Item>
        <hr />
        <Accordion.Item eventKey="1">
          <Accordion.Header>WHAT IS A METAMASK WALLET?</Accordion.Header>
          <Accordion.Body>
            METAMASK IS A SOFTWARE CRYPTOCURRENCY WALLET USED TO INTERACT WITH THE ETHEREUM BLOCKCHAIN. IT ALLOWS USERS TO ACCESS THEIR POLYGON  WALLET THROUGH A BROWSER EXTENSION OR
            MOBILE APP, WHICH CAN THEN BE USED TO INTERACT WITH DECENTRALIZED APPLICATIONS.
          </Accordion.Body>
        </Accordion.Item>
        <hr />
        <Accordion.Item eventKey="2">
          <Accordion.Header>HOW DO I FUND MY METAMASK WALLET?</Accordion.Header>
          <Accordion.Body>
            USE A CENTRALIZED EXCHANGE SUCH AS COINBASE OR BINANCE TO FUND YOUR WALLET. PURCHASE MATIC USING FIAT CURRENCY. THEN
            WITHDRAW MATIC TO YOUR METAMASK WALLET. MAKE SURE TO ADD POLYGON MAINNET UNDER NETWORKS TO ACCESS YOUR TRANSFERRED FUNDS.
          </Accordion.Body>
        </Accordion.Item>
        <hr />
      </Accordion>

      <div className="w-full sm:w-[100%] 2xl:w-2/5 mx-auto max-w-[800px] mt-20 text-center mb-20"><Link to="/faq" className=" text-sm sm:text-base text-[#054462] no-underline">FAQ</Link> | <span className=" text-sm sm:text-base text-[#054462] underline underline-offset-2">How To Play</span> | <Link to="/responsibility" className=" text-sm sm:text-base text-[#054462] no-underline">Flip Responsibly</Link></div>

    </div>
  );
}

export default HowTo;
