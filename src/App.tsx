import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import moment from "moment-timezone";
import Notification from "./components/Modal/Notification";
import ClockGrid from "./components/ClockGrid/ClockGrid";
import { CountryTimeStamp } from "./Interfaces/CountryTimeStamp";
import SettingsProvider from "./Contexts/SettingsProvider";

function App() {
  const [timeZoneList, setTimezoneList] = useState<CountryTimeStamp[]>(() => {
    const list = localStorage.getItem("timeZoneList");
    const localtimezone = moment.tz.guess();
    const timeZoneObj = list && JSON.parse(list);
    const offsetHours = moment.tz(localtimezone).utcOffset() / 60;
    return (
      timeZoneObj || [
        {
          id: "local",
          value: localtimezone,
          label: (localtimezone.match(/[^/]+$/) || [])[0] + " (local)",
          offset: `(UTC${offsetHours >= 0 ? "+" : ""}${offsetHours})`,
        },
      ]
    );
  });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [notification, setNotification] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [loadingClockId, setLoadingClockId] = useState("");

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("timeZoneList", JSON.stringify(timeZoneList));
  }, [timeZoneList]);

  const deleteClock = (deleteTimezone: string) => {
    setLoading(true);
    setLoadingClockId(deleteTimezone);
    setTimeout(() => {
      let filteredTimeZoneList = timeZoneList.filter(
        (timezone) => timezone.label !== deleteTimezone || timezone.label === ""
      );
      setTimezoneList(filteredTimeZoneList);
      setLoadingClockId("");
      setLoading(false);
    }, 1500);

    setNotification(`Clock ${deleteTimezone} is successfully deleted`);
    setTimeout(() => {
      setNotification(null);
    }, 1500);
  };

  const updateTime = () => {
    setCurrentDateTime(new Date());
  };

  const addClock = (timezone: {
    value: string;
    label: string;
    offset: string;
  }) => {
    const exists =
      timeZoneList &&
      timeZoneList.some((item) => item.label === timezone.label);
    if (!exists) {
      setTimezoneList([
        ...timeZoneList,
        {
          id: timezone.label ?? "",
          value: timezone.value ?? "",
          label: timezone.label ?? "",
          offset: timezone.offset ?? "",
        },
      ]);
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
    const newClocks = [...timeZoneList];
    const fromIndex = newClocks.findIndex((b) => b.id === fromId);
    const toIndex = newClocks.findIndex((b) => b.id === toId);
    if (fromId === "local" || toId === "local") return;
    [newClocks[fromIndex], newClocks[toIndex]] = [
      newClocks[toIndex],
      newClocks[fromIndex],
    ];
    setTimezoneList(newClocks);
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
            timeZoneList={timeZoneList}
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
