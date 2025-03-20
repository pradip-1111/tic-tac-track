
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NameInputProps {
  onStartGame: (player1Name: string, player2Name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onStartGame }) => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1Name.trim() && player2Name.trim()) {
      onStartGame(player1Name, player2Name);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Card className="glass-panel overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-semibold text-center">
            <span className="block text-sm uppercase tracking-wider text-muted-foreground mb-1">Welcome to</span>
            Tic Tac Toe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="player1" className="text-sm font-medium">
                  Player 1 (X)
                </label>
                <Input
                  id="player1"
                  className="input-primary"
                  placeholder="Enter name"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="player2" className="text-sm font-medium">
                  Player 2 (O)
                </label>
                <Input
                  id="player2"
                  className="input-primary"
                  placeholder="Enter name"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="btn-primary w-full">
              Start Game
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NameInput;
