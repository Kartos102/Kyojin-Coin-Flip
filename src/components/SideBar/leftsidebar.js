import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; 

import LunBull55 from "../../images/LunaBull55.jpeg";
import LunBull195 from "../../images/LunaBull195.jpeg";
import LunBull303 from "../../images/LunaBull303.jpeg";
import LunBull307 from "../../images/LunaBull307.jpeg";
import LunBull394 from "../../images/LunaBull394.jpeg";
import LunBull410 from "../../images/LunaBull410.jpeg";
import LunBull433 from "../../images/LunaBull433.jpeg";

import LunBull566 from "../../images/LunaBull566.jpeg";
import LunBull587 from "../../images/LunaBull587.jpeg";
import LunBull769 from "../../images/LunaBull769.jpeg";
import LunBull867 from "../../images/LunaBull867.jpeg";
import LunBull872 from "../../images/LunaBull872.jpeg";
import LunBull1052 from "../../images/LunaBull1052.jpeg";
import LunBull1053 from "../../images/LunaBull1053.jpeg";

const LeftSideBar = () => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 3000,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4,
    rtl: false,
  };

  return (
    <div className='hidden sm:flex'>
      <div className="w-1/2 pr-[5px]">
        <Slider {...settings}>
          <div className='w-1/2'>
            <img src={LunBull55} alt={"LunBull55"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull195} alt={"LunBull195"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull303} alt={"LunBull303"}/>
          </div>
          <div className='w-1/2  gap-x-2 '>
            <img src={LunBull307} alt={"LunBull307"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull394} alt={"LunBull394"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull410} alt={"LunBull410"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull433} alt={"LunBull433"}/>
          </div>
        </Slider>
      </div>
      <div className="w-1/2 pr-[5px]">
        <Slider {...settings}>
          <div className='w-1/2'>
            <img src={LunBull566} alt={"LunBull566"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull587} alt={"LunBull587"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull769} alt={"LunBull769"}/>
          </div>
          <div className='w-1/2  gap-x-2 '>
            <img src={LunBull867} alt={"LunBull867"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull872} alt={"LunBull872"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull1052} alt={"LunBull1052"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull1053} alt={"LunBull1053"}/>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default LeftSideBar;
