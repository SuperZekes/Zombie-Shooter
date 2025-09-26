import React from 'react';

interface GameUIProps {
  score: number;
  health: number;
}

const Crosshair: React.FC = () => (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
        <div className="w-8 h-1 bg-red-500/80 rounded-full"></div>
        <div className="w-1 h-8 bg-red-500/80 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    </div>
);

const GameUI: React.FC<GameUIProps> = ({ score, health }) => {
  const healthColor = health > 50 ? 'bg-green-500' : health > 20 ? 'bg-yellow-500' : 'bg-red-600';

  return (
    <>
      <div className="fixed top-4 left-4 text-white text-2xl font-mono bg-black/50 p-3 rounded-lg z-10">
        SCORE: <span className="text-yellow-400">{score}</span>
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-1/3 max-w-sm h-8 bg-black/50 border-2 border-gray-400 rounded-lg p-1 z-10">
        <div
          className={`h-full ${healthColor} rounded-sm transition-all duration-300 ease-in-out`}
          style={{ width: `${health}%` }}
        ></div>
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold font-mono tracking-wider">
          HEALTH: {health}
        </span>
      </div>
      <Crosshair />
    </>
  );
};

export default GameUI;