import { useCallback, useState } from "react";

import Popup from "../Modal/Popup";
import ClockLabel from "./ClockLabel/ClockLabel";
import ClockFace from "./ClockFace/ClockFace";
import ClockDeleteButton from "./ClockDeleteButton/ClockDeleteButton";
import { ClockOuterContainer } from "./ClockOuterContainer/ClockOuterContainer";

const clockNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Clock({
  timezone,
  showClockNumbers,
  theme,
  currentDateTime,
  deleteClock,
}: any) {
  const [popup, setPopup] = useState(false);

  /**Confirm clock deletion and trigger deleteClock method in parent component*/
  const confirmDeleteClock = useCallback(() => {
    deleteClock(timezone.label);
    setPopup(false);
  }, [deleteClock, timezone.label]);

  const openPopup = useCallback(() => {
    setPopup(true);
  }, []);

  return (
    <div>
      {popup && (
        <Popup
          deleteTimezone={timezone.label}
          setPopup={setPopup}
          confirmDeleteClock={confirmDeleteClock}
        ></Popup>
      )}
      <ClockOuterContainer>
        <div className="relative p-4 flex flex-col items-center justify-between text-sm">
          <div className="absolute top-2 right-2 text-white group-hover:text-red-400">
            <ClockDeleteButton
              isLocal={timezone.id === "local"}
              onClick={openPopup}
            />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <ClockFace
              theme={theme}
              showClockNumbers={showClockNumbers}
              currentDateTime={currentDateTime}
              clockNumbers={clockNumbers}
              timezone={timezone}
            />
          </div>
        </div>
        <div className="text-center">
          <ClockLabel
            label={timezone.value ? timezone.label : "Local"}
            currentDateTime={currentDateTime}
            offset={timezone.offset}
            timezone={timezone}
          />
        </div>
      </ClockOuterContainer>
    </div>
  );
}

export default Clock;
