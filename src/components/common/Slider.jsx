// src/Slider.js
import React, { useState, useEffect } from "react";
import PropType from "prop-types";


const Slider = () => {
  useEffect(() => {
    const slidesData = [
      {
        img: 'https://media.istockphoto.com/id/1614454660/photo/male-model-posing-in-green-kurta.jpg?s=612x612&w=0&k=20&c=XN-4lHZ3MCT69pUm5hGyPllw94OJ0JsZbSosYSwnXOU=',
        title: 'Slide 1',
        subtitle: 'Subtitle 1',
        description: 'Description for Slide 1.'
      },
      {
        img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2lkcyUyMGZhc2hpb258ZW58MHwwfDB8fHww',
        title: 'Slide 2',
        subtitle: 'Subtitle 2',
        description: 'Description for Slide 2.'
      },
      {
        img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3RoaW5nc3xlbnwwfDB8MHx8fDA%3D',
        title: 'Slide 3',
        subtitle: 'Subtitle 3',
        description: 'Description for Slide 3.'
      }
    ];
  
    const loader = document.querySelector('.loader');
    const slider = document.querySelector('.slider');
    const slidesWrapper = document.querySelector('.slides');
    const slidesInfoWrapper = document.querySelector('.slides--infos');
    const btnPrev = document.querySelector('.slider--btn[data-dir="prev"]');
    const btnNext = document.querySelector('.slider--btn[data-dir="next"]');
  
    let currentSlide = 0;
  
    function createSlide(slideData, index) {
      const slide = document.createElement('div');
      slide.classList.add('slide');
      slide.dataset.index = index;
  
      const slideInner = document.createElement('div');
      slideInner.classList.add('slide__inner');
  
      const slideImageWrapper = document.createElement('div');
      slideImageWrapper.classList.add('slide--image__wrapper');
  
      const slideImage = document.createElement('img');
      slideImage.classList.add('slide--image');
      slideImage.src = slideData.img;
  
      slideImageWrapper.appendChild(slideImage);
      slideInner.appendChild(slideImageWrapper);
      slide.appendChild(slideInner);
  
      return slide;
    }
  
    function createSlideInfo(slideData, index) {
      const slideInfo = document.createElement('div');
      slideInfo.classList.add('slide-info');
      slideInfo.dataset.index = index;
  
      const slideInfoInner = document.createElement('div');
      slideInfoInner.classList.add('slide-info__inner');
  
      const slideInfoTextWrapper = document.createElement('div');
      slideInfoTextWrapper.classList.add('slide-info--text__wrapper');
  
      const slideTitle = document.createElement('div');
      slideTitle.classList.add('slide-info--text');
      slideTitle.dataset.title = '';
      slideTitle.innerHTML = `<span>${slideData.title}</span>`;
  
      const slideSubtitle = document.createElement('div');
      slideSubtitle.classList.add('slide-info--text');
      slideSubtitle.dataset.subtitle = '';
      slideSubtitle.innerHTML = `<span>${slideData.subtitle}</span>`;
  
      const slideDescription = document.createElement('div');
      slideDescription.classList.add('slide-info--text');
      slideDescription.dataset.description = '';
      slideDescription.innerHTML = `<span>${slideData.description}</span>`;
  
      slideInfoTextWrapper.appendChild(slideTitle);
      slideInfoTextWrapper.appendChild(slideSubtitle);
      slideInfoTextWrapper.appendChild(slideDescription);
  
      slideInfoInner.appendChild(slideInfoTextWrapper);
      slideInfo.appendChild(slideInfoInner);
  
      return slideInfo;
    }
  
    function updateSlides() {
      const slides = document.querySelectorAll('.slide');
      const slidesInfo = document.querySelectorAll('.slide-info');
  
      slides.forEach((slide, index) => {
        slide.removeAttribute('data-current');
        slide.removeAttribute('data-previous');
        slide.removeAttribute('data-next');
  
        if (index === currentSlide) {
          slide.dataset.current = '';
        } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
          slide.dataset.previous = '';
        } else if (index === (currentSlide + 1) % slides.length) {
          slide.dataset.next = '';
        }
      });
  
      slidesInfo.forEach((slideInfo, index) => {
        slideInfo.removeAttribute('data-current');
        slideInfo.removeAttribute('data-previous');
        slideInfo.removeAttribute('data-next');
  
        if (index === currentSlide) {
          slideInfo.dataset.current = '';
        } else if (index === (currentSlide - 1 + slidesInfo.length) % slidesInfo.length) {
          slideInfo.dataset.previous = '';
        } else if (index === (currentSlide + 1) % slidesInfo.length) {
          slideInfo.dataset.next = '';
        }
      });
    }
  
    function initSlider() {
      slidesData.forEach((slideData, index) => {
        const slide = createSlide(slideData, index);
        const slideInfo = createSlideInfo(slideData, index);
  
        slidesWrapper.appendChild(slide);
        slidesInfoWrapper.appendChild(slideInfo);
      });
  
      updateSlides();
  
      btnPrev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
        updateSlides();
      });
  
      btnNext.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slidesData.length;
        updateSlides();
      });
  
      loader.dataset.loaded = '';
    }
  
    window.addEventListener('load', initSlider);
  }, []);

  return (
    <>
     <div className="slider_title text-center ">
        <h2>Explore the Best</h2>
      </div>
     <div className="my_image_slider">
      <>
        <div className="slider">
          <button
            className="slider--btn"
            data-dir="prev"
            aria-label="Go to previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1={19} y1={12} x2={5} y2={12} />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <div className="slides__wrapper">
            <div className="slides">
              {/* Slides will be injected here by JavaScript */}
            </div>
            <div className="slides--infos">
              {/* Slide info will be injected here by JavaScript */}
            </div>
          </div>
          <button
            className="slider--btn"
            data-dir="next"
            aria-label="Go to next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1={5} y1={12} x2={19} y2={12} />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
       
      </>
    </div>
    </>
   
  );
};

export default Slider;
