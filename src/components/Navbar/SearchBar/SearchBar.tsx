import React, { useState } from "react";
import AsyncSelect from "react-select/async";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    alignItems: "flex-start",
    fontSize: "medium",
    color: "grey",
    minHeight: 36,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 4,
    boxShadow: "none",
    boxSizing: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 4,
  }),
  menuList: (provided: any) => ({
    ...provided,
    borderRadius: 4, // Full rounding inside
    padding: 0,
    overflow: "hidden", // keeps rounded corners clean
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "small",
    color: "grey",
    backgroundColor: state.isSelected
      ? "rgba(189,197,209,.3)" // selected
      : state.isFocused //Works on hover and keyboard focus
      ? "rgb(222, 235, 255)"
      : "white",
    borderRadius: 4,
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
  const VITE_HOST_NAME =
    import.meta.env.VITE_HOST_NAME || "http://localhost:3000/cities";
  const fetchLocations = (
    inputValue: string,
    callback: (
      options: { value: string; label: string; offset: string }[]
    ) => void
  ) => {
    fetch(`${VITE_HOST_NAME}?query=${inputValue}`)
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

  const handleAdd = (selectedZone: {
    value: string;
    label: string;
    offset: string;
  }) => {
    addClock(selectedZone);
    setSelectedZone(null);
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
              handleAdd(option);
            }
          }}
          noOptionsMessage={() => null}
          placeholder="Search for a city or timezone..."
          className="z-60"
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default SearchBar;
