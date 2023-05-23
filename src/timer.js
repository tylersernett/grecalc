import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import Modal from './Modal';

const Modal_Wrapper = {
    position: 'relative',
    zIndex: 1
}

function Timer({ timerInputIsOpen, setTimerInputIsOpen, calcIsOpen, setCalcIsOpen }) {

    // let defaultTime = 35 * 60;
    const [defaultTime, setDefaultTime] = useState(35 * 60);
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
    const resetTimer = () => {
        setHide(false);
        setRun(false);
        setSeconds(defaultTime);
    };

    //set interval everytime "run" status changes
    useEffect(() => {
        let interval;
        if (run === true) {
            interval = setInterval(() => {
                setSeconds((currentSeconds) => currentSeconds - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [run]);

    //get new return value everytime "seconds" changes
    useEffect(() => {
        getReturnValues(seconds);
        // console.log(seconds, display.hours, display.minutes, display.seconds);
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

    const handleSubmit = useCallback(() => {
        let secs = 0;
        if (hh.current.value === "") {
            hh.current.value = '00';
        }
        if (mm.current.value === "") {
            mm.current.value = '00';
        }
        if (ss.current.value === "") {
            ss.current.value = '00';
        }
        secs += parseInt(hh.current.value) * 3600;
        secs += parseInt(mm.current.value) * 60;
        secs += parseInt(ss.current.value);
        console.log(secs);
        if (secs > 0) {
            setRun(false);
            setTimerInputIsOpen(false);
            setDefaultTime(secs);
            setSeconds(secs);
        }
    }, [setTimerInputIsOpen])

    const HideTimeDisplay = () => {
        return (
            <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle" viewBox="-1 -1 18 18">
                <path stroke="currentColor" strokeWidth="1" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path stroke="currentColor" strokeWidth="1" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg> Hide Time</span>
        );
    };

    const ShowTimeDisplay = () => {
        return (
            <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="-1 -1 18 18">
                <path stroke="currentColor" strokeWidth="1" d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                <path stroke="currentColor" strokeWidth="1" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
            </svg> Show Time</span>
        );
    };

    useEffect(() => {
        function handleKeydown(e) {
            if (timerInputIsOpen) {
                const key = e.key
                switch (key) {
                    case 'Enter':
                        e.preventDefault(); //prevent auto form submission
                        handleSubmit();
                        break;
                    default:
                }
            }
        }

        document.addEventListener("keydown", handleKeydown)
        return () => document.removeEventListener("keydown", handleKeydown)
    }, [timerInputIsOpen, handleSubmit]); //use dependency, or you only get 1 number in display at a time for keyboard entry


    return (
        <div className='banners' id='banners'>
            <div className='top-banner'>
                <header className='title'>
                    <h1 className='fs-2'><i>GRE Dash</i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" fill="currentColor" className="bi bi-calculator" viewBox="0 0 16 16">
                            <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
                            <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z" />
                        </svg>
                    </h1>
                </header>
                <section className='timer-buttons'>
                    {/* CALC TOGGLE*/}
                    <button className={calcIsOpen ? 'timer-btn calc-toggle-btn-inactive fs-4' : 'timer-btn calc-toggle-btn fs-4'} id='calc-toggle' aria-label="Calculator" onClick={() => setCalcIsOpen(!calcIsOpen)} >Calc</button>
                    {!run ?
                        // PLAY
                        <button className='timer-btn fs-4' aria-label="Play" disabled={seconds < 0} onClick={startTimer}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-play-fill" viewBox="0 1 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                        </svg></button>
                        //PAUSE
                        : <button className='timer-btn fs-4' aria-label="Pause" disabled={seconds < 0} onClick={pauseTimer}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pause-fill" viewBox="0 1 16 16">
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                        </svg></button>}
                    {/* RESET */}
                    <button className='timer-btn fs-4' aria-label="Reset" onClick={resetTimer} disabled={(seconds === defaultTime && !run)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" stroke="currentColor" strokeWidth="0.75" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" stroke="currentColor" strokeWidth="0.5" />
                        </svg>
                    </button>
                    <button className='timer-btn fs-4' onClick={() => setTimerInputIsOpen(true)}>
                        Set
                    </button>
                </section>
            </div>

            <section className='timer-banner'>
                <span className='timer-display'>{(hide && seconds >= 0) ? "" : seconds < 0 ? "Time expired" : display.hours + ":" + display.minutes + ":" + display.seconds}</span>
                <button className='hide-display' onClick={toggleHide}>{(hide && seconds >= 0) ? ShowTimeDisplay() : HideTimeDisplay()}</button>

                <span style={Modal_Wrapper}>
                    {/*TODO: cleanup prop drilling... */}
                    <Modal timerInputIsOpen={timerInputIsOpen} setTimerInputIsOpen={setTimerInputIsOpen}>
                        <div className='timer-input-wrapper'>
                            Enter time below
                            <p />
                            {/* preventDefault: prevent page refresh */}
                            <form onSubmit={e => { e.preventDefault(); handleSubmit() }} autoComplete="off">
                                <div className='timer-input-box'>
                                    <input className='timer-input' type='text' maxLength='2' placeholder='00' pattern="\d*" id='HH' ref={hh} />
                                    <div>:</div>
                                    <input className='timer-input' type='text' maxLength='2' placeholder='00' pattern="\d*" id='MM' ref={mm} />
                                    <div>:</div>
                                    <input className='timer-input' type='text' maxLength='2' placeholder='00' pattern="\d*" id='SS' ref={ss} />
                                    <label htmlFor="HH">HH</label>
                                    &nbsp;
                                    <label htmlFor="MM">MM</label>
                                    &nbsp;
                                    <label htmlFor="SS">SS</label>
                                </div>
                                <button className='timer-btn fs-5' id='cancel' onClick={() => setTimerInputIsOpen(false)}>Cancel</button>
                                <input className='timer-btn fs-5' type='submit' id='set-time' value='Set Time' ></input>
                            </form>

                        </div>
                    </Modal>
                </span>
            </section>
        </div>
    );
};

export default Timer;
