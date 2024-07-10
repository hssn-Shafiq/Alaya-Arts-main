import React, { useEffect } from "react";

const MultiCarousel = ({ images }) => {
  useEffect(() => {
    let slideIndex = 0;
    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

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
      if (dots[slideIndex]) {
        dots[slideIndex].className += " active";
        captionText.innerHTML = dots[slideIndex].alt;
      }
    }

    setInterval(function () {
      plusSlides(1);
    }, 5000);
  }, []);

  return (
    <>
      <div className="container-fluid multicarousel">
        {images.map((image, index) => (
          <div className="mySlides" key={index}>
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
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MultiCarousel;
