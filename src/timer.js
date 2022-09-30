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
        minutes: Math.floor(seconds / 60),
        seconds: seconds % 60,
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
        console.log(seconds, display.minutes, display.seconds);
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
        let displayMinutes = Math.floor(seconds / 60);
        let displaySeconds = seconds % 60;
        displayMinutes = addZeroIfUnderTen(displayMinutes);
        displaySeconds = addZeroIfUnderTen(displaySeconds);

        setDisplay({
            minutes: displayMinutes,
            seconds: displaySeconds
        })
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="wrapper">
            <h3>{seconds < 0 ? "Time expired" : display.minutes + ":" + display.seconds}</h3>
            <div>
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
                <div style={Modal_Wrapper}>
                    <button onClick={() => setIsOpen(true)}>
                        Open
                    </button>
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        Enter time here MM:SS
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Timer;