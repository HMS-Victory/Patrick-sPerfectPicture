import React, { useState } from "react";
import "./PastWork.css";
import Slider from "react-slick";
// import images
import Image from "../../../assets/Image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function PastWork({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };
  //when screen is too small use this function to switch slides instead
  function nextSlide() {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  }
  function previousSlide() {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  }

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  return (
    <>
      {window.innerWidth > 900 ? (
        <div className="container">
          <Slider {...settings} className="slider">
            {images.map((img, idx) => {
              return (
                <div
                  className={idx === imageIndex ? "slide activeSlide" : "slide"}
                  key={Math.random()}
                >
                  <Image fileName={img} alt={img} />
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <section className="sliderContainer">
          <FaArrowAltCircleLeft
            className="left-arrow"
            onClick={previousSlide}
          />
          <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
          {images.map((img, index) => {
            return (
              <div
                className={
                  index === current ? "slideHolder active" : "slideHolder"
                }
                key={index}
              >
                {index === current && <Image fileName={img} alt={img} />}
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}
export default PastWork;
