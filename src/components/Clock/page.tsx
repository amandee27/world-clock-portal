import React, { useEffect, useState } from "react";
import moment from "moment";
const clockNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function Clock({ timezone, isChecked }: any) {
  const [currentTime, setCurrentTime] = useState<Date>(
    timezone.value
      ? new Date(
          moment.tz(moment(), timezone.value).format("MM/DD/YYYY HH:mm:ss")
        )
      : new Date()
  );
  const [showNumbers, setShowNumbers] = useState(false);
  const [timing, setTiming] = useState({
    updateSeconds: {},
    updateMinutes: {},
    updateHours: {},
  });
  const [offsetHour, setOffsetHour] = useState(0);
  const [day, setDay] = useState("");
  const updateTime = () => {
    if (timezone.value) {
      setCurrentTime(
        new Date(
          moment.tz(moment(), timezone.value).format("MM/DD/YYYY HH:mm:ss")
        )
      );
    } else setCurrentTime(new Date());
  };
  useEffect(() => {
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
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

  useEffect(() => {
    if (timezone.value) {
      let offset = moment
        .parseZone(moment.tz(moment(), timezone.value))
        .utcOffset();
      let offsetHour = offset / 60;
      setOffsetHour(offsetHour);

      if (moment(currentTime.getDate()).isSame(new Date().getDate())) {
        setDay("Today");
      } else if (moment(currentTime.getDate()).isAfter(new Date().getDate())) {
        setDay("Tommorrow");
      } else if (moment(currentTime.getDate()).isBefore(new Date().getDate())) {
        setDay("YesterDay");
      }
    } else {
      let offset = moment.parseZone(new Date()).utcOffset();
      let offsetHour = offset / 60;
      setOffsetHour(offsetHour);
    }
  }, []);

  return (
    <div>
      <div className="group relative flex cursor-pointer items-center justify-center text-sm">
        <div className="w-56 h-56 shrink-0 grow-0 bg-black text-slate-800 relative flex items-center justify-center rounded-full">
          <section className="box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); absolute z-50 flex h-4 w-4 justify-center">
            {clockNumbers.map((num) => (
              <span key={num} className="inline-block">
                <section
                  key={num}
                  className="h-27 w-1/10   absolute bottom-1.5 z-30 origin-bottom   border-t-6 border-white border-solid text-white"
                  style={{ transform: `rotate(calc(${num}*6*5deg))` }}
                >
                  {showNumbers && (
                    <span
                      className="inline-block absolute justify-left"
                      style={{
                        transform: `translate(-50%, 0%) rotate(calc(${num}*(-6*5deg)))`,
                      }}
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
              className="h-23 w-1/10 bg-teal-600 before:bg-slate-300 absolute bottom-1.5 z-30 w-1 origin-bottom rounded-md"
              style={timing.updateSeconds}
            ></span>
            {/* Minute hand */}
            <span
              className="h-22 w-1/5 bg-slate-600 absolute bottom-1.5 z-20 origin-bottom rounded-md"
              style={timing.updateMinutes}
            ></span>
            {/* Hour hand */}
            <span
              className="h-15 w-1/4 bg-slate-600 absolute bottom-1.5 z-10 origin-bottom divide-zinc-100 rounded-md"
              style={timing.updateHours}
            ></span>
          </section>
        </div>
      </div>
      <div>
        <h1 className="text-l font-semibold text-stone-50 mt-4">
          {timezone.label}
        </h1>
        <p className="text-stone-50">
          {day}
          {day ? "," : ""} {offsetHour > 0 ? "+" : "-"} {offsetHour}{" "}
          {offsetHour === 1 || offsetHour === -1 ? "HR" : "HRS"}{" "}
        </p>
        <p className="text-stone-50"></p>
      </div>
    </div>
  );
}

export default Clock;
