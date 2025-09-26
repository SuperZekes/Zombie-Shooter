import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ZombieType, GameState, LeaderboardEntry } from './types';
import Zombie from './components/Zombie';
import GameUI from './components/GameUI';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import LeaderboardScreen from './components/LeaderboardScreen';

const ZOMBIE_SPAWN_RATE = 800; // in milliseconds
const HEALTH_LOSS_PER_ZOMBIE = 2; // health points lost per second, per zombie
const LEADERBOARD_KEY = 'zombie_shooter_leaderboard';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [score, setScore] = useState<number>(0);
  const [health, setHealth] = useState<number>(100);
  const [zombies, setZombies] = useState<ZombieType[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const zombiesRef = useRef(zombies);
  zombiesRef.current = zombies;

  // Load leaderboard from localStorage on initial render
  useEffect(() => {
    try {
      const storedLeaderboard = localStorage.getItem(LEADERBOARD_KEY);
      if (storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      }
    } catch (error) {
      console.error("Failed to load leaderboard from localStorage", error);
      setLeaderboard([]);
    }
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setHealth(100);
    setZombies([]);
    setGameState(GameState.Playing);
  }, []);

  const showLeaderboard = useCallback(() => {
    setGameState(GameState.Leaderboard);
  }, []);

  const backToStart = useCallback(() => {
    setGameState(GameState.Start);
  }, []);

  const handleAddToLeaderboard = useCallback((name: string) => {
    const newEntry: LeaderboardEntry = { name, score };
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Keep top 10

    setLeaderboard(updatedLeaderboard);
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
    } catch (error) {
      console.error("Failed to save leaderboard to localStorage", error);
    }
    setGameState(GameState.Leaderboard);
  }, [score, leaderboard]);

  const spawnZombie = useCallback(() => {
    const newZombie: ZombieType = {
      id: Date.now() + Math.random(),
      x: Math.random() * 90, // %
      y: Math.random() * 80, // %
      size: Math.random() * 3 + 2, // rem
      status: 'alive',
    };
    setZombies(prev => [...prev, newZombie]);
  }, []);

  const handleZombieHit = useCallback((id: number) => {
    setZombies(prevZombies => {
      const zombieToHit = prevZombies.find(z => z.id === id);
      if (!zombieToHit || zombieToHit.status === 'dying') {
        return prevZombies;
      }

      setScore(prevScore => prevScore + 10);

      setTimeout(() => {
        setZombies(currentZombies => currentZombies.filter(z => z.id !== id));
      }, 500);

      return prevZombies.map(zombie =>
        zombie.id === id ? { ...zombie, status: 'dying' } : zombie
      );
    });
  }, []);

  useEffect(() => {
    if (gameState !== GameState.Playing) return;

    const gameTick = setInterval(() => {
      // Handle health depletion based on the number of zombies on screen
      const numZombies = zombiesRef.current.length;
      if (numZombies > 0) {
        setHealth(prevHealth => {
          const damage = numZombies * HEALTH_LOSS_PER_ZOMBIE;
          const newHealth = prevHealth - damage;
          if (newHealth <= 0) {
            setGameState(GameState.GameOver);
            return 0;
          }
          return newHealth;
        });
      }
    }, 1000);

    return () => clearInterval(gameTick);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== GameState.Playing) return;

    const spawner = setInterval(spawnZombie, ZOMBIE_SPAWN_RATE);
    return () => clearInterval(spawner);
  }, [gameState, spawnZombie]);

  const renderGameContent = () => {
    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStart={startGame} onShowLeaderboard={showLeaderboard} />;
      case GameState.Leaderboard:
        return <LeaderboardScreen leaderboard={leaderboard} onBackToStart={backToStart} />;
      case GameState.GameOver:
        return <GameOverScreen score={score} onAddToLeaderboard={handleAddToLeaderboard} />;
      case GameState.Playing:
        return (
          <>
            <GameUI score={score} health={health} />
            {zombies.map(zombie => (
              <Zombie key={zombie.id} {...zombie} onHit={handleZombieHit} />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('https://picsum.photos/seed/zombiebg/1920/1080')]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      {renderGameContent()}
    </main>
  );
};

export default App;