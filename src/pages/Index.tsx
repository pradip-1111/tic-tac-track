
import React, { useEffect } from "react";
import { useGameState } from "@/hooks/useGameState";
import NameInput from "@/components/NameInput";
import GameBoard from "@/components/GameBoard";
import PlayerStats from "@/components/PlayerStats";
import GameStatus from "@/components/GameStatus";
import { motion } from "framer-motion";

const Index = () => {
  const {
    player1,
    player2,
    gameState,
    playersReady,
    startGame,
    resetBoard,
    resetGame,
    makeMove,
    getWinPercentage,
    getCurrentPlayerName,
  } = useGameState();

  // Effect for background decoration
  useEffect(() => {
    // Add any initialization if needed
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
          Tic Tac Toe
        </h1>
        <p className="text-muted-foreground">A minimalist gaming experience</p>
      </motion.div>

      {!playersReady ? (
        <NameInput onStartGame={startGame} />
      ) : (
        <div className="w-full max-w-lg mx-auto space-y-6">
          <PlayerStats
            player1={player1}
            player2={player2}
            currentPlayer={gameState.currentPlayer}
            getWinPercentage={getWinPercentage}
          />
          
          <GameBoard
            board={gameState.board}
            currentPlayer={gameState.currentPlayer}
            winner={gameState.winner}
            winningLine={gameState.winningLine}
            onCellClick={makeMove}
          />
          
          <GameStatus
            winner={gameState.winner}
            currentPlayerName={getCurrentPlayerName()}
            player1={player1}
            player2={player2}
            onResetBoard={resetBoard}
            onResetGame={resetGame}
          />
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-auto pt-6 text-center text-sm text-muted-foreground"
      >
        <p>Built with precision and simplicity.</p>
      </motion.div>
    </div>
  );
};

export default Index;
