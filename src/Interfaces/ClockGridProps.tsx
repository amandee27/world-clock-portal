import { CountryTimeStamp } from "./CountryTimeStamp";

export interface ClockGridProps {
  timeZoneList: CountryTimeStamp[];
  currentDateTime: Date;
  deleteClock: (deleteTimezone: string) => void;
  swapClocks: (fromId: string, toId: string) => void;
}
