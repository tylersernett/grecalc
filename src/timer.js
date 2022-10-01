import React from 'react';
import { useEffect, useState } from 'react';
import Modal from './Modal';

const Modal_Wrapper = {
    position: 'relative',
    zIndex: 1
}

function Timer() {

    let defaultTime = 305;
    const [seconds, setSeconds] = useState(defaultTime);
    const [run, setRun] = useState(false);
    const [display, setDisplay] = useState({
        hours: Math.floor(seconds / 3600),
        minutes: Math.floor(seconds % 3600 / 60),
        seconds: Math.floor(seconds % 3600 % 60 / 60),
    })

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

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="wrapper">
            <div className='top-banner'></div>
            <div className='timer-banner'>
                <span className='timer-display'>{seconds < 0 ? "Time expired" : display.hours + ":" + display.minutes + ":" + display.seconds}</span>
                {/* <div> */}
                    <button onClick={startTimer}>
                        Play
                    </button>
                    <button onClick={pauseTimer}>
                        Pause
                    </button>
                    <button onClick={stopTimer}>
                        Stop
                    </button>
                    <button onClick={assignTimer}>
                        Set
                    </button>
                    <span style={Modal_Wrapper}>
                        <button onClick={() => setIsOpen(true)}>
                            Open
                        </button>
                        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                            Enter time here MM:SS
                        </Modal>
                    </span>
                {/* </div> */}
            </div>
        </div>
    );
};

export default Timer;