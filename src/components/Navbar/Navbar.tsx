import { useState, useRef, useEffect } from "react";
import moment from "moment-timezone";
import Select from "react-select";

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

export default function Navbar(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setSubOpen] = useState(false);
  const [options, setOptions] = useState<
    { value: string; label: string | undefined }[]
  >([]);

  const [selectedZone, setSelectedZone] = useState<any>(null);
  useEffect(() => {
    let mapOptions = moment.tz.names().map((country) => {
      let a = country.match(/[^/]+$/) || [];
      let val = { value: country, label: a[0] };
      return val;
    });

    setOptions(mapOptions);
  }, []);

  const wrapperRef = useRef(null);
  useClickOutside(
    wrapperRef,
    () => {
      setIsOpen(false);
    },
    () => setSubOpen(false)
  );
  const selectTheme = (theme: any) => {
    props.setTheme(theme);
    setSubOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubDropDown = () => {
    setSubOpen(!isSubOpen);
  };

  const handleCheckboxChange = (event: any) => {
    props.setIsChecked(event.target.checked);
  };

  return (
    <nav className="w-full bg-transparent text-white px-4 py-3 flex items-center justify-between">
      {/* Center items */}
      <div className="flex-1 flex justify-center items-center gap-4">
        <div className="w-50">
          <Select
            options={options}
            value={selectedZone}
            styles={customStyles}
            className="z-60"
            onChange={(option: any) => {
              setSelectedZone(option);
              props.setTimeZone(option);
            }}
          />
        </div>
        <div className="flex content-center ">
          <button
            className="bg-white hieght-3 hover:bg-gray-100 text-gray-500 text-xs  w-10 h-6 border border-gray-400 rounded shadow"
            onClick={props.addClock}
          >
            Add
          </button>
        </div>
      </div>

      {/* Right Dropdown */}
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
                  checked={props.isChecked}
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
                {props.clockPhases.map((theme: any) => (
                  <li className="w-44" key={theme.key}>
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
    </nav>
  );
}
