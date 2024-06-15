import React, { useEffect, useRef } from "react";

const BannerCarousel = () => {

  const curpageRef = useRef(1);
  const slidingRef = useRef(false);
  const clickRef = useRef(true);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const pagePrefix = "slide";
    const transitionPrefix = "circle";
    const totalSlides = 4;

    const leftSlide = () => {
      if (clickRef.current) {
        if (curpageRef.current === 1) curpageRef.current = totalSlides + 1;
        slidingRef.current = true;
        curpageRef.current--;
        clickRef.current = false;
        for (let k = 1; k <= totalSlides; k++) {
          const a1 = document.getElementById(pagePrefix + k);
          a1.classList.add("tran");
        }
        setTimeout(() => {
          move();
        }, 200);
        setTimeout(() => {
          for (let k = 1; k <= totalSlides; k++) {
            const a1 = document.getElementById(pagePrefix + k);
            a1.classList.remove("tran");
          }
        }, 1400);
      }
    };

    const rightSlide = () => {
      if (clickRef.current) {
        if (curpageRef.current === totalSlides) curpageRef.current = 0;
        slidingRef.current = true;
        curpageRef.current++;
        clickRef.current = false;
        for (let k = 1; k <= totalSlides; k++) {
          const a1 = document.getElementById(pagePrefix + k);
          a1.classList.add("tran");
        }
        setTimeout(() => {
          move();
        }, 200);
        setTimeout(() => {
          for (let k = 1; k <= totalSlides; k++) {
            const a1 = document.getElementById(pagePrefix + k);
            a1.classList.remove("tran");
          }
        }, 1400);
      }
    };

    const move = () => {
      if (slidingRef.current) {
        slidingRef.current = false;
        const svg = curpageRef.current % 2 === 0;
        if (svg) {
          for (let j = 1; j <= 9; j++) {
            const c = document.getElementById(transitionPrefix + j);
            c.classList.remove("steap");
            c.setAttribute("class", transitionPrefix + j + " streak");
          }
        } else {
          for (let j = 10; j <= 18; j++) {
            const c = document.getElementById(transitionPrefix + j);
            c.classList.remove("steap");
            c.setAttribute("class", transitionPrefix + j + " streak");
          }
        }
        setTimeout(() => {
          for (let i = 1; i <= totalSlides; i++) {
            const a = document.getElementById(pagePrefix + i);
            if (i === curpageRef.current) {
              a.classList.add("up1");
            } else {
              a.classList.remove("up1");
            }
          }
          slidingRef.current = true;
        }, 600);
        setTimeout(() => {
          clickRef.current = true;
        }, 1700);

        setTimeout(() => {
          if (svg) {
            for (let j = 1; j <= 9; j++) {
              const c = document.getElementById(transitionPrefix + j);
              c.classList.remove("streak");
              c.setAttribute("class", transitionPrefix + j + " steap");
            }
          } else {
            for (let j = 10; j <= 18; j++) {
              const c = document.getElementById(transitionPrefix + j);
              c.classList.remove("streak");
              c.setAttribute("class", transitionPrefix + j + " steap");
            }
          }
        }, 850);
      }
    };

    const handleKeyDown = (e) => {
      if (e.keyCode === 37) {
        leftSlide();
      } else if (e.keyCode === 39) {
        rightSlide();
      }
    };

    leftRef.current.onmousedown = leftSlide;
    rightRef.current.onmousedown = rightSlide;
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="banner_slider_parent">
      <div className="image_banner_slider">
        <button type="button" ref={rightRef} id="right" className="right" name="button">
          <svg
            version="1.1"
            id="Capa_1"
            width="40px"
            height="40px "
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 477.175 477.175"
            style={{ enableBackground: "new 0 0 477.175 477.175" }}
            xmlSpace="preserve"
          >
            <g>
              <path
                style={{ fill: "#9d9d9d" }}
                d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
         c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
         "
              />
            </g>
          </svg>
        </button>
        <button type="button" ref={leftRef} id="left" className="left" name="button">
          <svg
            version="1.1"
            id="Capa_2"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 477.175 477.175"
            style={{ enableBackground: "new 0 0 477.175 477.175" }}
            xmlSpace="preserve"
          >
            <g>
              <path
                style={{ fill: "#9d9d9d" }}
                d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
         c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"
              />
            </g>
          </svg>
        </button>
        <svg
          id="svg2"
          className="up2"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <circle id="circle1" className="circle1 steap" cx="34px" cy="49%" r={20} />
          <circle id="circle2" className="circle2 steap" cx="34px" cy="49%" r={100} />
          <circle id="circle3" className="circle3 steap" cx="34px" cy="49%" r={180} />
          <circle id="circle4" className="circle4 steap" cx="34px" cy="49%" r={260} />
          <circle id="circle5" className="circle5 steap" cx="34px" cy="49%" r={340} />
          <circle id="circle6" className="circle6 steap" cx="34px" cy="49%" r={420} />
          <circle id="circle7" className="circle7 steap" cx="34px" cy="49%" r={500} />
          <circle id="circle8" className="circle8 steap" cx="34px" cy="49%" r={580} />
          <circle id="circle9" className="circle9 steap" cx="34px" cy="49%" r={660} />
        </svg>
        <svg
          id="svg1"
          className="up2"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <circle id="circle10" className="circle10 steap" cx="648px" cy="49%" r={20} />
          <circle id="circle11" className="circle11 steap" cx="648px" cy="49%" r={100} />
          <circle id="circle12" className="circle12 steap" cx="648px" cy="49%" r={180} />
          <circle id="circle13" className="circle13 steap" cx="648px" cy="49%" r={260} />
          <circle id="circle14" className="circle14 steap" cx="648px" cy="49%" r={340} />
          <circle id="circle15" className="circle15 steap" cx="648px" cy="49%" r={420} />
          <circle id="circle16" className="circle16 steap" cx="648px" cy="49%" r={500} />
          <circle id="circle17" className="circle17 steap" cx="648px" cy="49%" r={580} />
          <circle id="circle18" className="circle18 steap" cx="648px" cy="49%" r={660} />
        </svg>
        <div id="slide1" className="slide1 up1">
          
          Shop the Latest - Shop the Best 
        </div>
        <div id="slide2" className="slide2">
          Kids Collections
        </div>
        <div id="slide3" className="slide3">
          Meet the New look
        </div>
        <div id="slide4" className="slide4">
          Check out the Best <br />
          {/* <a href="#" className="btn shop_now_btn">
              Shop Now
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
