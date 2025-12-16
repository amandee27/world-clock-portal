import React, { useContext } from "react";
import moment from "moment";
import SettingsContext from "../../../Contexts/SettingsContexts";
import { ClockFaceProps } from "../../../Interfaces/ClockFaceProps";

const ClockFace: React.FC<ClockFaceProps> = ({
  currentDateTime,
  clockNumbers,
  timezone,
}) => {
  const settings = useContext(SettingsContext);
  const { theme, showNumbers } = settings.clockSettings;
  const currentTime = new Date(
    moment.tz(currentDateTime, timezone.value).format("MM/DD/YYYY HH:mm:ss")
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

  return (
    <div className="flex-1 flex items-center justify-center">
      <div
        className={`${theme.value.clockFace} w-56 h-56 shrink-0 grow-0 relative flex items-center justify-center rounded-full`}
      >
        <section className="box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); absolute z-50 flex h-4 w-4 justify-center">
          {clockNumbers.map((num) => (
            <span key={num} className="inline-block">
              <section
                key={num}
                className={`${theme.value.marks} h-27 w-1/10 absolute bottom-1.5 z-30 origin-bottom`}
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
            className={`${theme.value.hand.center} h-2.5 w-2.5 bottom-[1px] absolute z-50 flex rounded-full`}
          ></span>
          {/* Second hand */}
          <span
            className={`${theme.value.hand.second} h-23 w-1/10 absolute bottom-1.5 z-30 origin-bottom rounded-md`}
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
  );
};

export default ClockFace;
