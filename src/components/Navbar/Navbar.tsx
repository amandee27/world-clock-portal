import { useState, useRef, useEffect } from "react";
import AsyncSelect from "react-select/async";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    alignItems: "flex-start",
    fontSize: "medium",
    color: "grey",
    minHeight: "none",
    padding: "none",
    paddingTop: "0px",
    paddingBottom: "0px",
    borderRadius: "4px",
    boxShadow: "none",
    boxSizing: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: "4px",
  }),
  menuList: (provided: any) => ({
    ...provided,
    borderRadius: "4px", // Full rounding inside
    padding: 0,
    overflow: "hidden", // keeps rounded corners clean
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
    borderRadius: "4px",
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
  const [selectedZone, setSelectedZone] = useState<any>(null);

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
    props.setShowClockNumbers(event.target.checked);
  };

  const fetchLocations = (
    inputValue: string,
    callback: (options: { value: string; label: string }[]) => void
  ) => {
    fetch(`http://localhost:3000/cities?query=${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((city: any) => ({
          value: city.timezone, // internal value
          label: `${city.city}, ${city.country} `,
          offset: `(UTC${city.offset >= 0 ? "+" : ""}${city.offset})`,
        }));
        callback(options);
      });
  };

  const handleAdd = () => {
    if (selectedZone) {
      props.addClock(selectedZone);
      setSelectedZone(null);
    }
  };
  return (
    <nav className="w-full bg-transparent text-white px-4 py-3 flex items-center justify-between">
      {/* Center items */}
      <div className="flex-1 flex justify-center items-stretch gap-4">
        <div className="w-120">
          <AsyncSelect
            cacheOptions
            loadOptions={fetchLocations}
            value={selectedZone}
            onChange={(option) => {
              if (option) {
                setSelectedZone(option);
              }
            }}
            defaultOptions={false}
            placeholder="Search for a city or timezone..."
            className="z-60"
            styles={customStyles}
          />
        </div>
        <div>
          <button
            className="bg-white h-full hover:bg-gray-100 text-gray-500 text-sm  w-15 border border-gray-400 rounded-sm shadow"
            onClick={handleAdd}
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
          className="text-gray-500 bg-white hover:bg-blue-100 focus:ring-1 focus:outline-none focus:ring-blue-300 text-sm inline-flex items-center justify-between dark:bg-white dark:hover:bg-blue-100 dark:focus:ring-blue-800 w-44 px-5 py-2.5 rounded-sm"
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
          className={`absolute z-10  w-44 bg-white  shadow-sm dark:bg-gray-700 rounded-sm mt-1 dark:divide-gray-600 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="p-3 text-sm text-gray-700 dark:text-gray-200">
            <li className="relative w-38">
              <div className="flex items-center justify-between px-4 py-2 rounded-sm  dark:hover:bg-gray-600">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  checked={props.showClockNumbers}
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
            <li className="relative w-38">
              <button
                onClick={toggleSubDropDown}
                type="button"
                className=" w-38 flex items-center justify-between px-4 py-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
                className={`w-38 mt-1 text-sm text-gray-700 dark:text-gray-200  rounded-sm  bg-gray-600 absolute ${
                  isSubOpen ? "block" : "hidden"
                }`}
              >
                {props.clockPhases.map((theme: any) => (
                  <li key={theme.key}>
                    <a
                      onClick={() => selectTheme(theme)}
                      className={`w-38 rounded-sm flex items-center gap-8  px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white ${
                        props.theme.key === theme.key
                          ? "bg-blue-600 text-white"
                          : "bg-gray-600"
                      }`}
                    >
                      <span>{theme.key}</span>
                      {props.theme.key === theme.key && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="20"
                          height="20"
                          viewBox="0,0,256,256"
                        >
                          <g
                            fill="#ffffff"
                            fill-rule="nonzero"
                            stroke="none"
                            stroke-width="1"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            stroke-miterlimit="10"
                            stroke-dasharray=""
                            stroke-dashoffset="0"
                            font-family="none"
                            font-weight="none"
                            font-size="none"
                            text-anchor="none"
                            style={{ mixBlendMode: "normal" }}
                          >
                            <g transform="scale(10.66667,10.66667)">
                              <path d="M20.29297,5.29297l-11.29297,11.29297l-4.29297,-4.29297l-1.41406,1.41406l5.70703,5.70703l12.70703,-12.70703z"></path>
                            </g>
                          </g>
                        </svg>
                      )}
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
