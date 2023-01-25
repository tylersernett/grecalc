import { React, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Calculator from './calculator';
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
          let xSum = position.x + MouseEvent.movementX;
          let ySum = position.y + MouseEvent.movementY;

          let appWidth = document.getElementsByClassName('app-container')[0].clientWidth
          let appHeight = document.getElementsByClassName('white-body')[0].clientHeight
          let calcWidth = 221 + 0;
          let calcHeight = 298;
          // let bannerHeight = 130;
          let coords = element.getBoundingClientRect();
          console.log(coords)

          let minWidth = -appWidth + calcWidth + 10;
          let maxWidth = appWidth - coords.x - calcWidth;
          let minHeight = -134;
          //let maxHeight = appHeight - calcHeight - bannerHeight;
          let maxHeight = appHeight - calcHeight - 12;

          position.x = clamp(xSum, minWidth, maxWidth );
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
        <div className='calc-container' >
          <div className='calc-mover' ref={elementRef} onMouseDown={dragAndDrop}>
            <Calculator timerInputIsOpen={timerInputIsOpen} calcIsOpen={calcIsOpen} setCalcIsOpen={setCalcIsOpen} />
          </div>
        </div>
      </div>
      <footer className='footer'>
        ©<a href="https://github.com/tylersernett/">Tyler Sernett</a>
      </footer>
    </div>
  );
};

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);

// module.exports = Calculator;

//redo equalsClickHandle switch statement for less redundancy
//how does GRE calc handle -? as negative, or always subtract?
//add memory functions
//sqrt: 9+, 9/, etc
//memory recall, then NUMBERBUTTON ==> append to string
//after recall -- reset string UNLESS its operand! +-*/
//should it just be... result = recall, string = ""???
//paren + memRecall + operand ==> ( paren removed??
//14 / memRecall ... not recalling?
//when closing Parens... something needs update
//5 + memclear + 9 should not be 59
//store 5
//recall 5
//clear 5, 9 ==> 59
//BUG: result or num holding UNROUNDED values for lonnnnng decimals
//FIXED!
//TEST: 1/7 * 7 = 0.9999997
//CHECK: behavior when ERROR is in display. must you hit C to move on?
//ERROR-LOCK  you MUST hit C to continue 
//CSS: everything gets darker on click, and gets BOX highlight on hover


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
