
import React from "react";
import { X, Circle } from "lucide-react";
import { motion } from "framer-motion";

interface GameBoardProps {
  board: (null | "X" | "O")[];
  currentPlayer: "X" | "O";
  winner: null | "X" | "O" | "draw";
  winningLine: number[] | null;
  onCellClick: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  currentPlayer,
  winner,
  winningLine,
  onCellClick,
}) => {
  const renderCell = (index: number) => {
    const isWinningCell = winningLine?.includes(index);
    const value = board[index];
    
    const cellClasses = `
      relative flex items-center justify-center 
      aspect-square rounded-lg
      text-4xl font-bold cursor-pointer
      transition-all duration-300 ease-out
      ${winner ? "pointer-events-none" : ""}
      ${value ? "marked" : "cell-hover-effect"}
      ${isWinningCell ? "bg-primary/10" : ""}
    `;

    return (
      <div
        key={index}
        className={cellClasses}
        onClick={() => onCellClick(index)}
        data-value={value}
      >
        {value === "X" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-blue-500"
          >
            <X size={40} strokeWidth={3} />
          </motion.div>
        )}
        {value === "O" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-red-500"
          >
            <Circle size={36} strokeWidth={3} />
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative glass-panel p-5 rounded-2xl shadow-xl">
        <div className="grid grid-cols-3 gap-3">
          {board.map((_, index) => renderCell(index))}
        </div>
      </div>
    </motion.div>
  );
};

export default GameBoard;
