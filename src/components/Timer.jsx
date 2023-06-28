import { useEffect, useState, useRef, useCallback } from 'react';
import InputModal from './InputModal';
import TimerButtons from './TimerButtons';
import TimerDisplay from './TimerDisplay';
import Title from './Title';

const Modal_Wrapper = {
    position: 'relative',
    zIndex: 1
}

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
    }, [timerInputIsOpen, handleSubmit]);

    return (
        <div className='banners' id='banners'>
            <div className='top-banner'>
                <Title />
                <TimerButtons calcIsOpen={calcIsOpen} setCalcIsOpen={setCalcIsOpen} setTimerInputIsOpen={setTimerInputIsOpen} seconds={seconds} startTimer={startTimer} pauseTimer={pauseTimer} resetTimer={resetTimer} run={run} defaultTime={defaultTime} />
            </div>

            <section className='timer-banner'>
                <TimerDisplay hide={hide} seconds={seconds} display={display} toggleHide={toggleHide}/>
                <span style={Modal_Wrapper}>
                    {/*TODO: cleanup prop drilling... */}
                    <InputModal timerInputIsOpen={timerInputIsOpen} setTimerInputIsOpen={setTimerInputIsOpen} handleSubmit={handleSubmit} hh={hh} mm={mm} ss={ss} />
                </span>
            </section>
        </div>
    );
};

export default Timer;