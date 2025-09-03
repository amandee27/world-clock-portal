import { useEffect, useRef, useState } from "react";
import "./App.css";
import Clock from "./components/Clock/page";
import { ReactSortable } from "react-sortablejs";
import Popup from "./components/Modal/Popup";
import Navbar from "./components/Navbar/Navbar";

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
  value: string;
  label: string;
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
  });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [theme, setTheme] = useState(clockPhases[2]);

  const addClock = () => {
    const exists = timeZoneList.some((item) => item.label === timezone.label);
    if (!exists) {
      setTimezoneList([
        ...timeZoneList,
        { id: timezone.label, value: timezone.value, label: timezone.label },
      ]);
    } else {
      alert("This clock is already in the list");
    }
  };

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
    <div className="bg-blue-950">
      <Navbar
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        setTheme={setTheme}
        theme={theme}
        clockPhases={clockPhases}
        setTimeZone={setTimeZone}
        addClock={addClock}
      ></Navbar>
      <div className="h-screen max-w-full  p-4">
        <div>
          <div className="flex justify-center gap-2 mb-10"></div>
        </div>
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
          {timeZoneList.map((timezone) => (
            <div
              key={timezone.id}
              className="sm:scale-75 md:scale-75 lg:scale-75"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="grid grid-cols-3 ">
                <div className="col-span-2">
                  <Clock
                    key={timezone.id}
                    timezone={timezone}
                    isChecked={isChecked}
                    theme={theme}
                    currentDateTime={currentDateTime}
                  ></Clock>
                </div>
                <div className="">
                  {isHovering && timezone.value !== "" && (
                    <button
                      className="text-white	"
                      onClick={() => deleteClock(timezone.label)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0,0,256,256"
                        style={{ fill: "#FFFFFF" }}
                      >
                        <g
                          fill="#ffffff"
                          fillRule="nonzero"
                          stroke="none"
                          strokeWidth="1"
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          strokeMiterlimit="10"
                          strokeDasharray=""
                          strokeDashoffset="0"
                          fontFamily="none"
                          fontWeight="none"
                          fontSize="none"
                          textAnchor="none"
                          style={{ mixBlendMode: "normal" }}
                        >
                          <g transform="scale(8.53333,8.53333)">
                            <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM16.414,15c0,0 3.139,3.139 3.293,3.293c0.391,0.391 0.391,1.024 0,1.414c-0.391,0.391 -1.024,0.391 -1.414,0c-0.154,-0.153 -3.293,-3.293 -3.293,-3.293c0,0 -3.139,3.139 -3.293,3.293c-0.391,0.391 -1.024,0.391 -1.414,0c-0.391,-0.391 -0.391,-1.024 0,-1.414c0.153,-0.154 3.293,-3.293 3.293,-3.293c0,0 -3.139,-3.139 -3.293,-3.293c-0.391,-0.391 -0.391,-1.024 0,-1.414c0.391,-0.391 1.024,-0.391 1.414,0c0.154,0.153 3.293,3.293 3.293,3.293c0,0 3.139,-3.139 3.293,-3.293c0.391,-0.391 1.024,-0.391 1.414,0c0.391,0.391 0.391,1.024 0,1.414c-0.153,0.154 -3.293,3.293 -3.293,3.293z"></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ReactSortable>
      </div>
    </div>
  );
}

export default App;
