import React from 'react';

const PlayButton = ({ startTimer }) => (
    <button className='timer-btn fs-4' aria-label="Play" onClick={startTimer}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-play-fill" viewBox="0 1 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        </svg>
    </button>
);

const PauseButton = ({ pauseTimer }) => (
    <button className='timer-btn fs-4' aria-label="Pause" onClick={pauseTimer}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pause-fill" viewBox="0 1 16 16">
            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
        </svg>
    </button>
);

const ResetButton = ({ resetTimer, seconds, defaultTime, run }) => (
    <button className='timer-btn fs-4' aria-label="Reset" onClick={resetTimer} disabled={seconds === defaultTime && !run}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" stroke="currentColor" strokeWidth="0.75" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" stroke="currentColor" strokeWidth="0.5" />
        </svg>
    </button>
);

const TimerButtons = ({ calcIsOpen, setCalcIsOpen, setTimerInputIsOpen, seconds, startTimer, pauseTimer, resetTimer, run, defaultTime }) => {
    return (
        <section className='timer-buttons'>
            {/* CALC TOGGLE*/}
            <button
                className={calcIsOpen ? 'timer-btn calc-toggle-btn-inactive fs-4' : 'timer-btn calc-toggle-btn fs-4'}
                id='calc-toggle'
                aria-label="Calculator"
                onClick={() => setCalcIsOpen(!calcIsOpen)}
            >
                Calc
            </button>
            {!run ? (
                // PLAY
                <PlayButton startTimer={startTimer} />
            ) : (
                // PAUSE
                <PauseButton pauseTimer={pauseTimer} />
            )}
            <ResetButton resetTimer={resetTimer} seconds={seconds} defaultTime={defaultTime} run={run} />
            <button className='timer-btn fs-4' onClick={() => setTimerInputIsOpen(true)}>
                Set
            </button>
        </section>
    );
};

export default TimerButtons;