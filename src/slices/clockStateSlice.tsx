import { createSlice } from "@reduxjs/toolkit";
import moment from "moment-timezone";
import { CountryTimeStamp } from "../Interfaces/CountryTimeStamp";

const localtimezone = moment.tz.guess();
const offsetHours = moment.tz(localtimezone).utcOffset() / 60;

interface ClockState {
  timezoneList: CountryTimeStamp[];
}

const initialState: ClockState = {
  timezoneList: [
    {
      id: "local",
      value: localtimezone,
      label: (localtimezone.match(/[^/]+$/) || [])[0] + " (local)",
      offset: `(UTC${offsetHours >= 0 ? "+" : ""}${offsetHours})`,
    },
  ],
};

const clockStateSlice = createSlice({
  name: "clockState",
  initialState,
  reducers: {
    setTimezone: (state, action) => {
      // add timezone to the list
      state.timezoneList.push(action.payload);
    },
    removeTimezone: (state, action) => {
      state.timezoneList = state.timezoneList.filter(
        (timezone: CountryTimeStamp) => timezone.id !== action.payload.id
      );
    },
    swapTomezones: (state, action) => {
      const { sourceId, destinationId } = action.payload;
      const sourceIndex = state.timezoneList.findIndex(
        (tz) => tz.id === sourceId
      );
      const destinationIndex = state.timezoneList.findIndex(
        (tz) => tz.id === destinationId
      );

      if (
        sourceIndex !== -1 &&
        destinationIndex !== -1 &&
        sourceId !== "local" &&
        destinationId !== "local"
      ) {
        const temp = state.timezoneList[sourceIndex];
        state.timezoneList[sourceIndex] = state.timezoneList[destinationIndex];
        state.timezoneList[destinationIndex] = temp;
      }
    },
  },
});

export const { setTimezone, removeTimezone, swapTomezones } =
  clockStateSlice.actions;
export default clockStateSlice.reducer;
export type { ClockState };
