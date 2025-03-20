
import React from "react";
import { Trophy, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface PlayerStatsProps {
  player1: {
    name: string;
    mark: "X" | "O";
    wins: number;
    losses: number;
  };
  player2: {
    name: string;
    mark: "X" | "O";
    wins: number;
    losses: number;
  };
  currentPlayer: "X" | "O";
  getWinPercentage: (player: any) => number;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({
  player1,
  player2,
  currentPlayer,
  getWinPercentage,
}) => {
  const renderPlayerCard = (player: any, isCurrentTurn: boolean) => {
    const winPercentage = getWinPercentage(player);
    
    return (
      <motion.div
        initial={{ opacity: 0, x: player.mark === "X" ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: player.mark === "X" ? 0 : 0.1 }}
        className={`glass-panel p-4 rounded-xl ${
          isCurrentTurn ? "ring-2 ring-primary/50" : ""
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              player.mark === "X" ? "bg-blue-500/10" : "bg-red-500/10"
            }`}
          >
            {player.mark === "X" ? (
              <span className="text-blue-500 font-bold">X</span>
            ) : (
              <span className="text-red-500 font-bold">O</span>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-sm truncate max-w-[100px]">
              {player.name || `Player ${player.mark === "X" ? "1" : "2"}`}
            </h3>
            {isCurrentTurn && (
              <span className="text-xs text-primary animate-pulse">
                Your turn
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-secondary/50 p-2 rounded-lg">
            <div className="text-xs text-muted-foreground">Wins</div>
            <div className="font-medium">{player.wins}</div>
          </div>
          <div className="bg-secondary/50 p-2 rounded-lg">
            <div className="text-xs text-muted-foreground">Losses</div>
            <div className="font-medium">{player.losses}</div>
          </div>
          <div className="bg-secondary/50 p-2 rounded-lg">
            <div className="text-xs text-muted-foreground">Win %</div>
            <div className="font-medium">{winPercentage}%</div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex justify-between gap-4 w-full max-w-md mx-auto mb-6">
      {renderPlayerCard(player1, currentPlayer === "X")}
      {renderPlayerCard(player2, currentPlayer === "O")}
    </div>
  );
};

export default PlayerStats;
