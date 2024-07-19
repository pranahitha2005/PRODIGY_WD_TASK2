import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let timer;
        if (running) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (!running && time !== 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [running, time]);

    const formatTime = (time) => {
        const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 60000) % 60);
        const getSeconds = `0${seconds}`.slice(-2);
        const getMinutes = `0${minutes}`.slice(-2);
        return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
    };

    const handleLap = () => {
        setLaps([...laps, time]);
    };

    const resetLaps = () => {
        setLaps([]);
    };

    return (
        <div className="stopwatch-container">
            <h1>Stopwatch</h1>
            <div className="time-display">{formatTime(time)}</div>
            <div className="buttons">
                <button onClick={() => setRunning(!running)}>
                    {running ? 'Stop' : 'Start'}
                </button>
                <button onClick={() => { setTime(0); setRunning(false); resetLaps(); }}>
                    Reset
                </button>
                <button onClick={handleLap} disabled={!running}>
                    Lap
                </button>
            </div>
            <ul className="laps-list">
                {laps.map((lap, index) => (
                    <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
                ))}
            </ul>
        </div>
    );
};

export default Stopwatch;
