import { CountryTimeStamp } from "./CountryTimeStamp";

export interface ClockLabelProps {
  label: string;
  currentDateTime: Date;
  offset: string | undefined;
  timezone: CountryTimeStamp;
}
