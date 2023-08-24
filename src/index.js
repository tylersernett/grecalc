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

  //drag code mod'd from //from https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // const elementRef = useRef(null);

  const draggingRef = useRef(false);
  // const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: -700 });
  const elementRef = useRef(null);

  // useEffect(() => {
  //   console.log(dragging)
  // }, [dragging])
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const dragAndDrop = (event) => {
    event.preventDefault();
    draggingRef.current = true;
    const initialX = event.clientX - position.x;
    const initialY = event.clientY - position.y;

    const onMouseMove = (event) => {
      if (draggingRef.current) {
        const newX = event.clientX - initialX;
        const newY = event.clientY - initialY;


        let calcElem = document.getElementById('calc-body');
        let calcWidth = calcElem.offsetWidth;  //221 ;
        let calcHeight = calcElem.offsetHeight; //298;

        const draggableWidth = 221/* Set the width of the draggable item */;
        const draggableHeight = 298/* Set the height of the draggable item */;

        // Get the dimensions of the visible window
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate the boundaries to keep the draggable item within the window
        const maxX = windowWidth - draggableWidth;
        const maxY = windowHeight - draggableHeight;
        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));


        //IMOPRT
        //account for calc body top margin:
        let appWidth = document.getElementsByClassName('app-container')[0].offsetWidth;
        let appHeight = document.getElementsByClassName('white-body')[0].scrollHeight
        let marginString = getComputedStyle(calcElem).marginTop
        let marginInt = parseInt(marginString); //crop the 'px' from the string & convert to integer
        let bannersElem = document.getElementById('banners');
        let minHeight = -(bannersElem.offsetHeight + marginInt); //-134
        let maxHeight = appHeight - calcHeight - marginInt;

        // Apply boundary constraints
        // const constrainedX = Math.max(0, Math.min(newX, maxX));
        // const constrainedY = Math.max(0, Math.min(newY, maxY));
        // const clampedX = clamp(newX, -5000, maxX)
        // const clampedY = clamp(newY, minHeight, maxHeight)

        // setPosition({ x: constrainedX, y: constrainedY });
        // setPosition({ x: clampedX, y: clampedY });
        setPosition({ x: newX, y: newY });
      }
    };

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


  // const dragAndDrop = useCallback(
  //   (event) => {
  //     if (event.target.className === "calc-top") { //only allow dragging on uppermost part of calculator
  //       const onMouseMove = (MouseEvent) => {
  //         const element = elementRef.current;
  //         let coords = element.getBoundingClientRect();
  //         //establish bounds:
  //         let appWidth = document.getElementsByClassName('app-container')[0].offsetWidth;
  //         let appHeight = document.getElementsByClassName('white-body')[0].scrollHeight
  //         let calcElem = document.getElementById('calc-body');
  //         let calcWidth = calcElem.offsetWidth;  //221 ;
  //         let calcHeight = calcElem.offsetHeight; //298;

  //         let minWidth = -appWidth + calcWidth + 10;
  //         let maxWidth = appWidth - coords.x - calcWidth;

  //         //account for calc body top margin:
  //         let marginString = getComputedStyle(calcElem).marginTop
  //         let marginInt = parseInt(marginString); //crop the 'px' from the string & convert to integer
  //         let bannersElem = document.getElementById('banners');
  //         let minHeight = -1000//-(bannersElem.offsetHeight + marginInt); //-134
  //         let maxHeight = 9999//appHeight - calcHeight - marginInt;

  //         let xSum = position.x + MouseEvent.movementX;
  //         let ySum = position.y + MouseEvent.movementY;
  //         const newPosition = {
  //           x: clamp(xSum, minWidth, maxWidth),
  //           y: clamp(ySum, minHeight, maxHeight)
  //         };
  //         setPosition(newPosition);

  //         if (element) {
  //           element.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px)`;
  //           // element.style.transform = `translate(${xSum}px, ${ySum}px)`;
  //         }
  //         setPosition(position);
  //       };

  //       const onMouseUp = () => {
  //         document.removeEventListener("mousemove", onMouseMove);
  //         document.removeEventListener("mouseup", onMouseUp);
  //       };
  //       document.addEventListener("mousemove", onMouseMove);
  //       document.addEventListener("mouseup", onMouseUp);
  //     }
  //   },
  //   [position, setPosition, elementRef]
  // );

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
