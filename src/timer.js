import React from 'react';
import { useEffect, useState } from 'react';

const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
    // calculate time left
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [minutes, seconds];
};

/////////////////////////////////////////////

const DateTimeDisplay = ({ value, isDanger }) => {
    return (
        <span className={isDanger ? 'countdown danger' : 'countdown'}>
            <span>{value}</span>
        </span>
    );
};

const ShowCounter = ({ minutes, seconds }) => {
    return (
        <div className="show-counter">
            <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />:
            <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </div>
    );
};

const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>Time Expired</span>
        </div>
    );
};

const CountdownTimer = ({ targetDate }) => {
    const [minutes, seconds] = useCountdown(targetDate);

    if (minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                minutes={minutes >= 10 ? minutes : "0"+minutes}
                seconds={seconds >= 10 ? seconds : "0"+seconds}
            />
        );
    }
};

function Timer() {
    const THIRTY_FIVE_MINS_IN_MS = 1 * 1 * 35 * 60 * 1000/35/5;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAtTarget = NOW_IN_MS + THIRTY_FIVE_MINS_IN_MS;

    return (
        <div>
            <CountdownTimer targetDate={dateTimeAtTarget} />
        </div>
    );
}

export default Timer;