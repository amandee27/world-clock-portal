import { CountryTimeStamp } from "./CountryTimeStamp";

export interface ClockProps {
  timezone: CountryTimeStamp;
  currentDateTime: Date;
  deleteClock: (label: string) => void;
}
