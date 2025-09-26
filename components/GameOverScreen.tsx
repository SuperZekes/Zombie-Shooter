import React, { useState } from 'react';

interface GameOverScreenProps {
  score: number;
  onAddToLeaderboard: (name: string) => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onAddToLeaderboard }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddToLeaderboard(name.trim());
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
      <div className="text-center p-10 bg-gray-800/90 rounded-2xl shadow-2xl border-2 border-yellow-400/50 w-full max-w-lg">
        <h1 className="text-7xl font-bold text-yellow-400 mb-4 font-mono">GAME OVER</h1>
        <p className="text-3xl text-gray-200 mb-2">Your final score is:</p>
        <p className="text-6xl font-bold text-white mb-8">{score}</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label htmlFor="name" className="text-xl text-gray-300 mb-3">Enter your name for the leaderboard:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            maxLength={3}
            className="w-full max-w-xs px-4 py-2 mb-6 text-center text-xl text-white bg-gray-900 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 tracking-[.25em]"
            placeholder="AAA"
            autoFocus
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="px-10 py-4 bg-green-600 text-white text-2xl font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed"
          >
            SUBMIT SCORE
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameOverScreen;