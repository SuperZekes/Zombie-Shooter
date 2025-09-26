import React from 'react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardScreenProps {
  leaderboard: LeaderboardEntry[];
  onBackToStart: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ leaderboard, onBackToStart }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
      <div className="text-center p-10 bg-gray-800/90 rounded-2xl shadow-2xl border-2 border-blue-400/50 w-full max-w-lg">
        <h1 className="text-6xl font-bold text-blue-400 mb-6 font-mono">LEADERBOARD</h1>

        <div className="w-full h-96 overflow-y-auto mb-6 bg-black/30 p-4 rounded-lg border border-gray-600">
          {leaderboard.length > 0 ? (
            <ol className="text-left text-2xl text-white space-y-2 font-mono">
              {leaderboard.map((entry, index) => (
                <li key={index} className="flex justify-between p-2 rounded bg-gray-700/50">
                  <span>
                    <span className="inline-block w-8 text-gray-400">{index + 1}.</span>
                    {entry.name}
                  </span>
                  <span className="font-bold text-yellow-400">{entry.score}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-400 text-xl flex items-center justify-center h-full">The leaderboard is empty. Be the first!</p>
          )}
        </div>
        
        <button
          onClick={onBackToStart}
          className="px-10 py-4 bg-green-600 text-white text-2xl font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          MAIN MENU
        </button>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
