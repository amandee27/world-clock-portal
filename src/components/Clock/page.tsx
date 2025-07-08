import React, { useEffect, useState } from "react";
const clockNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function Clock({ isChecked }: any) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNumbers, setShowNumbers] = useState(isChecked);
  const [timing, setTiming] = useState({
    updateSeconds: {},
    updateMinutes: {},
    updateHours: {},
  });
  const updateTime = () => {
    setCurrentTime(new Date());
  };
  useEffect(() => {
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // const interval = setInterval(setTiming, 1000);
    setTiming({
      updateSeconds: {
        transform: `rotate(${currentTime.getSeconds() * 6}deg)`,
      },
      updateMinutes: {
        transform: `rotate(${currentTime.getMinutes() * 6}deg)`,
      },
      updateHours: {
        transform: `rotate(${
          currentTime.getHours() * 30 + currentTime.getMinutes() / 2
        }deg)`,
      },
    });
  }, [currentTime]);
  useEffect(() => {
    setShowNumbers(isChecked);
  }, [isChecked]);
  return (
    <div className="group relative flex cursor-pointer items-center justify-center text-sm">
      <div className="w-56 h-56 bg-black text-slate-800 relative flex items-center justify-center rounded-full">
        <section className="box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); absolute z-50 flex h-4 w-4 justify-center">
          {clockNumbers.map((num) => (
            <span className="inline-block">
              <section
                key={num}
                className="h-[7.2em] w-[0.1em]   absolute bottom-1.5 z-30 origin-bottom   border-t-6 border-white border-solid text-white"
                style={{ transform: `rotate(calc(${num}*6*5deg))` }}
              >
                {showNumbers && (
                  <span
                    className="inline-block absolute"
                    style={{ transform: `rotate(calc(${num}*(-6*5deg)))` }}
                  >
                    {num}
                  </span>
                )}
              </section>
            </span>
          ))}

          {/* Clock center */}
          <span
            className={`h-2 w-2 bottom-[1px] bg-teal-600 absolute z-50 flex rounded-full`}
          ></span>
          {/* Second hand */}
          <span
            className="h-[6.5em] w-[0.09em] bg-teal-600 before:bg-slate-300 absolute bottom-1.5 z-30 w-1 origin-bottom rounded-md"
            style={timing.updateSeconds}
          ></span>
          {/* Minute hand */}
          <span
            className="h-[6.5em] w-[0.2em] bg-slate-600 absolute bottom-1.5 z-20 origin-bottom rounded-md"
            style={timing.updateMinutes}
          ></span>
          {/* Hour hand */}
          <span
            className="h-[4.5em] w-[0.3em] bg-slate-600 absolute bottom-1.5 z-10 origin-bottom divide-zinc-100 rounded-md"
            style={timing.updateHours}
          ></span>
        </section>
      </div>
    </div>
  );
}

export default Clock;
