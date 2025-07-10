import { useEffect, useState } from "react";

import "./App.css";
import moment from "moment-timezone";
import Clock from "./components/Clock/page";
import ClockSm from "./components/Clock-sm/page";
import Clockmd from "./components/Clock-md/page";
import AnalogeClock from "./components/ClockAnalogue/page";

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

function App() {
  const [selectedValue, setSelectedValue] = useState("");
  const timeZones = moment.tz.names();
  const [count, setCount] = useState<number[]>([1]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    console.log("Check box checked");
    setIsChecked(event.target.checked);
  };

  const setCountry = (event: any) => {
    console.log("Country Value: ", event.target.value);
    setSelectedValue(event.target.value);
  };

  const addClock = () => {
    setCount([...count, count.length + 1]);
    console.log("Clicked Add More");
    console.log(count);
  };

  return (
    <div className="h-screen max-w-full">
      <div>
        <div className="inline-block relative w-64">
          <label
            htmlFor="small"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Time Zone
          </label>
          <select
            id="small"
            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedValue}
            onChange={setCountry}
          >
            <option selected>Choose a country</option>
            {timeZones.map((country) => (
              <option value={country}>{country.match(/[^/]+$/)}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isChecked}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Show numbers
          </label>
        </div>
      </div>

      <div className="container m-auto grid grid-cols-3 gap-4  md:grid-cols-5 lg:grid-cols-4">
        {count.map((value) => (
          <div className="">
            <Clock key={value} isChecked={isChecked}></Clock>
          </div>
        ))}
        <div className="group relative flex cursor-pointer items-center justify-center text-sm">
          <button
            onClick={addClock}
            className="w-40 h-40  rounded-xl flex items-center justify-center text-3xl text-gray-600 bg-white/40 shadow hover:bg-gray-100"
            aria-label="Add clock"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
