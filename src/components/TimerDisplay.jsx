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

const TimerDisplay = ({ hide, seconds, display, toggleHide }) => {
  return (
    <>
      <span className='timer-display'>
        {(hide && seconds >= 0) ? "" : seconds < 0 ? "Time expired" : display.hours + ":" + display.minutes + ":" + display.seconds}
      </span>
      <button className='hide-display' onClick={toggleHide} disabled={seconds < 0}>
        {(hide && seconds >= 0) ? <ShowTimeDisplay /> : <HideTimeDisplay />}
      </button>
    </>
  )
}

export default TimerDisplay