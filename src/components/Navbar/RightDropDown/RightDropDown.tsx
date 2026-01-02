import React, { useContext, useEffect, useRef, useState } from "react";
import SettingsContext from "../../../Contexts/SettingsContexts";
import { clockPhases, ClockTheme } from "../../../data/clockPhases";

function useClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  onClickOutside: () => void,
  onClicksubOutside: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
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

const RightDropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setSubOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const settings = useContext(SettingsContext);
  useClickOutside(
    wrapperRef,
    () => {
      setIsOpen(false);
    },
    () => setSubOpen(false)
  );
  const selectTheme = (theme: any) => {
    settings.updateSettings?.({
      ...settings.clockSettings,
      theme: theme,
    });
    setSubOpen(false);
  };

  const handleCheckboxChange = (event: any) => {
    settings.updateSettings?.({
      ...settings.clockSettings,
      showNumbers: event.target.checked,
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleSubDropDown = () => {
    setSubOpen(!isSubOpen);
  };

  return (
    <div className="w-44 relative" ref={wrapperRef}>
      <button
        id="dropdownCheckboxButton"
        onClick={toggleDropdown}
        className="text-gray-500 bg-white hover:bg-blue-100 focus:ring-1 focus:outline-none focus:ring-blue-300 text-sm hidden md:inline-flex items-center justify-between dark:bg-white dark:hover:bg-blue-100 dark:focus:ring-blue-800 w-44 h-9.5 px-5 py-2.5  rounded-[3px]"
        type="button"
      >
        Settings{" "}
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
      <button
        id="dropdownIconButton"
        className="fill-white md:hidden  block ml-auto "
        onClick={toggleDropdown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 50 50"
        >
          <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
        </svg>
      </button>
      <div
        id="mainDropdown"
        className={`absolute z-100  w-44 bg-white  shadow-sm dark:bg-gray-700 rounded-sm mt-1 dark:divide-gray-600 ${
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
                checked={settings.clockSettings.showNumbers}
                className="text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm text-gray-900 dark:text-gray-300"
              >
                Show Numbers
              </label>
            </div>
          </li>
          <li className="relative w-38">
            <button
              onClick={toggleSubDropDown}
              type="button"
              className=" w-38 flex items-center justify-between px-4 py-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Themes
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
              {clockPhases.map((themeItem: ClockTheme) => (
                <li key={themeItem.key}>
                  <a
                    onClick={() => selectTheme(themeItem)}
                    className={`w-38 rounded-sm flex items-center gap-8  px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white ${
                      settings.clockSettings.theme.key === themeItem.key
                        ? "bg-blue-600 text-white"
                        : "bg-gray-600"
                    }`}
                  >
                    <span>{themeItem.key}</span>
                    {settings.clockSettings.theme.key === themeItem.key && (
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
  );
};

export default RightDropDown;
