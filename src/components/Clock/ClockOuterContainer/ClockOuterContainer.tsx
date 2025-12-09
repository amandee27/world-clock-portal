import { CountryTimeStamp } from "../../../Interfaces/CountryTimeStamp";

export function ClockOuterContainer({
  children,
  loading,
  loadingClockId,
  timezone,
}: {
  children: React.ReactNode;
  loading: boolean;
  loadingClockId: string;
  timezone: CountryTimeStamp;
}) {
  return (
    <div className="group sm:scale-75 md:scale-75 lg:scale-75">
      <div
        className={`rounded-xl group-hover:shadow-lg group-hover:bg-gray-500/20 transition-all ${
          loading && loadingClockId === timezone.id ? "bg-gray-500/20" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
