import React from 'react';
import Slider from './Slider';
import './style.css';

export default function App() {
  React.useEffect(() => {
    const slider = document.querySelector('.slider-container'),
      sliders = Array.from(document.querySelectorAll('.slide'));
    let isDragging = false,
      startPos = 0,
      currentTranslate = 0,
      prevTranslate = 0,
      animationId = 0,
      currentIndex = 0;

    sliders.forEach((slide, index) => {
      const slideImg = slide.querySelector('img');
      slideImg.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
      //Touch event
      slide.addEventListener('touchstart', touchStart(index));
      slide.addEventListener('touchend', touchEnd);
      slide.addEventListener('touchmove', touchMove);

      //Mouse event
      slide.addEventListener('mousedown', touchStart(index));
      slide.addEventListener('mouseup', touchEnd);
      slide.addEventListener('mouseleave', touchEnd);
      slide.addEventListener('mousemove', touchMove);
    });
    window.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
    function touchStart(index) {
      return function (event) {
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true;
        animationId = requestAnimationFrame(animation);
        slider.classList.add('grabbing');
      };
    }
    function touchEnd() {
      isDragging = false;
      cancelAnimationFrame(animationId);
      const movedBy = currentTranslate - prevTranslate;
      if (movedBy < -100 && currentIndex < sliders.length - 1) {
        currentIndex += 1;
      }
      if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
      }
      setPositionByIndex();
      slider.classList.remove('grabbing');
    }
    function touchMove() {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
      }
    }

    function getPositionX(event) {
      return event.type.includes('mouse')
        ? event.pageX
        : event.touches[0].clientX;
    }
    function animation() {
      setSliderPosition();
      if (isDragging) {
        requestAnimationFrame(animation);
      }
    }

    function setSliderPosition() {
      slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
      currentTranslate = currentIndex * -window.innerWidth;
      prevTranslate = currentTranslate;
      setSliderPosition();
    }
  });
  return <Slider />;
}
