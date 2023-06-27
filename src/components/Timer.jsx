import { useEffect, useState, useRef, useCallback } from 'react';
import InputModal from './InputModal';
import TimerButtons from './TimerButtons';
import Title from './Title';

const Modal_Wrapper = {
    position: 'relative',
    zIndex: 1
}

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

function Timer({ timerInputIsOpen, setTimerInputIsOpen, calcIsOpen, setCalcIsOpen }) {

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
    }, [seconds])

    const getReturnValues = (seconds) => {
        // calculate time left
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

    useEffect(() => {
        function handleKeydown(e) {
            if (timerInputIsOpen) {
                const key = e.key
                switch (key) {
                    case 'Enter':
                        e.preventDefault(); //prevent form submission
                        handleSubmit();
                        break;
                    default:
                }
            }
        }

        document.addEventListener("keydown", handleKeydown)
        return () => document.removeEventListener("keydown", handleKeydown)
    }, [timerInputIsOpen, handleSubmit]); //use dependency array, or you only get 1 number in display at a time for keyboard entry

    return (
        <div className='banners' id='banners'>
            <div className='top-banner'>
                <Title />
                <TimerButtons calcIsOpen={calcIsOpen} setCalcIsOpen={setCalcIsOpen} setTimerInputIsOpen={setTimerInputIsOpen} seconds={seconds} startTimer={startTimer} pauseTimer={pauseTimer} resetTimer={resetTimer} run={run} defaultTime={defaultTime} />
            </div>

            <section className='timer-banner'>
                <span className='timer-display'>
                    {(hide && seconds >= 0) ? "" : seconds < 0 ? "Time expired" : display.hours + ":" + display.minutes + ":" + display.seconds}
                </span>
                <button className='hide-display' onClick={toggleHide} disabled={seconds < 0}>
                    {(hide && seconds >= 0) ? <ShowTimeDisplay/> : <HideTimeDisplay/>}
                </button>

                <span style={Modal_Wrapper}>
                    {/*TODO: cleanup prop drilling... */}
                    <InputModal timerInputIsOpen={timerInputIsOpen} setTimerInputIsOpen={setTimerInputIsOpen} handleSubmit={handleSubmit} hh={hh} mm={mm} ss={ss} />
                </span>
            </section>
        </div>
    );
};

export default Timer;