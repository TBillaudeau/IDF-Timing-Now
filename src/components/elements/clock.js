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
    <div className="w-full py-1 px-2 bg-purple-900 rounded-lg">
      <h2 className="self-center text-xl font-bold whitespace-nowrap text-white">{time.toLocaleTimeString()}</h2>
    </div>
  );
}

export default Clock;