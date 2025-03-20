import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

type Player = {
  name: string;
  mark: "X" | "O";
  wins: number;
  losses: number;
};

type GameState = {
  board: (null | "X" | "O")[];
  currentPlayer: "X" | "O";
  winner: null | "X" | "O" | "draw";
  winningLine: number[] | null;
  gameStarted: boolean;
  gamePaused: boolean;
};

const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

const initialGameState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  winningLine: null,
  gameStarted: false,
  gamePaused: false,
};

export function useGameState() {
  const [player1, setPlayer1] = useState<Player>({ name: "", mark: "X", wins: 0, losses: 0 });
  const [player2, setPlayer2] = useState<Player>({ name: "", mark: "O", wins: 0, losses: 0 });
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [playersReady, setPlayersReady] = useState<boolean>(false);

  // Reset the board but keep player stats
  const resetBoard = useCallback(() => {
    setGameState(prevState => ({
      ...initialGameState,
      gameStarted: true,
      currentPlayer: prevState.currentPlayer === "X" ? "O" : "X" // Alternate first player
    }));
  }, []);

  // Start the game with player names
  const startGame = useCallback((p1Name: string, p2Name: string) => {
    if (!p1Name.trim() || !p2Name.trim()) {
      toast.error("Please enter names for both players");
      return;
    }
    
    setPlayer1(prev => ({ ...prev, name: p1Name }));
    setPlayer2(prev => ({ ...prev, name: p2Name }));
    setPlayersReady(true);
    setGameState({
      ...initialGameState,
      gameStarted: true,
    });
    toast.success("Game started! " + p1Name + " goes first");
  }, []);

  // Reset the entire game, including player stats
  const resetGame = useCallback(() => {
    setPlayer1({ name: "", mark: "X", wins: 0, losses: 0 });
    setPlayer2({ name: "", mark: "O", wins: 0, losses: 0 });
    setGameState(initialGameState);
    setPlayersReady(false);
  }, []);

  // Make a move
  const makeMove = useCallback((cellIndex: number) => {
    if (
      !gameState.gameStarted ||
      gameState.gamePaused ||
      gameState.board[cellIndex] ||
      gameState.winner
    ) {
      return;
    }

    // Create a new board with the move
    const newBoard = [...gameState.board];
    newBoard[cellIndex] = gameState.currentPlayer;

    // Check for winner
    let winningLine: number[] | null = null;
    let winner: "X" | "O" | "draw" | null = null;

    // Check for winning combinations
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        winner = newBoard[a] as "X" | "O";
        winningLine = combo;
        break;
      }
    }

    // Check for draw if no winner and all cells filled
    if (!winner && newBoard.every(cell => cell !== null)) {
      winner = "draw";
    }

    // Update player stats if there's a winner
    if (winner && winner !== "draw") {
      if (winner === "X") {
        setPlayer1(prev => ({ ...prev, wins: prev.wins + 1 }));
        setPlayer2(prev => ({ ...prev, losses: prev.losses + 1 }));
        toast.success(`${player1.name} wins!`);
      } else {
        setPlayer2(prev => ({ ...prev, wins: prev.wins + 1 }));
        setPlayer1(prev => ({ ...prev, losses: prev.losses + 1 }));
        toast.success(`${player2.name} wins!`);
      }
    } else if (winner === "draw") {
      toast.info("It's a draw!");
    }

    // Update game state
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === "X" ? "O" : "X",
      winner,
      winningLine,
      gamePaused: !!winner,
    }));
  }, [gameState, player1.name, player2.name]);

  // Calculate win percentage
  const getWinPercentage = useCallback((player: Player) => {
    const totalGames = player.wins + player.losses;
    if (totalGames === 0) return 0;
    return Math.round((player.wins / totalGames) * 100);
  }, []);

  // Get current player name
  const getCurrentPlayerName = useCallback(() => {
    return gameState.currentPlayer === "X" ? player1.name : player2.name;
  }, [gameState.currentPlayer, player1.name, player2.name]);

  // Return all the state and functions for the game
  return {
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
  };
}
