import { React, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Calculator from './calculator';
import Footer from './components/Footer';
import Timer from './timer';
import reportWebVitals from './reportWebVitals';

function App() {
  //declare timerInputIsOpen here, becuase both Timer and Calculator use it
  const [timerInputIsOpen, setTimerInputIsOpen] = useState(false);
  const [calcIsOpen, setCalcIsOpen] = useState(true);

  //drag code mod'd from //from https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const dragAndDrop = useCallback(
    (event) => {
      if (event.target.className === "calc-top") { //only allow dragging on uppermost part of calculator
        const onMouseMove = (MouseEvent) => {
          const element = elementRef.current;
          let coords = element.getBoundingClientRect();
          //establish bounds:
          let appWidth = document.getElementsByClassName('app-container')[0].offsetWidth;
          let appHeight = document.getElementsByClassName('white-body')[0].scrollHeight
          let calcElem = document.getElementById('calc-body');
          let calcWidth = calcElem.offsetWidth;  //221 ;
          let calcHeight = calcElem.offsetHeight; //298;

          let minWidth = -appWidth + calcWidth + 10;
          let maxWidth = appWidth - coords.x - calcWidth;

          //account for calc body top margin:
          let marginString = getComputedStyle(calcElem).marginTop
          let marginInt = parseInt(marginString); //crop the 'px' from the string & convert to integer
          let bannersElem = document.getElementById('banners');
          let minHeight = -(bannersElem.offsetHeight + marginInt); //-134
          let maxHeight = appHeight - calcHeight - marginInt;

          let xSum = position.x + MouseEvent.movementX;
          let ySum = position.y + MouseEvent.movementY;
          position.x = clamp(xSum, minWidth, maxWidth);
          position.y = clamp(ySum, minHeight, maxHeight);

          if (element) {
            element.style.transform = `translate(${position.x}px, ${position.y}px)`;
          }
          setPosition(position);
        };

        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }
    },
    [position, setPosition, elementRef]
  );

  return (
    <div className='app-container'>
      <Timer timerInputIsOpen={timerInputIsOpen} setTimerInputIsOpen={setTimerInputIsOpen} calcIsOpen={calcIsOpen} setCalcIsOpen={setCalcIsOpen} />
      <div className='white-body'>
        {/* <iframe title ='a' src="https://www.w3schools.com"></iframe> */}
        <section className='calc-container' >
          <div className='calc-mover' ref={elementRef} onMouseDown={dragAndDrop}>
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
