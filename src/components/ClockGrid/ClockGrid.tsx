import React from "react";
import Clock from "../Clock/Clock";
import Swap from "../Swap/Swap";
import { ClockGridProps } from "../../Interfaces/ClockGridProps";

const ClockGrid: React.FC<ClockGridProps> = ({
  timeZoneList,
  currentDateTime,
  deleteClock,
  swapClocks,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {timeZoneList.map((timezone) => (
        <Swap
          key={timezone.id}
          itemId={timezone.id}
          handleSwap={swapClocks}
          isFixed={timezone.id !== "local"}
        >
          <Clock
            timezone={timezone}
            currentDateTime={currentDateTime}
            deleteClock={deleteClock}
          />
        </Swap>
      ))}
    </div>
  );
};

export default ClockGrid;
