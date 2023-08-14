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
      <h2 className="bg-slate-700 text-white rounded-lg p-2 text-xl">{time.toLocaleTimeString()}</h2>
    </div>
  );
}

export default Clock;