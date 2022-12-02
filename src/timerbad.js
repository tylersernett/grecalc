import React from 'react';
import { useEffect, useState } from 'react';
//import ToggleSwitch from './ToggleSwitch';



function Timer() {
    let countDownDate = 9999999999999;
    const [countDown, setCountDown] = useState({
        time: countDownDate - new Date().getTime(),
        active: false
    });

    const useCountdown = (targetDate) => {
        countDownDate = new Date(targetDate).getTime();



        useEffect(() => {
            if (countDown.active === false) {
                const interval = setInterval(() => {
                    setCountDown({
                        ...countDown,
                        time: countDownDate - new Date().getTime(),
                    });
                }, 1000);

                return () => clearInterval(interval);
            }
        }, [countDownDate]);

        return getReturnValues(countDown.time);

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
                    minutes={minutes >= 10 ? minutes : "0" + minutes}
                    seconds={seconds >= 10 ? seconds : "0" + seconds}
                />
            );
        }
    };

    const ToggleSwitch = ({ label }) => {
        const toggleHandler = () => {
            setCountDown({
                ...countDown,
                active: !countDown.active,
            })
        }

        return (
            <div className="container">
                {label}{" "}
                <div className="toggle-switch">
                    <input type="checkbox" className="checkbox" onChange={toggleHandler}
                        name={label} id={label} />
                    <label className="label" htmlFor={label}>
                        <span className="inner" />
                        <span className="switch" />
                    </label>
                </div>
            </div>
        );
    };
    const THIRTY_FIVE_MINS_IN_MS = 1 * 1 * 35 * 60 * 1000 / 35 / 5;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAtTarget = NOW_IN_MS + THIRTY_FIVE_MINS_IN_MS;

    return (
        <div>
            <ToggleSwitch label="playpause" />
            <CountdownTimer targetDate={dateTimeAtTarget} />
        </div>
    );
}



export default Timer;