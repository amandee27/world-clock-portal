import { CountryTimeStamp } from "./CountryTimeStamp";

export interface ClockProps {
  timezone: CountryTimeStamp;
  currentDateTime: Date;
  loading: boolean;
  loadingClockId: string;
  deleteClock: (label: string) => void;
}
