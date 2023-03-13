import React from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/silkscreen";
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

function Faq() {
  return (
    <div className=' h-[100vh] bg-[url("../public/img/bg.jpg")] bg-bottom bg-cover bg-repeat-x overflow-x-hidden text-[#054462] font-silkscreen'>
      <div className='py-[1vh] mx-auto mt-5'>
        <img src="img/logo2.png" className="max-w-[265px] mx-auto" alt="logo" />
      </div>
      <div className='w-full sm:w-[100%] 2xl:w-2/5 mx-auto my-20 max-w-[800px] text-2xl font-bold uppercase justify-center'><Link to="/"><img src="img/back-arrow.png" className="absolute" alt="logo" /></Link><p className="text-center">Frequently Asked Questions</p></div>
      <Accordion defaultActiveKey="0" className='mx-auto max-w-[600px]'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>WHAT IS ICED OUT COIN FLIP (IOCF)?</Accordion.Header>
          <Accordion.Body>
            IOCF IS A SMART CONTRACT THAT ALLOWS USERS TO PLAY
            “DOUBLE OR NOTHING” UTILIZING MATIC TOKENS. ODDS ARE
            50/50 WITH A 4% FEE.
          </Accordion.Body>
        </Accordion.Item>
        <hr />
        <Accordion.Item eventKey="1">
          <Accordion.Header>HOW CAN I ENSURE THAT I CAN TRUST IOCF?</Accordion.Header>
          <Accordion.Body>
            IOCF IS NOT RUN, NOR OWNED BY A SMALL GROUP OF INDIVIDUALS
            CONTAINING THE MAJORITY OF POWER. WE ARE A LARGE DAO
            CONSISTING OF UP TO 152 INDIVIDUALS, ALL WORKING TOWARDS ONE SHARED GOAL IN AN OPEN SOURCE ENVIRONMENT. 
            IN ADDITION WE WILL OPENLY DISPLAY ALL INFORMATION REGARDING OPERATIONS, EARNINGS AND FEE STRUCTURE. 
            ALL TRANSACTIONS ARE ALSO TRACKED ON CHAIN AND CAN BE AUDITED BY ANYONE AT ANY TIME.
          </Accordion.Body>
        </Accordion.Item>
        <hr />
        <Accordion.Item eventKey="2">
          <Accordion.Header>WHERE CAN I LEARN MORE?</Accordion.Header>
          <Accordion.Body>
            JOIN US ON DISCORD, THERE WILL ALWAYS BE SOMEONE TO HELP YOU OUT!
          </Accordion.Body>
        </Accordion.Item>
        <hr />
      </Accordion>

      <div className="w-full sm:w-[100%] 2xl:w-2/5 mx-auto max-w-[800px] mt-20 text-center mb-20"><span className=" text-sm sm:text-base text-[#054462] underline underline-offset-2">FAQ</span> | <Link to="/howto" className=" text-sm sm:text-base text-[#054462] no-underline">How To Play</Link> | <Link to="/responsibility" className=" text-sm sm:text-base text-[#054462] no-underline">Flip Responsibly</Link></div>

    </div>
  );
}

export default Faq;
