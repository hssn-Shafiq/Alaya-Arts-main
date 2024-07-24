// src/components/common/MultiCarousel.jsx
import React, { useEffect, useRef, useState } from "react";

const MultiCarousel = ({ images }) => {
  const slideIndex = useRef(0);
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (images.length) {
      showSlides(slideIndex.current);
      const id = setInterval(() => {
        plusSlides(1);
      }, 5000);
      setIntervalId(id);
    }
    return () => clearInterval(intervalId);
  }, [images]);

  const plusSlides = (n) => {
    showSlides(slideIndex.current += n);
  };

  const currentSlide = (n) => {
    showSlides(slideIndex.current = n);
  };

  const showSlides = (n) => {
    let i;
    if (n >= slidesRef.current.length) { slideIndex.current = 0 }
    if (n < 0) { slideIndex.current = slidesRef.current.length - 1 }
    for (i = 0; i < slidesRef.current.length; i++) {
      if (slidesRef.current[i]) slidesRef.current[i].style.display = "none";
    }
    for (i = 0; i < dotsRef.current.length; i++) {
      if (dotsRef.current[i]) dotsRef.current[i].className = dotsRef.current[i].className.replace(" active", "");
    }
    if (slidesRef.current[slideIndex.current]) {
      slidesRef.current[slideIndex.current].style.display = "block";
      if (dotsRef.current[slideIndex.current]) {
        dotsRef.current[slideIndex.current].className += " active";
        document.getElementById("caption").innerHTML = dotsRef.current[slideIndex.current].alt;
      }
    }
  };

  return (
    <div className="container-fluid multicarousel">
      {images.map((image, index) => (
        <div className="mySlides" key={index} ref={el => slidesRef.current[index] = el}>
          <div className="numbertext">{index + 1} / {images.length}</div>
          <img src={image.src} style={{ width: "100%" }} alt={image.alt} />
        </div>
      ))}

      <a className="prev" onClick={() => plusSlides(-1)}>
        ❮
      </a>
      <a className="next" onClick={() => plusSlides(1)}>
        ❯
      </a>

      <div className="caption-container">
        <p id="caption" />
      </div>

      <div className="row">
        {images.map((image, index) => (
          <div className="column" key={index}>
            <img
              className="demo cursor"
              src={image.src}
              style={{ width: "100%" }}
              onClick={() => currentSlide(index)}
              alt={image.alt}
              ref={el => dotsRef.current[index] = el}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiCarousel;
