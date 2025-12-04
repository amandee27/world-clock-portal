import SearchBar from "./SearchBar/SearchBar";
import RightDropDown from "./RightDropDown/RightDropDown";
import { CountryTimeStamp } from "../../Interfaces/CountryTimeStamp";

export default function Navbar({
  addClock,
}: {
  addClock: (zone: CountryTimeStamp) => void;
}) {
  return (
    <nav className="w-full bg-transparent text-white px-4 py-3 flex items-center justify-between">
      {/* Center items */}
      <SearchBar addClock={addClock} />

      {/* Right Dropdown */}
      <RightDropDown />
    </nav>
  );
}
