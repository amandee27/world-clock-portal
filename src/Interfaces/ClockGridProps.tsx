import { CountryTimeStamp } from "./CountryTimeStamp";

export interface ClockGridProps {
  timeZoneList: CountryTimeStamp[];
  currentDateTime: Date;
  loading: boolean;
  loadingClockId: string;
  deleteClock: (deleteTimezone: string) => void;
  swapClocks: (fromId: string, toId: string) => void;
}
