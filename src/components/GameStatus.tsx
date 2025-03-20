
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface GameStatusProps {
  winner: null | "X" | "O" | "draw";
  currentPlayerName: string;
  player1: { name: string; mark: "X" | "O" };
  player2: { name: string; mark: "X" | "O" };
  onResetBoard: () => void;
  onResetGame: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({
  winner,
  currentPlayerName,
  player1,
  player2,
  onResetBoard,
  onResetGame,
}) => {
  const getStatusMessage = () => {
    if (winner === "X") {
      return `${player1.name} wins!`;
    } else if (winner === "O") {
      return `${player2.name} wins!`;
    } else if (winner === "draw") {
      return "It's a draw!";
    } else {
      return `${currentPlayerName}'s turn`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-md mx-auto mt-6"
    >
      <div className="glass-panel p-4 rounded-xl text-center bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-900/30 shadow-lg">
        <h2 className="text-xl font-medium mb-4 text-gradient">{getStatusMessage()}</h2>
        
        {winner && (
          <div className="flex space-x-3 justify-center">
            <Button 
              onClick={onResetBoard} 
              className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-medium rounded-xl px-6 py-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            >
              Play again
            </Button>
            <Button 
              onClick={onResetGame} 
              className="bg-gradient-to-r from-indigo-400 to-blue-400 hover:from-indigo-500 hover:to-blue-500 text-white font-medium rounded-xl px-6 py-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            >
              New players
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GameStatus;
