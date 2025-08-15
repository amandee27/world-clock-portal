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
  }),
  option: (provided: any) => ({
    ...provided,
    fontSize: "small",
    color: "grey",
  }),
};

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [timeZoneList, setTimezoneList] = useState<CountryTimeStamp[]>([
    {
      value: "",
      label: "",
    },
  ]);
  const [timezone, setTimeZone] = useState<CountryTimeStamp>({
    value: "",
    label: "",
  });
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

  const selectTheme = (theme: any) => {
    setTheme(theme);
  };

  useEffect(() => {
    let mapOptions = moment.tz.names().map((country) => {
      let a = country.match(/[^/]+$/) || [];
      let val = { value: country, label: a[0] };
      return val;
    });

    setOptions(mapOptions);
  }, []);

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
            key={timezone.value}
            className="sm:scale-75 md:scale-75 lg:scale-75"
          >
            <Clock
              key={timezone.value}
              timezone={timezone}
              isChecked={isChecked}
              theme={theme}
            ></Clock>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
