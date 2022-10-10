import { React, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Calculator from './calculator';
import Timer from './timer';
import reportWebVitals from './reportWebVitals';

// const Container = {
//   position: 'absolute',
//   width: '100%',
//   height: '100%',
//   top: 0,
//   left: 0,
//   overflow: 'hidden',
// };

const par = {
  // position: 'absolute',
  // backgroundColor: 'red',
  //height: '500px',
  minHeight: 'calc(100vh)',
  width: '100%',
};

const DraggableItem = {
  // position: 'absolute',
  // zIndex: 1,
  // left: '20px',
  // top: '20px',
  width: '300px',
  height: '50px',
  // height: '100px',
  // backgroundColor: 'green'
};

function App() {
  //declare timerInputIsOpen here, becuase both Timer and Calculator use it
  const [timerInputIsOpen, setTimerInputIsOpen] = useState(false);

  //drag code mod'd from //from https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const dragAndDrop = useCallback(
    (event) => {
      if (event.target.className === "calc-top") { //only allow dragging on uppermost part of calculator
        const onMouseMove = (MouseEvent) => {
          const element = elementRef.current;
          let maxWidth = element.parentElement.clientWidth;
          let maxHeight = element.parentElement.clientHeight;
          let xSum = position.x + MouseEvent.movementX;
          let ySum = position.y + MouseEvent.movementY;
          let calcWidth = 256 + 10;
          let calcHeight = 300;
          //TODO: document.getElementById('masonryParent').children[0].style.height
          let bannerHeight = 130;
          if (xSum > 0 && xSum + calcWidth < maxWidth) {
            position.x = xSum;
          }
          if (ySum > 0 && ySum + calcHeight + bannerHeight < maxHeight) {
            position.y = ySum;
          }
          console.log(position.x, position.y, maxHeight);

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
    <>
      <Timer timerInputIsOpen={timerInputIsOpen} setTimerInputIsOpen={setTimerInputIsOpen} />
      <div style={par}>
        <div ref={elementRef} style={DraggableItem} onMouseDown={dragAndDrop}>
          <Calculator timerInputIsOpen={timerInputIsOpen} />
        </div>
      </div>
    </>
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
