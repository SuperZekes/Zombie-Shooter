import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  onShowLeaderboard: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onShowLeaderboard }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-20">
      <div className="text-center p-10 bg-gray-800/90 rounded-2xl shadow-2xl border-2 border-red-500/50">
        <h1 className="text-7xl font-bold text-red-600 mb-4 font-mono tracking-wider">ZOMBIE SHOOTER</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-md">
            The undead are rising! Click zombies to score points.
            <br />
            <span className="text-red-400 font-semibold">Warning: Zombies on screen will drain your health!</span>
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onStart}
            className="w-full px-10 py-4 bg-red-600 text-white text-2xl font-bold rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg"
          >
            START GAME
          </button>
          <button
            onClick={onShowLeaderboard}
            className="w-full px-10 py-3 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
          >
            LEADERBOARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
