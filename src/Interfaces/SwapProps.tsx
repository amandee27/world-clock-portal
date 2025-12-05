export interface SwapProps {
  itemId: string;
  children?: React.ReactNode;
  isFixed?: boolean;
  handleSwap: (fromId: string, toId: string) => void;
}
