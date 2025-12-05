import React, { useState } from "react";
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

interface SearchBarProps {
  addClock: (zone: { value: string; label: string; offset: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ addClock }) => {
  const [selectedZone, setSelectedZone] = useState<{
    value: string;
    label: string;
    offset: string;
  } | null>(null);
  const fetchLocations = (
    inputValue: string,
    callback: (
      options: { value: string; label: string; offset: string }[]
    ) => void
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
      addClock(selectedZone);
      setSelectedZone(null);
    }
  };
  return (
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
          noOptionsMessage={() => null}
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
  );
};

export default SearchBar;
