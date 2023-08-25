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
  const [position, setPosition] = useState({ x: 0, y: 140 });
  const elementRef = useRef(null);
  const isNotMobile = useMediaQuery('(min-width: 461px)');

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
          // let calcHeight = calcElem.offsetHeight; //298;

          let appHeight = document.getElementsByClassName('white-body')[0].scrollHeight
          let appWidth = document.getElementsByClassName('white-body')[0].clientWidth

          const constrainedX = clamp(newX, -appWidth + calcWidth, 2)
          const constrainedY = clamp(newY, -16, appHeight)
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
      <section className='calc-container' >
        <div className='calc-mover' ref={elementRef} onMouseDown={dragAndDrop} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
          <Calculator timerInputIsOpen={timerInputIsOpen} calcIsOpen={calcIsOpen} setCalcIsOpen={setCalcIsOpen} />
        </div>
      </section>
      <Timer timerInputIsOpen={timerInputIsOpen} setTimerInputIsOpen={setTimerInputIsOpen} calcIsOpen={calcIsOpen} setCalcIsOpen={setCalcIsOpen} />
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
