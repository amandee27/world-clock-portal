import React from "react";
import Clock from "../Clock/Clock";
import Swap from "../Swap/Swap";
import { ClockPhase } from "../../Interfaces/ClockPhase";

interface CountryTimeStamp {
  id: string;
  value: string | undefined;
  label: string | undefined;
  offset: string | undefined;
}

interface ClockGridProps {
  timeZoneList: CountryTimeStamp[];
  currentDateTime: Date;
  deleteClock: (deleteTimezone: string) => void;
  swapClocks: (fromId: string, toId: string) => void;
}

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
