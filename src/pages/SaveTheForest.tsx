import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Star, TreePine, Coins, Globe, Sparkles, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';

interface GameState {
  trees: number;
  coins: number;
  oxygen: number;
  badges: string[];
  totalTreesPlanted: number;
  totalTreesCut: number;
  playerName: string;
  playerClass: string;
  score: number;
  level: number;
  streak: number;
}

interface LeaderboardEntry {
  name: string;
  class: string;
  score: number;
  avatar: string;
  trees: number;
  oxygen: number;
}

const SaveTheForest = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    trees: 3,
    coins: 0,
    oxygen: 30,
    badges: [],
    totalTreesPlanted: 0,
    totalTreesCut: 0,
    playerName: 'Young Eco Hero',
    playerClass: 'Class 3',
    score: 0,
    level: 1,
    streak: 0
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: '', class: '' });
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [animatingTrees, setAnimatingTrees] = useState<number[]>([]);
  const [floatingMessages, setFloatingMessages] = useState<{id: number, message: string, type: 'success' | 'warning'}[]>([]);

  const leaderboard: LeaderboardEntry[] = [
    { name: 'Sarah Green', class: 'Class 5', score: 850, avatar: '🌟', trees: 45, oxygen: 180 },
    { name: 'Alex Forest', class: 'Class 4', score: 720, avatar: '🌲', trees: 38, oxygen: 160 },
    { name: 'Emma Nature', class: 'Class 3', score: 680, avatar: '🌱', trees: 35, oxygen: 145 },
    { name: 'Max Earth', class: 'Class 5', score: 650, avatar: '🌍', trees: 32, oxygen: 140 },
    { name: 'Lily Bloom', class: 'Class 2', score: 540, avatar: '🌸', trees: 28, oxygen: 125 }
  ];

  const badges = [
    { name: 'Junior Gardener 🌱', requirement: 'Plant 5 trees', threshold: 5, type: 'trees' },
    { name: 'Forest Hero 🌳', requirement: 'Plant 10 trees', threshold: 10, type: 'trees' },
    { name: 'Tree Master 🌲', requirement: 'Plant 25 trees', threshold: 25, type: 'trees' },
    { name: 'Earth Saver 🌍', requirement: 'Oxygen > 100', threshold: 100, type: 'oxygen' },
    { name: 'Oxygen Guardian 💨', requirement: 'Oxygen > 150', threshold: 150, type: 'oxygen' },
    { name: 'Coin Collector 💰', requirement: 'Earn 50 coins', threshold: 50, type: 'coins' },
    { name: 'Treasure Hunter 💎', requirement: 'Earn 100 coins', threshold: 100, type: 'coins' },
    { name: 'Eco Warrior ⚡', requirement: 'Reach Level 5', threshold: 5, type: 'level' }
  ];

  const encouragingMessages = [
    "Amazing work! 🌟", "You're saving the planet! 🌍", "Trees love you! 🌲💚", 
    "Keep going, hero! 🦸‍♀️", "Earth is smiling! 😊🌱", "Fantastic job! ✨",
    "You're incredible! 🎉", "Nature thanks you! 🦋", "Super eco-hero! 🌿"
  ];

  const warningMessages = [
    "Be careful! 🌍 needs trees!", "Oxygen is getting low! 💨", "Think about our planet! 🌱",
    "Trees are precious! 🌲💎", "Help the Earth breathe! 🌍", "Every tree matters! 🌳"
  ];

  const addFloatingMessage = (message: string, type: 'success' | 'warning') => {
    const id = Date.now();
    setFloatingMessages(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setFloatingMessages(prev => prev.filter(m => m.id !== id));
    }, 3000);
  };

  const cutTree = () => {
    if (gameState.trees <= 0) {
      sonnerToast.error("No trees to cut! 😔", {
        description: "Plant some trees first to help our planet grow! 🌱"
      });
      return;
    }

    const newState = {
      ...gameState,
      trees: gameState.trees - 1,
      coins: gameState.coins + 10,
      oxygen: Math.max(0, gameState.oxygen - 5),
      totalTreesCut: gameState.totalTreesCut + 1,
      score: gameState.score + 5,
      streak: 0
    };

    setGameState(newState);
    
    // Add tree cutting animation
    setAnimatingTrees(prev => [...prev, Date.now()]);
    setTimeout(() => {
      setAnimatingTrees(prev => prev.slice(1));
    }, 1000);

    addFloatingMessage(warningMessages[Math.floor(Math.random() * warningMessages.length)], 'warning');

    sonnerToast.warning("Tree cut! 🪓", {
      description: "You earned 10 coins, but oxygen is decreasing! 📉 Be mindful of our planet! 🌍"
    });
  };

  const plantTree = () => {
    if (gameState.coins < 5) {
      sonnerToast.error("Not enough coins! 💰", {
        description: "You need 5 coins to plant a tree. Keep trying! 💪"
      });
      return;
    }

    const newStreak = gameState.streak + 1;
    const bonusPoints = newStreak >= 3 ? 5 : 0;
    const newState = {
      ...gameState,
      trees: gameState.trees + 1,
      coins: gameState.coins - 5,
      oxygen: gameState.oxygen + 8,
      totalTreesPlanted: gameState.totalTreesPlanted + 1,
      score: gameState.score + 15 + bonusPoints,
      streak: newStreak,
      level: Math.floor((gameState.totalTreesPlanted + 1) / 5) + 1
    };

    setGameState(newState);

    // Add tree planting animation
    setAnimatingTrees(prev => [...prev, Date.now()]);
    setTimeout(() => {
      setAnimatingTrees(prev => prev.slice(1));
    }, 1000);

    const successMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    addFloatingMessage(successMessage, 'success');

    if (bonusPoints > 0) {
      sonnerToast.success(`🌱 Tree planted! Streak bonus: +${bonusPoints} points! 🔥`, {
        description: `${successMessage} You're on fire! 🔥 Keep the streak going! 🌱💚`
      });
    } else {
      sonnerToast.success("Great job planting trees! 🌱", {
        description: `${successMessage} You're helping save our planet! 🌍💚`
      });
    }
  };

  // Check for new badges
  useEffect(() => {
    const newBadges = badges.filter(badge => {
      if (gameState.badges.includes(badge.name)) return false;
      
      switch (badge.type) {
        case 'trees':
          return gameState.totalTreesPlanted >= badge.threshold;
        case 'oxygen':
          return gameState.oxygen >= badge.threshold;
        case 'coins':
          return gameState.coins >= badge.threshold;
        case 'level':
          return gameState.level >= badge.threshold;
        default:
          return false;
      }
    });

    if (newBadges.length > 0) {
      setGameState(prev => ({
        ...prev,
        badges: [...prev.badges, ...newBadges.map(b => b.name)]
      }));

      newBadges.forEach(badge => {
        sonnerToast.success(`🎉 New Badge Earned! ${badge.name}`, {
          description: `Congratulations! You're amazing! 🌟 Keep up the great work!`
        });
      });
    }
  }, [gameState.totalTreesPlanted, gameState.oxygen, gameState.coins, gameState.level]);

  // Check for critical situations
  useEffect(() => {
    if (gameState.oxygen <= 5 && gameState.oxygen > 0) {
      sonnerToast.warning("Oxygen critically low! 🚨", {
        description: "Plant trees quickly to save our planet! 🌱🌍"
      });
    }
    
    if (gameState.oxygen <= 0 || gameState.trees <= 0) {
      sonnerToast.error("Earth needs your help! 🌍💙", {
        description: "Without trees, our planet suffers. Let's work together to save the forest! 🌲✨"
      });
    }
  }, [gameState.oxygen, gameState.trees]);

  const login = () => {
    if (loginForm.name && loginForm.class) {
      setGameState(prev => ({
        ...prev,
        playerName: loginForm.name,
        playerClass: loginForm.class
      }));
      setIsLoggedIn(true);
      sonnerToast.success(`Welcome ${loginForm.name}! 🎉`, {
        description: "Ready to save the forest? Let's make our planet green! 🌲🌍"
      });
    }
  };

  const resetGame = () => {
    setGameState({
      trees: 3,
      coins: 0,
      oxygen: 30,
      badges: [],
      totalTreesPlanted: 0,
      totalTreesCut: 0,
      playerName: gameState.playerName,
      playerClass: gameState.playerClass,
      score: 0,
      level: 1,
      streak: 0
    });
    sonnerToast.success("Game reset! 🔄", {
      description: "Ready for a fresh start? Let's save the forest again! 🌲"
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-500">
          <CardHeader className="text-center">
            <div className="text-8xl mb-4 animate-bounce">🌲</div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Save the Forest! 🌍
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Join the adventure to save our planet! 🌱✨
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-bold text-card-foreground mb-3 block flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Your Name 😊
              </label>
              <input
                type="text"
                placeholder="Enter your superhero name!"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary text-lg font-medium transition-all duration-300 focus:shadow-lg focus:scale-105"
                value={loginForm.name}
                onChange={(e) => setLoginForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-bold text-card-foreground mb-3 block flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                Your Class 📚
              </label>
              <select
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary text-lg font-medium transition-all duration-300 focus:shadow-lg focus:scale-105"
                value={loginForm.class}
                onChange={(e) => setLoginForm(prev => ({ ...prev, class: e.target.value }))}
              >
                <option value="">Select your class</option>
                <option value="Class 1">Class 1 🌱</option>
                <option value="Class 2">Class 2 🌿</option>
                <option value="Class 3">Class 3 🌳</option>
                <option value="Class 4">Class 4 🌲</option>
                <option value="Class 5">Class 5 🌟</option>
              </select>
            </div>
            <Button 
              onClick={login}
              className="w-full text-xl py-6 bg-gradient-to-r from-green-500 via-blue-500 to-emerald-500 hover:from-green-600 hover:via-blue-600 hover:to-emerald-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-bold"
              size="lg"
              disabled={!loginForm.name || !loginForm.class}
            >
              🚀 Start Your Eco Adventure! 🌍
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showLeaderboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent flex items-center">
              <Trophy className="w-12 h-12 mr-4 text-yellow-500" />
              🏆 Champions Board 🏆
            </h1>
            <Button 
              onClick={() => setShowLeaderboard(false)}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-6 py-3 transition-all duration-300 hover:scale-105"
            >
              🎮 Back to Game 🌲
            </Button>
          </div>

          <div className="grid gap-6">
            {leaderboard.map((player, index) => (
              <Card key={index} className={`bg-white/95 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                index === 0 ? 'border-yellow-400 shadow-yellow-200' :
                index === 1 ? 'border-gray-400 shadow-gray-200' :
                index === 2 ? 'border-orange-400 shadow-orange-200' :
                'border-primary/20'
              }`}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className={`text-5xl ${index < 3 ? 'animate-bounce' : ''}`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : player.avatar}
                    </div>
                    <div className={`text-3xl font-bold ${
                      index === 0 ? 'text-yellow-600' :
                      index === 1 ? 'text-gray-600' :
                      index === 2 ? 'text-orange-600' :
                      'text-primary'
                    }`}>
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-bold text-xl text-card-foreground">{player.name}</div>
                      <div className="text-muted-foreground text-lg">{player.class}</div>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          🌲 {player.trees} trees
                        </span>
                        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          💨 {player.oxygen} oxygen
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${
                      index === 0 ? 'text-yellow-600' :
                      index === 1 ? 'text-gray-600' :
                      index === 2 ? 'text-orange-600' :
                      'text-success'
                    }`}>
                      {player.score}
                    </div>
                    <div className="text-sm text-muted-foreground">eco points</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-white/95 backdrop-blur-sm border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">🌟 Your Current Stats 🌟</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-100 p-4 rounded-xl">
                  <div className="text-2xl">🌲</div>
                  <div className="font-bold text-green-700">{gameState.trees}</div>
                  <div className="text-xs text-green-600">Trees</div>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl">
                  <div className="text-2xl">💰</div>
                  <div className="font-bold text-yellow-700">{gameState.coins}</div>
                  <div className="text-xs text-yellow-600">Coins</div>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl">
                  <div className="text-2xl">💨</div>
                  <div className="font-bold text-blue-700">{gameState.oxygen}</div>
                  <div className="text-xs text-blue-600">Oxygen</div>
                </div>
                <div className="bg-purple-100 p-4 rounded-xl">
                  <div className="text-2xl">⭐</div>
                  <div className="font-bold text-purple-700">{gameState.score}</div>
                  <div className="text-xs text-purple-600">Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4 relative overflow-hidden">
      {/* Floating Messages */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {floatingMessages.map((msg) => (
          <div
            key={msg.id}
            className={`animate-fade-in px-4 py-2 rounded-full font-bold text-white shadow-lg transition-all duration-300 ${
              msg.type === 'success' ? 'bg-green-500' : 'bg-orange-500'
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2 flex items-center">
              🌲 Save the Forest! 🌍
              {gameState.streak >= 3 && <span className="ml-4 text-2xl animate-pulse">🔥</span>}
            </h1>
            <p className="text-xl text-muted-foreground">
              Welcome back, <span className="font-bold text-primary">{gameState.playerName}</span> from <span className="font-bold text-primary">{gameState.playerClass}</span>! 🎉
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <Badge className="bg-purple-100 text-purple-700 text-lg px-3 py-1">
                Level {gameState.level} ⭐
              </Badge>
              {gameState.streak > 0 && (
                <Badge className="bg-orange-100 text-orange-700 text-lg px-3 py-1 animate-pulse">
                  🔥 Streak: {gameState.streak}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex space-x-4">
            <Button 
              onClick={() => setShowLeaderboard(true)}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard 🏆
            </Button>
            <Button 
              onClick={resetGame}
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-105"
            >
              🔄 New Game
            </Button>
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className={`bg-white/95 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            gameState.trees > 10 ? 'border-green-400 shadow-green-200 animate-glow' : 'border-green-200'
          }`}>
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3 animate-bounce">🌲</div>
              <div className="text-4xl font-bold text-green-600 mb-1">{gameState.trees}</div>
              <div className="text-sm text-muted-foreground font-medium">Trees in Forest</div>
              {gameState.trees > 20 && <div className="text-xs text-green-600 font-bold mt-1">🌟 Amazing!</div>}
            </CardContent>
          </Card>

          <Card className={`bg-white/95 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            gameState.coins > 50 ? 'border-yellow-400 shadow-yellow-200 animate-glow' : 'border-yellow-200'
          }`}>
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3 animate-bounce">💰</div>
              <div className="text-4xl font-bold text-yellow-600 mb-1">{gameState.coins}</div>
              <div className="text-sm text-muted-foreground font-medium">Eco Coins</div>
              {gameState.coins > 100 && <div className="text-xs text-yellow-600 font-bold mt-1">💎 Rich!</div>}
            </CardContent>
          </Card>

          <Card className={`bg-white/95 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            gameState.oxygen > 100 ? 'border-blue-400 shadow-blue-200 animate-glow' :
            gameState.oxygen < 20 ? 'border-red-400 shadow-red-200 animate-pulse' :
            'border-blue-200'
          }`}>
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3 animate-bounce">🌍</div>
              <div className={`text-4xl font-bold mb-1 ${
                gameState.oxygen > 100 ? 'text-blue-600' :
                gameState.oxygen < 20 ? 'text-red-600' :
                'text-blue-600'
              }`}>
                {gameState.oxygen}
              </div>
              <div className="text-sm text-muted-foreground font-medium">Oxygen Level</div>
              <Progress 
                value={Math.min(100, (gameState.oxygen / 200) * 100)} 
                className={`mt-2 ${gameState.oxygen < 20 ? 'animate-pulse' : ''}`} 
              />
              {gameState.oxygen > 150 && <div className="text-xs text-blue-600 font-bold mt-1">💨 Perfect!</div>}
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-2 border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3 animate-bounce">⭐</div>
              <div className="text-4xl font-bold text-purple-600 mb-1">{gameState.score}</div>
              <div className="text-sm text-muted-foreground font-medium">Eco Score</div>
              {gameState.score > 500 && <div className="text-xs text-purple-600 font-bold mt-1">🏆 Hero!</div>}
            </CardContent>
          </Card>
        </div>

        {/* Forest Visualization */}
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-primary/20 mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-100 via-blue-100 to-emerald-100">
            <CardTitle className="text-3xl text-center text-primary flex items-center justify-center">
              <TreePine className="w-8 h-8 mr-3" />
              🌳 Your Magical Forest 🌳
              <TreePine className="w-8 h-8 ml-3" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-8 bg-gradient-to-b from-blue-50 via-green-50 to-emerald-50 rounded-xl min-h-[200px] relative">
              <div className="text-6xl leading-relaxed relative">
                {Array.from({ length: Math.max(0, gameState.trees) }, (_, i) => (
                  <span 
                    key={i} 
                    className={`inline-block transition-all duration-500 hover:scale-125 cursor-pointer ${
                      animatingTrees.length > 0 ? 'animate-bounce' : 'animate-float'
                    }`}
                    style={{ 
                      animationDelay: `${i * 0.1}s`,
                      transform: `rotate(${Math.sin(i) * 5}deg)`
                    }}
                  >
                    🌲
                  </span>
                ))}
                {gameState.trees === 0 && (
                  <div className="text-4xl text-muted-foreground animate-pulse">
                    🏜️ No trees left! Let's plant some! 🌱
                  </div>
                )}
                {gameState.trees > 30 && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <div className="text-6xl animate-float">🦋</div>
                    <div className="text-6xl animate-float" style={{ animationDelay: '1s' }}>🐝</div>
                  </div>
                )}
              </div>
              <div className="mt-4 text-lg font-medium text-green-700">
                Total Trees Planted: {gameState.totalTreesPlanted} 🌱 | Forest Health: {gameState.trees > 20 ? 'Excellent! 🌟' : gameState.trees > 10 ? 'Good! 😊' : gameState.trees > 5 ? 'Fair 🤔' : 'Needs Help! 🆘'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons - Always Visible and Prominent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Button
            onClick={plantTree}
            disabled={gameState.coins < 5}
            size="lg"
            className="h-32 text-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-green-300 border-4 border-green-200"
          >
            <div className="text-center">
              <div className="text-6xl mb-3 animate-bounce">🌱</div>
              <div className="font-bold">Plant Tree</div>
              <div className="text-lg opacity-90">(Costs 5 coins)</div>
              <div className="text-sm opacity-75">+8 oxygen, +15 points</div>
            </div>
          </Button>

          <Button
            onClick={cutTree}
            disabled={gameState.trees <= 0}
            size="lg"
            className="h-32 text-2xl bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-orange-300 border-4 border-orange-200"
          >
            <div className="text-center">
              <div className="text-6xl mb-3 animate-bounce">🪓</div>
              <div className="font-bold">Cut Tree</div>
              <div className="text-lg opacity-90">(+10 coins)</div>
              <div className="text-sm opacity-75">-5 oxygen, +5 points</div>
            </div>
          </Button>
        </div>

        {/* Educational Message */}
        <Card className="bg-gradient-to-r from-blue-100 via-green-100 to-emerald-100 border-2 border-primary/20 mb-8">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">🌍💚</div>
            <h3 className="text-2xl font-bold text-primary mb-2">Remember, Young Eco Hero!</h3>
            <p className="text-lg text-green-700 font-medium">
              Every tree you plant helps our planet breathe better! Trees give us oxygen, clean our air, and provide homes for animals. 
              <span className="font-bold"> Choose wisely and help save our beautiful Earth! 🌱🦋🌟</span>
            </p>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100">
            <CardTitle className="flex items-center text-3xl text-primary justify-center">
              <Award className="w-8 h-8 mr-3" />
              🏅 Your Amazing Badges 🏅
              <Sparkles className="w-8 h-8 ml-3" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {badges.map((badge, index) => {
                const earned = gameState.badges.includes(badge.name);
                return (
                  <div key={index} className={`text-center p-6 rounded-xl border-3 transition-all duration-500 cursor-pointer ${
                    earned 
                      ? 'border-success bg-gradient-to-br from-green-100 to-emerald-100 scale-105 shadow-lg hover:shadow-success/30 animate-glow' 
                      : 'border-muted bg-gradient-to-br from-gray-100 to-gray-200 grayscale hover:grayscale-0 hover:scale-105'
                  }`}>
                    <div className="text-4xl mb-3 animate-bounce">{badge.name.split(' ')[1]}</div>
                    <div className="text-sm font-bold mb-1">{badge.name.split(' ')[0]} {badge.name.split(' ')[2]}</div>
                    <div className="text-xs text-muted-foreground mb-2">{badge.requirement}</div>
                    {earned && (
                      <div className="text-sm text-success font-bold animate-pulse">
                        ✅ Earned! 🌟
                      </div>
                    )}
                    {!earned && (
                      <div className="text-xs text-gray-500">
                        Keep going! 💪
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center space-y-3">
              <div className="flex justify-center space-x-4 flex-wrap">
                <Badge variant="outline" className="text-lg px-4 py-2 bg-green-50">
                  🌲 Trees Planted: {gameState.totalTreesPlanted}
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2 bg-orange-50">
                  🪓 Trees Cut: {gameState.totalTreesCut}
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2 bg-purple-50">
                  🏆 Badges Earned: {gameState.badges.length}/{badges.length}
                </Badge>
              </div>
              <div className="text-lg font-medium text-green-700">
                🌟 You're making a real difference for our planet! Keep up the amazing work! 🌍💚
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SaveTheForest;