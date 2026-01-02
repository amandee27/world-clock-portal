import moment from "moment";
import { CountryTimeStamp } from "./Interfaces/CountryTimeStamp";

export const loadState = () => {
  try {
    const localtimezone = moment.tz.guess();
    const offsetHours = moment.tz(localtimezone).utcOffset() / 60;
    const list = localStorage.getItem("timeZoneList");
    let timezoneList: CountryTimeStamp[] = [];
    if (list === null) {
      timezoneList = [
        {
          id: "local",
          value: localtimezone,
          label: (localtimezone.match(/[^/]+$/) || [])[0] + " (local)",
          offset: `(UTC${offsetHours >= 0 ? "+" : ""}${offsetHours})`,
        },
      ];
    } else {
      timezoneList = JSON.parse(list);
    }

    return {
      clockState: { timezoneList },
    };
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: CountryTimeStamp[]) => {
  try {
    const clockState = JSON.stringify(state);
    localStorage.setItem("timeZoneList", clockState);
  } catch (err) {
    console.log(err);
    return;
  }
};
