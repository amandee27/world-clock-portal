import SearchBar from "./SearchBar/SearchBar";
import RightDropDown from "./RightDropDown/RightDropDown";

export default function Navbar(props: any) {
  return (
    <nav className="w-full bg-transparent text-white px-4 py-3 flex items-center justify-between">
      {/* Center items */}
      <SearchBar addClock={props.addClock} />

      {/* Right Dropdown */}
      <RightDropDown
        setShowClockNumbers={props.setShowClockNumbers}
        showClockNumbers={props.showClockNumbers}
        clockPhases={props.clockPhases}
        theme={props.theme}
        setTheme={props.setTheme}
      />
    </nav>
  );
}
