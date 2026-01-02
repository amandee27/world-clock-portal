import SearchBar from "./SearchBar/SearchBar";
import RightDropDown from "./RightDropDown/RightDropDown";
import Logo from "./Logo/Logo";

export default function Navbar({
  addClock,
}: {
  addClock: (zone: { value: string; label: string; offset: string }) => void;
}) {
  return (
    <nav className="w-full bg-transparent text-white px-4 py-3 flex items-center justify-between">
      <div className="flex flex-wrap w-full gap-4 items-stretch">
        <div className="flex-1 min-w-[120px] flex items-center text-left order-1">
          <Logo />
        </div>
        <div className="flex-1 min-w-[120px] flex justify-end items-center order-2 md:order-3">
          <RightDropDown />
        </div>
        <div className="w-full text-center flex items-center justify-center order-3 md:order-2 md:flex-1 md:w-auto">
          <SearchBar addClock={addClock} />
        </div>
      </div>
    </nav>
  );
}
