
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
      <div className="glass-panel p-5 rounded-xl text-center bg-gradient-to-br from-pink-50/80 via-purple-50/80 to-indigo-50/80 dark:from-pink-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 shadow-lg border border-white/20 dark:border-white/5">
        <h2 className="text-2xl font-medium mb-5 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
          {getStatusMessage()}
        </h2>
        
        {winner && (
          <div className="flex space-x-4 justify-center">
            <Button 
              onClick={onResetBoard} 
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium rounded-xl px-6 py-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(219,39,119,0.5)] transform hover:scale-105"
            >
              Play again
            </Button>
            <Button 
              onClick={onResetGame} 
              className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-medium rounded-xl px-6 py-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transform hover:scale-105"
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
