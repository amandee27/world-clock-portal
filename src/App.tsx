import { useEffect, useState } from "react";
import "./App.css";
import Clock from "./components/Clock/page";
import { ReactSortable } from "react-sortablejs";
import Navbar from "./components/Navbar/Navbar";
import moment from "moment-timezone";

let clockPhases = [
  {
    key: "Theme 1",
    value: {
      main: "bg-slate-300 text-slate-800",
      shadow: "shadow-xl shadow-slate-400",
      hand: {
        center: "bg-yellow-300",
        second: "bg-yellow-300",
        minute: "bg-red-600",
        hour: "bg-white",
      },
      numbers: "bg-black",
      marks: "border-white text-white border-t-6 border-solid",
      clockFace: "bg-blue-950",
    },
  },
  {
    key: "Theme 2",
    value: {
      main: "bg-slate-300 text-slate-800",
      shadow: "shadow-xl shadow-slate-400",
      hand: {
        center: "bg-yellow-500",
        second: "bg-yellow-500",
        minute: "bg-black",
        hour: "bg-red-600",
      },
      numbers: "bg-black",
      marks: "border-black text-black border-t-6 border-solid",
      clockFace: "bg-white/50",
    },
  },
  {
    key: "Theme 3",
    value: {
      main: "bg-slate-300 text-slate-800",
      shadow: "shadow-xl shadow-slate-400",
      hand: {
        center: "bg-red-600",
        second: "bg-red-600",
        minute: "bg-black",
        hour: "bg-black",
      },
      numbers: "bg-black",
      marks: "border-black text-black border-t-6 border-solid",
      clockFace: "bg-white",
    },
  },
];

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
  showClockNumbers: boolean;
}

function App() {
  const [settings, setSettings] = useState<ClockSettings>({
    theme: clockPhases[0],
    showClockNumbers: false,
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

  useEffect(() => {
    const clockSettings = localStorage.getItem("clockSettings");
    const clockSettingsObj = clockSettings && JSON.parse(clockSettings);

    if (clockSettings) {
      clockSettingsObj["clockTheme"] &&
        setSettings((prev) => ({
          ...prev,
          theme: clockSettingsObj["clockTheme"],
        }));
      clockSettingsObj["showNumbers"] &&
        setSettings((prev) => ({
          ...prev,
          setShowClockNumbers: clockSettingsObj["showNumbers"],
        }));
    } else {
      localStorage.setItem(
        "clockSettings",
        JSON.stringify({ clockTheme: settings["theme"] })
      );
      localStorage.setItem(
        "clockSettings",
        JSON.stringify({ showNumbers: settings["showClockNumbers"] })
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
        showNumbers: settings["showClockNumbers"],
      })
    );
  }, [settings["theme"], settings["showClockNumbers"]]);

  useEffect(() => {
    localStorage.setItem("timeZoneList", JSON.stringify(timeZoneList));
  }, [timeZoneList]);

  const deleteClock = (deleteTimezone: string) => {
    let filteredTimeZoneList = timeZoneList.filter(
      (timezone) => timezone.label !== deleteTimezone || timezone.label === ""
    );
    setTimezoneList(filteredTimeZoneList);
  };

  const updateTime = () => {
    setCurrentDateTime(new Date());
  };

  const addClock = (timezone: CountryTimeStamp) => {
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
    } else {
      alert("This clock is already in the list");
    }
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
      showClockNumbers: showNumbers,
    }));
  };

  const handleDragStart = (id: string) => (e: any) => {
    e.dataTransfer.setData("dragContent", JSON.stringify({ id }));
  };

  const handleDrop = (id: string) => (e: any) => {
    const fromBox = JSON.parse(e.dataTransfer.getData("dragContent"));
    swapClocks(fromBox.id, id);
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
    <div className=" min-h-full bg-blue-950 ">
      <Navbar
        showClockNumbers={settings["showClockNumbers"]}
        setShowClockNumbers={handleShowClockNumbersChange}
        setTheme={handleThemeChange}
        theme={settings["theme"]}
        clockPhases={clockPhases}
        addClock={addClock}
      ></Navbar>
      <div className="min-h-screen max-w-full  p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {timeZoneList.map((timezone) => (
            <div
              key={timezone.id}
              draggable={timezone.id !== "local"}
              onDragStart={handleDragStart(timezone.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop(timezone.id)}
              className={
                timezone.id === "local"
                  ? "cursor-not-allowed hover:opacity-80 transition"
                  : "cursor-grab active:cursor-grabbing"
              }
            >
              <Clock
                key={timezone.id}
                timezone={timezone}
                showClockNumbers={settings["showClockNumbers"]}
                theme={settings["theme"]}
                currentDateTime={currentDateTime}
                deleteClock={deleteClock}
              ></Clock>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
