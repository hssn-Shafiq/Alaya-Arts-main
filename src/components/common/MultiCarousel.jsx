import React, { useEffect } from "react";

import img1 from "@/images/image1.jpg";
import img2 from "@/images/image2.jpg";
import img3 from "@/images/image3.jpg";
import img4 from "@/images/image4.jpg";
// import img1 from "@/images/image1.jpg";
// import img1 from "@/images/image1.jpg";
// import img1 from "@/images/image1.jpg";


const MultiCarousel = () => {

  // when we have to use javaScript in the code then we have to use useEffect

  useEffect(() => {
    let slideIndex = 0;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("demo");
      let captionText = document.getElementById("caption");
      if (n >= slides.length) { slideIndex = 0 }
      if (n < 0) { slideIndex = slides.length - 1 }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex].style.display = "block";
      dots[slideIndex].className += " active";
      captionText.innerHTML = dots[slideIndex].alt;
    }

    // Auto cycle slides every 3 seconds
    setInterval(function () {
      plusSlides(1);
    }, 5000);

  }, [])

  return (
    <>
      <div className="container-fluid multicarousel">
        {/* Full-width images with number text */}
        <div className="mySlides">
          <div className="numbertext">1 / 6</div>
          <img src={img1} style={{ width: "100%" }} />
        </div>
        <div className="mySlides">
          <div className="numbertext">2 / 6</div>
          <img src={img4} style={{ width: "100%" }} />
        </div>
        <div className="mySlides">
          <div className="numbertext">3 / 6</div>
          <img src={img3} style={{ width: "100%" }} />
        </div>
        <div className="mySlides">
          <div className="numbertext">4 / 6</div>
          <img src={img2} style={{ width: "100%" }} />
        </div>
        <div className="mySlides">
          <div className="numbertext">5 / 6</div>
          <img src={img1} style={{ width: "100%" }} />
        </div>
        <div className="mySlides">
          <div className="numbertext">6 / 6</div>
          <img src={img3} style={{ width: "100%" }} />
        </div>
        {/* Next and previous buttons */}
        <a className="prev" onclick="plusSlides(-1)">
          ❮
        </a>
        <a className="next" onclick="plusSlides(1)">
          ❯
        </a>
        {/* Image text */}
        <div className="caption-container">
          <p id="caption" />
        </div>
        {/* Thumbnail images */}
        <div className="row">
          <div className="column">
            <img
              className="demo cursor"
              src={img1}
              style={{ width: "100%" }}
              onclick="currentSlide(1)"
              alt="The Best"
            />
          </div>
          <div className="column">
            <img
              className="demo cursor"
              src={img4}
              style={{ width: "100%" }}
              onclick="currentSlide(2)"
              alt="Choose Best"
            />
          </div>
          <div className="column">
            <img
              className="demo cursor"
              src={img3}
              style={{ width: "100%" }}
              onclick="currentSlide(3)"
              alt="According to Your taste"
            />
          </div>
          <div className="column">
            <img
              className="demo cursor"
              src={img2}
              style={{ width: "100%" }}
              onclick="currentSlide(4)"
              alt="Discount "
            />
          </div>
          <div className="column">
            <img
              className="demo cursor"
              src={img1}
              style={{ width: "100%" }}
              onclick="currentSlide(5)"
              alt="Demanding Sell Items"
            />
          </div>
          <div className="column">
            <img
              className="demo cursor"
              src={img3}
              style={{ width: "100%" }}
              onclick="currentSlide(6)"
              alt="Choose Your Best Ideas"
            />
          </div>
        </div>
      </div>

    </>
  )
}
export default MultiCarousel;