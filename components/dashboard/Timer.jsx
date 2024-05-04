import React, { useState, useEffect } from 'react';

function Timer({ min, TimerEndListener }) {
    const [minutes, setMinutes] = useState(min);
    const [seconds, setSeconds] = useState(0);


    useEffect(() => {
        let intervalId;

        if (minutes > 0 || seconds > 0) {
            intervalId = setInterval(() => {
                if (minutes == 0 && seconds == 1) {
                    TimerEndListener();
                }

                if (seconds > 0) {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                } else {
                    if (minutes > 0) {
                        setMinutes((prevMinutes) => prevMinutes - 1);
                        setSeconds(59);
                    } else {
                        clearInterval(intervalId);
                    }
                }
            }, 1000);
        }


        return () => {
            clearInterval(intervalId);
        };
    }, [minutes, seconds]);

    return (
        <p>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
    );
}

export default Timer;