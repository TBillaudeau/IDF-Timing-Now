import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h2 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{time.toLocaleTimeString()}</h2>
    </div>
  );
}

export default Clock;