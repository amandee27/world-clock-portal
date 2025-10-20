import { useEffect, useRef, useState } from "react";
import "./App.css";
import Clock from "./components/Clock/page";
import { ReactSortable } from "react-sortablejs";
import Popup from "./components/Modal/Popup";
import Navbar from "./components/Navbar/Navbar";
import moment from "moment-timezone";

let clockPhases = [
  {
    key: "Theme 1",
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
];

interface CountryTimeStamp {
  id: string;
  value: string | undefined;
  label: string | undefined;
  offset: string | undefined;
}

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [timeZoneList, setTimezoneList] = useState<CountryTimeStamp[]>(() => {
    const list = localStorage.getItem("timeZoneList");
    const timeZoneObj = list && JSON.parse(list);
    return (
      timeZoneObj || [
        {
          id: "local",
          value: "",
          label: "",
        },
      ]
    );
  });
  const [popup, setPopup] = useState(false);
  const [deleteTimezone, setDeleteTimezone] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [timezone, setTimeZone] = useState<CountryTimeStamp>({
    id: "local",
    value: "",
    label: "",
    offset: "",
  });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [theme, setTheme] = useState(clockPhases[2]);

  const addClock = () => {
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

  useEffect(() => {
    const localTimezone = moment.tz.guess();
    let mapOptions = moment.tz.names().map((country) => {
      let a = country.match(/[^/]+$/) || [];
      let val = { value: country, label: a[0] };
      return val;
    });
    const defaultOption = mapOptions.find((opt) => opt.value === localTimezone);
    setTimeZone({
      id: "local",
      value: defaultOption?.value,
      label: defaultOption?.label,
      offset: "",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("timeZoneList", JSON.stringify(timeZoneList));
  }, [timeZoneList]);

  const deleteClock = (timezoneName: string) => {
    setDeleteTimezone(timezoneName);
    setPopup(true);
  };

  const confirmDeleteClock = () => {
    let filteredTimeZoneList = timeZoneList.filter(
      (timezone) => timezone.label !== deleteTimezone || timezone.label === ""
    );
    setTimezoneList(filteredTimeZoneList);
  };

  const updateTime = () => {
    setCurrentDateTime(new Date());
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className=" min-h-full bg-blue-950 ">
      <Navbar
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        setTheme={setTheme}
        theme={theme}
        clockPhases={clockPhases}
        setTimeZone={setTimeZone}
        addClock={addClock}
      ></Navbar>
      <div className="min-h-screen max-w-full  p-4">
        {popup && (
          <Popup
            deleteTimezone={deleteTimezone}
            setPopup={setPopup}
            confirmDeleteClock={confirmDeleteClock}
          ></Popup>
        )}
        <ReactSortable
          list={timeZoneList}
          setList={setTimezoneList}
          className="grid-container"
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 gap-6 "
          >
            {timeZoneList.map((timezone) => (
              <div
                key={timezone.id}
                className="sm:scale-75 md:scale-75 lg:scale-75"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div>
                  <Clock
                    key={timezone.id}
                    timezone={timezone}
                    isChecked={isChecked}
                    theme={theme}
                    currentDateTime={currentDateTime}
                    isHovering={isHovering}
                    deleteClock={deleteClock}
                  ></Clock>
                </div>
              </div>
            ))}
          </div>
        </ReactSortable>
      </div>
    </div>
  );
}

export default App;
