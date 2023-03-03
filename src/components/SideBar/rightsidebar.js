import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; 

import LunBull566 from "../../images/LunaBull566.jpeg";
import LunBull587 from "../../images/LunaBull587.jpeg";
import LunBull769 from "../../images/LunaBull769.jpeg";
import LunBull867 from "../../images/LunaBull867.jpeg";
import LunBull872 from "../../images/LunaBull872.jpeg";
import LunBull1052 from "../../images/LunaBull1052.jpeg";
import LunBull1053 from "../../images/LunaBull1053.jpeg";


const RightSideBar = () => {
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
    rtl: true,
  };

  return (
    <div className='hidden sm:flex'>
      <div className="">
        <Slider {...settings}>
          <div className='w-1/2'>
            <img src={LunBull566} alt={"LunBull55"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull587} alt={"LunBull195"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull769} alt={"LunBull303"}/>
          </div>
          <div className='w-1/2  gap-x-2 '>
            <img src={LunBull867} alt={"LunBull307"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull872} alt={"LunBull394"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull1052} alt={"LunBull410"}/>
          </div>
          <div className='w-1/2'>
            <img src={LunBull1053} alt={"LunBull433"}/>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default RightSideBar;
