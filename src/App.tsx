import { useEffect, useState } from "react";
import "./App.css";
import Clock from "./components/Clock/Clock";
import Navbar from "./components/Navbar/Navbar";
import moment from "moment-timezone";
import Swap from "./components/Swap/Swap";
import { clockPhases } from "./data/clockPhases";
import Loading from "./components/Modal/Loading";
import Notification from "./components/Modal/Notification";

interface ClockHand {
  center: string;
  second: string;
  minute: string;
  hour: string;
}

interface ClockThemeValue {
  main: string;
  shadow: string;
  hand: ClockHand;
  numbers: string;
  marks: string;
  clockFace: string;
}

export interface ClockPhase {
  key: string;
  value: ClockThemeValue;
}

interface CountryTimeStamp {
  id: string;
  value: string | undefined;
  label: string | undefined;
  offset: string | undefined;
}

interface ClockSettings {
  theme: ClockPhase;
  showNumbers: boolean;
}

function App() {
  const [settings, setSettings] = useState<ClockSettings>({
    theme: clockPhases[0],
    showNumbers: false,
  });
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

  useEffect(() => {
    const clockSettings = localStorage.getItem("clockSettings");
    const clockSettingsObj = clockSettings && JSON.parse(clockSettings);

    if (clockSettingsObj) {
      setSettings({
        theme: clockSettingsObj["clockTheme"],
        showNumbers: clockSettingsObj["showNumbers"],
      });
    } else {
      localStorage.setItem(
        "clockSettings",
        JSON.stringify({
          clockTheme: settings["theme"],
          showNumbers: settings["showNumbers"],
        })
      );
    }
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "clockSettings",
      JSON.stringify({
        clockTheme: settings["theme"],
        showNumbers: settings["showNumbers"],
      })
    );
  }, [settings["theme"], settings["showNumbers"]]);

  useEffect(() => {
    localStorage.setItem("timeZoneList", JSON.stringify(timeZoneList));
  }, [timeZoneList]);

  const deleteClock = (deleteTimezone: string) => {
    setLoading(true);
    setTimeout(() => {
      let filteredTimeZoneList = timeZoneList.filter(
        (timezone) => timezone.label !== deleteTimezone || timezone.label === ""
      );
      setTimezoneList(filteredTimeZoneList);
      setLoading(false);
    }, 500);

    setNotification(`Clock ${deleteTimezone} is successfully deleted`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const updateTime = () => {
    setCurrentDateTime(new Date());
  };

  const addClock = (timezone: CountryTimeStamp) => {
    setLoading(true);
    setTimeout(() => {
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
        setLoading(false);
      } else {
        setLoading(false);
        alert("This clock is already in the list");
      }
    }, 500);
    setNotification(`Clock ${timezone.label} is successfully added`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  const handleThemeChange = (newTheme: ClockPhase) => {
    setSettings((prev) => ({
      ...prev,
      theme: newTheme,
    }));
  };

  const handleShowClockNumbersChange = (showNumbers: boolean) => {
    setSettings((prev) => ({
      ...prev,
      showNumbers: showNumbers,
    }));
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
      {loading && <Loading />}
      <Navbar
        showClockNumbers={settings["showNumbers"]}
        setShowClockNumbers={handleShowClockNumbersChange}
        setTheme={handleThemeChange}
        theme={settings["theme"]}
        clockPhases={clockPhases}
        addClock={addClock}
      ></Navbar>

      {notification && (
        <Notification notification={notification}></Notification>
      )}

      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {timeZoneList.map((timezone) => (
            <Swap
              itemId={timezone.id}
              handleSwap={swapClocks}
              isFixed={timezone.id !== "local"}
            >
              <Clock
                key={timezone.id}
                timezone={timezone}
                showClockNumbers={settings["showNumbers"]}
                theme={settings["theme"]}
                currentDateTime={currentDateTime}
                deleteClock={deleteClock}
              ></Clock>
            </Swap>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
