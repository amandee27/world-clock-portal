import { useEffect, useRef, useState } from "react";
import "./App.css";
import moment from "moment-timezone";
import Clock from "./components/Clock/page";
import Select from "react-select";
import { ReactSortable } from "react-sortablejs";

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
  id: string;
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
function useClickOutside(
  ref: any,
  onClickOutside: any,
  onClicksubOutside: any
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
        onClicksubOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside, onClicksubOutside]);
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
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [timezone, setTimeZone] = useState<CountryTimeStamp>({
    id: "local",
    value: "",
    label: "",
  });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [options, setOptions] = useState<
    { value: string; label: string | undefined }[]
  >([]);
  const [theme, setTheme] = useState(clockPhases[2]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setSubOpen] = useState(false);
  const wrapperRef = useRef(null);
  useClickOutside(
    wrapperRef,
    () => {
      setIsOpen(false);
    },
    () => setSubOpen(false)
  );
  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const addClock = () => {
    setTimezoneList([
      ...timeZoneList,
      { id: timezone.label, value: timezone.value, label: timezone.label },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("timeZoneList", JSON.stringify(timeZoneList));
  }, [timeZoneList]);

  const selectTheme = (theme: any) => {
    setTheme(theme);
    setSubOpen(false);
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubDropDown = () => {
    setSubOpen(!isSubOpen);
  };

  return (
    <div>
      <div className="h-screen max-w-full bg-blue-950 p-4">
        <div>
          <div className="flex justify-center gap-2 mb-10">
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
            <div className="flex content-center ">
              <button
                className="bg-white hieght-3 hover:bg-gray-100 text-gray-500 text-xs  w-10 h-6 border border-gray-400 rounded shadow"
                onClick={addClock}
              >
                Add
              </button>
            </div>
            <div className="w-44 relative" ref={wrapperRef}>
              <button
                id="dropdownCheckboxButton"
                onClick={toggleDropdown}
                className="text-gray-500 bg-white hover:bg-blue-100 focus:ring-1 focus:outline-none focus:ring-blue-300 text-sm inline-flex items-center justify-between dark:bg-white dark:hover:bg-blue-100 dark:focus:ring-blue-800 w-44 px-5 py-2.5"
                type="button"
              >
                Clock Settings{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="mainDropdown"
                className={`absolute z-10  w-44 bg-white  shadow-sm dark:bg-gray-700 dark:divide-gray-600 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                  <li className="relative">
                    <div className="flex items-center dark:hover:bg-gray-600 px-4 py-2">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                        className="text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        show numbers
                      </label>
                    </div>
                  </li>
                  <li className="relative">
                    <button
                      onClick={toggleSubDropDown}
                      type="button"
                      className=" flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Clock Themes
                      <svg
                        className="w-2.5 h-2.5 ms-3 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </button>

                    <ul
                      className={`w-38 py-2 text-sm text-gray-700 dark:text-gray-200 absolute ${
                        isSubOpen ? "block" : "hidden"
                      }`}
                    >
                      {clockPhases.map((theme) => (
                        <li className="w-44">
                          <a
                            onClick={() => selectTheme(theme)}
                            className="w-38 block px-4 py-2 bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
                          >
                            {theme.key}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
