
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
      ${isWinningCell ? 
        "bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 dark:from-pink-400/30 dark:via-purple-400/30 dark:to-indigo-400/30" : 
        "bg-white/70 dark:bg-gray-800/30"}
      backdrop-blur-sm border border-white/30 dark:border-white/10 shadow-md
      hover:shadow-lg hover:transform hover:scale-[1.02]
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
            className="text-indigo-600 dark:text-indigo-400"
          >
            <X size={40} strokeWidth={3} />
          </motion.div>
        )}
        {value === "O" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-pink-600 dark:text-pink-400"
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
      <div className="relative glass-panel p-6 rounded-2xl shadow-xl bg-gradient-to-br from-pink-50/70 via-purple-50/70 to-indigo-50/70 dark:from-pink-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 border border-white/30 dark:border-white/10">
        <div className="grid grid-cols-3 gap-4">
          {board.map((_, index) => renderCell(index))}
        </div>
      </div>
    </motion.div>
  );
};

export default GameBoard;
