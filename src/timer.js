import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Modal from './Modal';

const Modal_Wrapper = {
    position: 'relative',
    zIndex: 1
}

function Timer({ timerInputIsOpen, setTimerInputIsOpen }) {

    let defaultTime = 35 * 60;
    const [seconds, setSeconds] = useState(defaultTime);
    const [run, setRun] = useState(false);
    const [hide, setHide] = useState(false);
    const [display, setDisplay] = useState({
        hours: Math.floor(seconds / 3600),
        minutes: Math.floor(seconds % 3600 / 60),
        seconds: Math.floor(seconds % 3600 % 60),
    });
    const hh = useRef('0');
    const mm = useRef('0');
    const ss = useRef('0');

    const startTimer = () => {
        setRun(true);
    };
    const pauseTimer = () => {
        setRun(false);
    };
    const stopTimer = () => {
        setRun(false);
        setSeconds(defaultTime);
    };
    const assignTimer = () => {
        setRun(false);
        const newTime = prompt('Please enter # seconds')
        if (newTime !== null) {
            setSeconds(newTime);
        }
    };

    useEffect(() => {
        let interval;
        if (run === true) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [run]);

    useEffect(() => {
        getReturnValues(seconds);
        console.log(seconds, display.hours, display.minutes, display.seconds);
    }, [seconds])

    const getReturnValues = (seconds) => {
        // calculate time left
        // const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        // const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
        const addZeroIfUnderTen = (time) => {
            if (time < 10) {
                return "0" + time.toString();
            }
            return time;
        }
        let displayHours = Math.floor(seconds / 3600);
        let displayMinutes = Math.floor(seconds % 3600 / 60);
        let displaySeconds = Math.floor(seconds % 3600 % 60);
        displayHours = addZeroIfUnderTen(displayHours);
        displayMinutes = addZeroIfUnderTen(displayMinutes);
        displaySeconds = addZeroIfUnderTen(displaySeconds);

        setDisplay({
            hours: displayHours,
            minutes: displayMinutes,
            seconds: displaySeconds
        })
    };

    const toggleHide = () => {
        setHide(!hide)
    }

    // const [timerInputIsOpen, setTimerInputIsOpen] = useState(false);
    const handleSubmit = () => {
        setRun(false);
        let secs = 0;
        if (hh.current.value === "") {
            hh.current.value = '0';
        }
        if (mm.current.value === "") {
            mm.current.value = '0';
        }
        if (ss.current.value === "") {
            ss.current.value = '0';
        }
        secs += parseInt(hh.current.value) * 3600;
        secs += parseInt(mm.current.value) * 60;
        secs += parseInt(ss.current.value);
        setTimerInputIsOpen(false);
        setSeconds(secs);
    }

    const HideTimeDisplay = () => {
        return (
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="-1 -1 18 18">
                <path stroke="currentColor" stroke-width="1" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path stroke="currentColor" stroke-width="1" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
              </svg> Hide Time</span>
        );
    };

    const ShowTimeDisplay = () => {
        return (
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="-1 -1 18 18">
                <path stroke="currentColor" stroke-width="1" d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path stroke="currentColor" stroke-width="1" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
              </svg> Show Time</span>
        );
    };

    return (
        <div className="wrapper">
            <div className='top-banner'>
                <div className='title fs-2'><i>GRE Calc</i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" fill="currentColor" class="bi bi-calculator" viewBox="0 0 16 16">
                        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
                        <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z" />
                    </svg>
                </div>
                <div className='timer-buttons'>
                    {!run ?
                        // PLAY
                        <button className='timer-btn fs-4' onClick={startTimer}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-fill" viewBox="0 1 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                        </svg></button>
                        //PAUSE
                        : <button className='timer-btn fs-4' onClick={pauseTimer}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pause-fill" viewBox="0 1 16 16">
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                        </svg></button>}
                    <button className='timer-btn fs-4' onClick={stopTimer}>
                        {/* RESET */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" stroke="currentColor" stroke-width="0.75"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" stroke="currentColor" stroke-width="0.5" />
                        </svg>
                    </button>
                    <button className='timer-btn fs-4' onClick={() => setTimerInputIsOpen(true)}>
                        Set
                    </button>
                </div>
            </div>

            <div className='timer-banner'>
                <span className='timer-display'>{hide? "" : seconds < 0 ? "Time expired" : display.hours + ":" + display.minutes + ":" + display.seconds}</span>
                <span className='hide-display' onClick={toggleHide}>{hide ? ShowTimeDisplay() : HideTimeDisplay()}</span>
                {/* <div> */}

                <span style={Modal_Wrapper}>

                    <Modal open={timerInputIsOpen} >
                        <div className='timer-input-wrapper'>
                            Enter time below
                            <p />

                            <form onSubmit={handleSubmit} autocomplete="off">
                                <div className='timer-input-box'>
                                    <input className='timer-input' type='text' maxLength='2' placeholder='00' pattern="\d*" id='HH' ref={hh} />
                                    <div>:</div>
                                    <input className='timer-input' type='text' maxLength='2' placeholder='00' pattern="\d*" id='MM' ref={mm} />
                                    <div>:</div>
                                    <input className='timer-input' type='text' maxLength='2' placeholder='00' pattern="\d*" id='SS' ref={ss} />
                                    <label for="HH">HH</label>
                                    &nbsp;
                                    <label for="MM">MM</label>
                                    &nbsp;
                                    <label for="SS">SS</label>
                                </div>
                                <button className='timer-btn fs-5' id='cancel' onClick={() => setTimerInputIsOpen(false)}>Cancel</button>
                                <input className='timer-btn fs-5' type='submit' id='set-time' value='Set Time'></input>
                            </form>

                        </div>
                    </Modal>
                </span>
                {/* </div> */}
            </div>
        </div>
    );
};

export default Timer;
//TODO: add hide/show time button [time text anchored in some position]
//add drag and drop to calc
//modal ESC
//default time update

/*
import React, { useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";

const Component: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(
    (event) => {
      const onMouseMove = (event: MouseEvent) => {
        position.x += event.movementX;
        position.y += event.movementY;
        const element = elementRef.current;
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
    },
    [position, setPosition, elementRef]
  );

  return (
    <Container>
      <DraggableItem ref={elementRef} onMouseDown={onMouseDown}>
      </DraggableItem>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const DraggableItem = styled.div`
  position: absolute;
  z-index: 1;
  left: 20px;
  top: 20px;
  width: 100px;
  height: 100px;
  background-color: green;
`;
*/
//from https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable

/*import React, { useCallback, useRef, useState } from "react";
// import styled, { css } from "styled-components/macro";

const Component: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(
    (event) => {
      const onMouseMove = (event: MouseEvent) => {
        position.x += event.movementX;
        position.y += event.movementY;
        const element = elementRef.current;
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
    },
    [position, setPosition, elementRef]
  );

  return (
    <Container>
      <DraggableItem ref={elementRef} onMouseDown={onMouseDown}>
      </DraggableItem>
    </Container>
  );
};

const Container = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
};

const DraggableItem = {
  position: 'absolute',
  zIndex: 1,
  left: '20px',
  top: '20px',
  width: '100px',
  height: '100px',
  backgroundColor: 'green'
};
*/