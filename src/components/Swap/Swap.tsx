import { SwapProps } from "../../Interfaces/SwapProps";

function Swap({ itemId, children, isFixed, handleSwap }: SwapProps) {
  const handleDragStart = (id: string) => (e: any) => {
    e.dataTransfer.setData("dragContent", JSON.stringify({ id }));
  };

  const handleDrop = (id: string) => (e: any) => {
    const fromBox = JSON.parse(e.dataTransfer.getData("dragContent"));
    handleSwap(fromBox.id, id);
  };

  return (
    <div
      key={itemId}
      draggable={isFixed}
      onDragStart={handleDragStart(itemId)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop(itemId)}
      className={
        isFixed
          ? "cursor-grab active:cursor-grabbing"
          : "cursor-not-allowed hover:opacity-80 transition"
      }
    >
      <div className="wrapper">{children}</div>
    </div>
  );
}

export default Swap;
