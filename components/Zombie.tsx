import React from 'react';
import type { ZombieType } from '../types';

interface ZombieProps extends ZombieType {
  onHit: (id: number) => void;
}

const ZombieFace: React.FC = () => (
    <div className="w-full h-full relative">
        <div className="absolute bg-black rounded-full" style={{ width: '20%', height: '20%', top: '25%', left: '20%' }}></div>
        <div className="absolute bg-black rounded-full" style={{ width: '20%', height: '20%', top: '25%', left: '60%' }}></div>
        <div className="absolute bg-black h-1" style={{ width: '40%', top: '70%', left: '30%', transform: 'rotate(5deg)'}}></div>
    </div>
);


const Zombie: React.FC<ZombieProps> = ({ id, x, y, size, status, onHit }) => {
  const isDying = status === 'dying';

  return (
    <div
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}rem`,
        height: `${size}rem`,
      }}
      className={`absolute transition-all duration-500 ease-in-out transform animate-zombie-appear
        ${isDying ? 'scale-125 opacity-0 rotate-45' : 'scale-100 opacity-100 hover:scale-110'}`}
      onClick={() => onHit(id)}
    >
        <div className={`w-full h-full rounded-full border-4 transition-colors duration-500 ${isDying ? 'bg-red-600 border-red-800' : 'bg-green-500 border-green-800'}`}>
            {!isDying && <ZombieFace />}
        </div>
    </div>
  );
};

export default Zombie;
