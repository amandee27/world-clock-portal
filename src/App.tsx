import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Notification from "./components/Modal/Notification";
import ClockGrid from "./components/ClockGrid/ClockGrid";
import { CountryTimeStamp } from "./Interfaces/CountryTimeStamp";
import SettingsProvider from "./Contexts/SettingsProvider";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "./store.tsx";
import {
  setTimezone,
  removeTimezone,
  swapTomezones,
} from "./slices/clockStateSlice.tsx";

function App() {
  const timezoneList = useSelector<AppState>(
    (state) => state.clockState.timezoneList
  );
  const dispatch = useDispatch();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [notification, setNotification] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [loadingClockId, setLoadingClockId] = useState("");

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const deleteClock = (deleteTimezone: string) => {
    setLoading(true);
    setLoadingClockId(deleteTimezone);
    setTimeout(() => {
      dispatch(removeTimezone({ id: deleteTimezone }));
      setLoadingClockId("");
      setLoading(false);
      setNotification(`Clock ${deleteTimezone} is successfully deleted`);
    }, 500);

    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  const updateTime = () => {
    setCurrentDateTime(new Date());
  };

  const addClock = (timezone: {
    value: string;
    label: string;
    offset: string;
  }) => {
    const clockList = timezoneList as CountryTimeStamp[];
    const exists =
      clockList &&
      clockList.some((item: CountryTimeStamp) => item.label === timezone.label);
    if (!exists) {
      if (timezone) {
        dispatch(
          setTimezone({
            id: timezone.label ?? "",
            value: timezone.value ?? "",
            label: timezone.label ?? "",
            offset: timezone.offset ?? "",
          })
        );
      }

      setLoadingClockId(timezone.label ?? "");
      setNotification(`Clock ${timezone.label} is successfully added`);
      setLoading(true);
    } else {
      alert("This clock is already in the list");
    }
    setTimeout(() => {
      setLoading(false);
      setLoadingClockId(timezone.label ?? "");
    }, 1500);

    setTimeout(() => {
      setNotification(null);
    }, 1500);
  };

  const swapClocks = (fromId: string, toId: string) => {
    dispatch(swapTomezones({ sourceId: fromId, destinationId: toId }));
  };

  return (
    <div className="flex flex-col min-h-full bg-blue-950 ">
      <SettingsProvider>
        <Navbar addClock={addClock}></Navbar>
        <div className="flex justify-center h-8">
          {notification && (
            <Notification notification={notification}></Notification>
          )}
        </div>

        <div className="flex-1 p-4">
          <ClockGrid
            timeZoneList={timezoneList as CountryTimeStamp[]}
            currentDateTime={currentDateTime}
            deleteClock={deleteClock}
            swapClocks={swapClocks}
            loading={loading}
            loadingClockId={loadingClockId}
          />
        </div>
      </SettingsProvider>
    </div>
  );
}

export default App;
