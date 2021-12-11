import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ dropDate }) => {
  const [timer, setTimer] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const distance = dropDate - currentDate;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dropDate]);

  return (
    <div className="timer-container">
      <p className="timer-header">Candy Drop Starting In</p>
      {timer && <p className="timer-value">{`⏰ ${timer}`}</p>}
    </div>
  );
};

export default CountdownTimer;
