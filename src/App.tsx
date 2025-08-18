import { useEffect, useState } from "react";
import "./App.css";
import moment from "moment-timezone";
import Clock from "./components/Clock/page";
import Select from "react-select";

let theme = {
  key: "light",
  value: {
    main: "bg-slate-300 text-slate-800",
    shadow: "shadow-xl shadow-slate-400",
    hand: {
      center: "bg-slate-800 before:bg-slate-300",
      second: "bg-slate-800",
      minute: "bg-slate-600",
      hour: "bg-slate-600",
    },
  },
};

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
  value: string;
  label: string;
}

let size = {
  key: "medium",
  value: {
    daylight: "h-8 w-8 right-5 -top-2 group-hover:-top-6",
    dimension: "w-56 h-56",
    numbers: "inset-2 text-2xl",
    center: "h-4 w-4 -bottom-[3px]",
    hands: {
      hour: "h-[4.5em] w-[0.3em]",
      minute: "h-[6.5em] w-[0.2em]",
      second: "h-[6.5em] w-[0.09em]",
    },
  },
};

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    alignItems: "flex-start",
    fontSize: "small",
    color: "grey",
    minHeight: "none",
    padding: "none",
    paddingTop: "0px",
    paddingBottom: "0px",
    borderRadius: "none",
    boxShadow: "none",
    boxSizing: "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "small",
    color: "grey",
    backgroundColor: state.isSelected ? "rgba(189,197,209,.3)" : "white",
    "&:hover": {
      backgroundColor: state.isSelected
        ? "rgba(189,197,209,.3)"
        : "rgb(222, 235, 255)",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "none",
  }),
};

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [timeZoneList, setTimezoneList] = useState<CountryTimeStamp[]>(() => {
    const list = localStorage.getItem("timeZoneList");
    const timeZoneObj = list && JSON.parse(list);
    return (
      timeZoneObj || [
        {
          value: "",
          label: "",
        },
      ]
    );
  });
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [timezone, setTimeZone] = useState<CountryTimeStamp>({
    value: "",
    label: "",
  });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [options, setOptions] = useState<
    { value: string; label: string | undefined }[]
  >([]);
  const [theme, setTheme] = useState(clockPhases[2]);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const addClock = () => {
    setTimezoneList([
      ...timeZoneList,
      { value: timezone.value, label: timezone.label },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("timeZoneList", JSON.stringify(timeZoneList));
  }, [timeZoneList]);

  const selectTheme = (theme: any) => {
    setTheme(theme);
  };

  const deleteClock = (timezoneName: string) => {
    let filteredTimeZoneList = timeZoneList.filter(
      (timezone) => timezone.label !== timezoneName || timezone.label === ""
    );

    setTimezoneList(filteredTimeZoneList);
    setShowDeleteBtn(true);
  };

  useEffect(() => {
    let mapOptions = moment.tz.names().map((country) => {
      let a = country.match(/[^/]+$/) || [];
      let val = { value: country, label: a[0] };
      return val;
    });

    setOptions(mapOptions);
  }, []);

  const updateTime = () => {
    setCurrentDateTime(new Date());
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="h-screen max-w-full bg-blue-950 p-4">
      <div>
        <div className="flex  justify-center gap-2 mb-10">
          <div className="w-50">
            <Select
              options={options}
              styles={customStyles}
              className="z-100"
              onChange={(option: any) => {
                setTimeZone(option);
              }}
            />
          </div>
          <div className="content-center">
            <button
              className="bg-white hieght-3 hover:bg-gray-100 text-gray-500 text-xs  w-10 h-6 border border-gray-400 rounded shadow"
              onClick={addClock}
            >
              Add
            </button>
          </div>

          <div className="content-center" dir="ltr">
            <input
              id="default-checkbox"
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={isChecked}
              className="text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              Show numbers
            </label>
          </div>
          <div className="flex-end">
            {clockPhases.map((theme) => (
              <button
                key={theme.key}
                onClick={() => selectTheme(theme)}
                className="bg-blue-950 hover:opacity-75 text-white hover:text-white text-xs border border-white hover:border-white w-15 h-5"
              >
                {theme.key}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container m-auto grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {timeZoneList.map((timezone: CountryTimeStamp) => (
          <div
            key={timezone.label}
            className="sm:scale-75 md:scale-75 lg:scale-75"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <Clock
                  key={timezone.value}
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
                      width="25"
                      height="25"
                      viewBox="0 0 30 30"
                      style={{ fill: "#FFFFFF" }}
                    >
                      <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
