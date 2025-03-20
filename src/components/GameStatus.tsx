
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
      <div className="glass-panel p-4 rounded-xl text-center">
        <h2 className="text-xl font-medium mb-4">{getStatusMessage()}</h2>
        
        {winner && (
          <div className="flex space-x-3 justify-center">
            <Button onClick={onResetBoard} className="btn-primary">
              Play again
            </Button>
            <Button onClick={onResetGame} className="btn-secondary">
              New players
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GameStatus;
