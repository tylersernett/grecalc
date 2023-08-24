import { React, useState, useCallback, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Calculator from './components/Calculator';
import Footer from './components/Footer';
import LinkEmbed from './components/LinkEmbed';
import Timer from './components/Timer';
import reportWebVitals from './reportWebVitals';

function App() {
  //declare timerInputIsOpen here, becuase both Timer and Calculator use it
  const [timerInputIsOpen, setTimerInputIsOpen] = useState(false);
  const [calcIsOpen, setCalcIsOpen] = useState(true);

  const draggingRef = useRef(false);
  const [position, setPosition] = useState({ x: 0, y: -700 });
  const elementRef = useRef(null);

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const dragAndDrop = (event) => {
    event.preventDefault();
    if (event.target.className === "calc-top") {
      draggingRef.current = true;
      const initialX = event.clientX - position.x;
      const initialY = event.clientY - position.y;

      const onMouseMove = (event) => {
        if (draggingRef.current) {
          const newX = event.clientX - initialX;
          const newY = event.clientY - initialY;
          setPosition({ x: newX, y: newY });
          let calcElem = document.getElementById('calc-body');
          let calcWidth = calcElem.offsetWidth;  //221 ;
          let calcHeight = calcElem.offsetHeight; //298;

          const draggableWidth = calcWidth//221/* Set the width of the draggable item */;
          const draggableHeight = calcHeight//298/* Set the height of the draggable item */;

          // Get the dimensions of the visible window
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;

          // Calculate the boundaries to keep the draggable item within the window
          const maxX = windowWidth - draggableWidth;
          const maxY = windowHeight - draggableHeight;
          // const constrainedX = Math.max(-5000, Math.min(newX, maxX));

          let appHeight = document.getElementsByClassName('white-body')[0].scrollHeight
          let appHeight2 = document.getElementsByClassName('white-body')[0].clientHeight
          let appHeight3 = document.getElementsByClassName('white-body')[0].offsetHeight
          let topHeight = document.getElementsByClassName('calc-top')[0].offsetHeight
          const topY = document.getElementsByClassName('calc-top')[0].getBoundingClientRect().y

          let marginString = getComputedStyle(calcElem).marginTop
          let marginInt = parseInt(marginString); //crop the 'px' from the string & convert to integer
          let bannersElem = document.getElementById('banners');
          let minHeight = -(bannersElem.getBoundingClientRect().height + marginInt); //-134
          let maxHeight = appHeight - calcHeight - marginInt;
          let footerHeight = document.getElementById('footer').getBoundingClientRect().height
          let bannersHeight = bannersElem.getBoundingClientRect().height

          const constrainedX = clamp(newX, -maxX + 0, 5)
          const constrainedY = clamp(newY, -(windowHeight+topHeight), -draggableHeight + 0)
          console.log(newY,constrainedY, appHeight, appHeight2,appHeight3,windowHeight, bannersHeight, minHeight, draggableHeight, windowHeight, appHeight+footerHeight+bannersHeight)
          console.log(document.getElementsByClassName('calc-top')[0].getBoundingClientRect())
          setPosition({ x: constrainedX, y: constrainedY });
        }

      }


      const onMouseUp = () => {
        if (draggingRef.current) {
          draggingRef.current = false;
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };
  };

  return (
    <div className='app-container'>
      <Timer timerInputIsOpen={timerInputIsOpen} setTimerInputIsOpen={setTimerInputIsOpen} calcIsOpen={calcIsOpen} setCalcIsOpen={setCalcIsOpen} />
      <div className='white-body'>
        <LinkEmbed />
        <section className='calc-container' >
          <div className='calc-mover' ref={elementRef} onMouseDown={dragAndDrop} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
            <Calculator timerInputIsOpen={timerInputIsOpen} calcIsOpen={calcIsOpen} setCalcIsOpen={setCalcIsOpen} />
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
