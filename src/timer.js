import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Modal from './Modal';

const Modal_Wrapper = {
    position: 'relative',
    zIndex: 1
}

function Timer({ timerInputIsOpen, setTimerInputIsOpen }) {

    let defaultTime = 3602;
    const [seconds, setSeconds] = useState(defaultTime);
    const [run, setRun] = useState(false);
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

    return (
        <div className="wrapper">
            <div className='top-banner'></div>
            <div className='timer-banner'>
                <span className='timer-display'>{seconds < 0 ? "Time expired" : display.hours + ":" + display.minutes + ":" + display.seconds}</span>
                {/* <div> */}
                {!run ?
                    <button onClick={startTimer}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                    </svg></button>
                    : <button onClick={pauseTimer}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                    </svg></button>}
                <button onClick={stopTimer}>
                    Reset
                </button>
                <button onClick={assignTimer}>
                    Set
                </button>
                <button onClick={() => setTimerInputIsOpen(true)}>
                    Open
                </button>
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
                                <button id='cancel' onClick={() => setTimerInputIsOpen(false)}>Cancel</button>
                                <input type='submit' id='set-time' value='Set Time'></input>
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
//TODO: combine play/pause into single button
//move buttons into black banner