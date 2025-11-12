import { useState } from "react";
import moment from "moment";
import Popup from "../Modal/Popup";
const clockNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Clock({
  timezone,
  showClockNumbers,
  theme,
  currentDateTime,
  deleteClock,
}: any) {
  let timing = setTime(currentDateTime, timezone.value);
  let day = getRelativeDay(currentDateTime, timezone.value);
  const [popup, setPopup] = useState(false);

  /**Set the day of each timezone relative to the local day. */
  function getRelativeDay(currentDateTime: Date, timezone: string) {
    const localDay = moment(currentDateTime).format("YYYY-MM-DD");
    const zoneDay = moment.tz(currentDateTime, timezone).format("YYYY-MM-DD");
    let relativeDay = "";
    if (zoneDay > localDay) {
      relativeDay = "Tomorrow";
    } else if (zoneDay < localDay) {
      relativeDay = "Yesterday";
    } else {
      relativeDay = "Today";
    }
    return relativeDay;
  }

  function setTime(currentDateTime: Date, timezone: string) {
    const currentTime = new Date(
      moment.tz(currentDateTime, timezone).format("MM/DD/YYYY HH:mm:ss")
    );
    let timing = {
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
    };
    return timing;
  }

  /**Confirm clock deletion and trigger deleteClock method in parent component*/
  const confirmDeleteClock = () => {
    deleteClock(timezone.label);
    setPopup(false);
  };

  return (
    <div>
      <div>
        {popup && (
          <Popup
            deleteTimezone={timezone.label}
            setPopup={setPopup}
            confirmDeleteClock={confirmDeleteClock}
          ></Popup>
        )}
      </div>
      <div className="group sm:scale-75 md:scale-75 lg:scale-75">
        <div className="rounded-xl  group-hover:shadow-lg group-hover:bg-gray-500/20 transition-all ">
          <div className="relative p-4 flex flex-col items-center justify-between text-sm">
            <div className="absolute top-2 right-2 text-white group-hover:text-red-400">
              {timezone.id !== "local" && (
                <button
                  className="text-white hidden group-hover:block"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0,0,256,256"
                    style={{ fill: "#FFFFFF" }}
                  >
                    <g
                      fill="#ffffff"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(8.53333,8.53333)">
                        <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM16.414,15c0,0 3.139,3.139 3.293,3.293c0.391,0.391 0.391,1.024 0,1.414c-0.391,0.391 -1.024,0.391 -1.414,0c-0.154,-0.153 -3.293,-3.293 -3.293,-3.293c0,0 -3.139,3.139 -3.293,3.293c-0.391,0.391 -1.024,0.391 -1.414,0c-0.391,-0.391 -0.391,-1.024 0,-1.414c0.153,-0.154 3.293,-3.293 3.293,-3.293c0,0 -3.139,-3.139 -3.293,-3.293c-0.391,-0.391 -0.391,-1.024 0,-1.414c0.391,-0.391 1.024,-0.391 1.414,0c0.154,0.153 3.293,3.293 3.293,3.293c0,0 3.139,-3.139 3.293,-3.293c0.391,-0.391 1.024,-0.391 1.414,0c0.391,0.391 0.391,1.024 0,1.414c-0.153,0.154 -3.293,3.293 -3.293,3.293z"></path>
                      </g>
                    </g>
                  </svg>
                </button>
              )}
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div
                className={`${theme.value.clockFace} w-56 h-56 shrink-0 grow-0 relative flex items-center justify-center rounded-full`}
              >
                <section className="box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); absolute z-50 flex h-4 w-4 justify-center">
                  {clockNumbers.map((num) => (
                    <span key={num} className="inline-block">
                      <section
                        key={num}
                        className={`${theme.value.marks} h-27 w-1/10   absolute bottom-1.5 z-30 origin-bottom`}
                        style={{ transform: `rotate(calc(${num}*6*5deg))` }}
                      >
                        {showClockNumbers && (
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
                    className={`${theme.value.hand.center} h-2.5 w-2.5 bottom-[1px] absolute z-50 flex rounded-full`}
                  ></span>
                  {/* Second hand */}
                  <span
                    className={`${theme.value.hand.second} h-23 w-1/10 absolute bottom-1.5 z-30 w-1 origin-bottom rounded-md`}
                    style={timing.updateSeconds}
                  ></span>
                  {/* Minute hand */}
                  <span
                    className={`${theme.value.hand.minute} h-22 w-1/6 absolute bottom-1.5 z-20 origin-bottom rounded-md`}
                    style={timing.updateMinutes}
                  ></span>
                  {/* Hour hand */}
                  <span
                    className={`${theme.value.hand.hour} h-15 w-1/5 absolute bottom-1.5 z-10 origin-bottom divide-zinc-100 rounded-md`}
                    style={timing.updateHours}
                  ></span>
                </section>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-l font-semibold text-stone-50 mt-4">
              {timezone.value ? timezone.label : "Local"}
            </h1>
            <p className="text-stone-50">
              {day}
              {timezone.offset}{" "}
              {timezone.offset === 1 || timezone.offset === -1 ? "hr" : "hrs"}
            </p>
            <p className="text-stone-50"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
