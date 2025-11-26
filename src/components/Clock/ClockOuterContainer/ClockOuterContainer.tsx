export function ClockOuterContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="group sm:scale-75 md:scale-75 lg:scale-75">
      <div className="rounded-xl group-hover:shadow-lg group-hover:bg-gray-500/20 transition-all ">
        {children}
      </div>
    </div>
  );
}
