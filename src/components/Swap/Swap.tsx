import React from "react";

interface SwapProps {
  timezoneId: string;
  children?: React.ReactNode;
  timeZoneList: CountryTimeStamp[];

  handleSwapClocks: (timezonelist: CountryTimeStamp[]) => void;
}
interface CountryTimeStamp {
  id: string;
  value: string | undefined;
  label: string | undefined;
  offset: string | undefined;
}

function Swap({
  timezoneId,
  children,
  timeZoneList,
  handleSwapClocks,
}: SwapProps) {
  const handleDragStart = (id: string) => (e: any) => {
    e.dataTransfer.setData("dragContent", JSON.stringify({ id }));
  };

  const handleDrop = (id: string) => (e: any) => {
    const fromBox = JSON.parse(e.dataTransfer.getData("dragContent"));
    swapClocks(fromBox.id, id);
  };

  const swapClocks = (fromId: string, toId: string) => {
    const newClocks = [...timeZoneList];
    const fromIndex = newClocks.findIndex((b) => b.id === fromId);
    const toIndex = newClocks.findIndex((b) => b.id === toId);
    if (fromId === "local" || toId === "local") return;
    [newClocks[fromIndex], newClocks[toIndex]] = [
      newClocks[toIndex],
      newClocks[fromIndex],
    ];
    handleSwapClocks(newClocks);
  };
  return (
    <div
      key={timezoneId}
      draggable={timezoneId !== "local"}
      onDragStart={handleDragStart(timezoneId)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop(timezoneId)}
      className={
        timezoneId === "local"
          ? "cursor-not-allowed hover:opacity-80 transition"
          : "cursor-grab active:cursor-grabbing"
      }
    >
      <div className="wrapper">{children}</div>
    </div>
  );
}

export default Swap;
