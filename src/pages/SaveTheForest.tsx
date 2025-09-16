import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Star, TreePine, Coins, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GameState {
  trees: number;
  coins: number;
  oxygen: number;
  badges: string[];
  totalTreesPlanted: number;
  playerName: string;
  playerClass: string;
}

interface LeaderboardEntry {
  name: string;
  class: string;
  score: number;
  avatar: string;
}

const SaveTheForest = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    trees: 3,
    coins: 0,
    oxygen: 30,
    badges: [],
    totalTreesPlanted: 0,
    playerName: 'Young Eco Hero',
    playerClass: 'Class 3'
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: '', class: '' });
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const leaderboard: LeaderboardEntry[] = [
    { name: 'Sarah Green', class: 'Class 5', score: 850, avatar: '🌟' },
    { name: 'Alex Forest', class: 'Class 4', score: 720, avatar: '🌲' },
    { name: 'Emma Nature', class: 'Class 3', score: 680, avatar: '🌱' },
    { name: 'Max Earth', class: 'Class 5', score: 650, avatar: '🌍' },
    { name: 'Lily Bloom', class: 'Class 2', score: 540, avatar: '🌸' }
  ];

  const badges = [
    { name: 'Junior Gardener 🌱', requirement: 'Plant 5 trees', threshold: 5 },
    { name: 'Forest Hero 🌳', requirement: 'Plant 10 trees', threshold: 10 },
    { name: 'Earth Saver 🌍', requirement: 'Oxygen > 100', threshold: 100 },
    { name: 'Coin Master 💰', requirement: 'Earn 50 coins', threshold: 50 }
  ];

  const cutTree = () => {
    if (gameState.trees <= 0) {
      toast({
        title: "No trees to cut! 😔",
        description: "Plant some trees first to help our planet grow! 🌱",
        className: "border-destructive"
      });
      return;
    }

    setGameState(prev => ({
      ...prev,
      trees: prev.trees - 1,
      coins: prev.coins + 10,
      oxygen: Math.max(0, prev.oxygen - 5)
    }));

    toast({
      title: "Tree cut! 🪓",
      description: "You earned 10 coins, but oxygen is decreasing! 📉",
      className: "border-yellow-500"
    });
  };

  const plantTree = () => {
    if (gameState.coins < 5) {
      toast({
        title: "Not enough coins! 💰",
        description: "You need 5 coins to plant a tree. Keep trying! 💪",
        className: "border-destructive"
      });
      return;
    }

    setGameState(prev => ({
      ...prev,
      trees: prev.trees + 1,
      coins: prev.coins - 5,
      oxygen: prev.oxygen + 8,
      totalTreesPlanted: prev.totalTreesPlanted + 1
    }));

    toast({
      title: "Great job planting trees! 🌱",
      description: "You're helping save our planet! Earth loves you! 🌍💚",
      className: "border-success"
    });
  };

  // Check for new badges
  useEffect(() => {
    const newBadges = badges.filter(badge => {
      if (gameState.badges.includes(badge.name)) return false;
      
      if (badge.name.includes('Junior Gardener') && gameState.totalTreesPlanted >= 5) return true;
      if (badge.name.includes('Forest Hero') && gameState.totalTreesPlanted >= 10) return true;
      if (badge.name.includes('Earth Saver') && gameState.oxygen >= 100) return true;
      if (badge.name.includes('Coin Master') && gameState.coins >= 50) return true;
      
      return false;
    });

    if (newBadges.length > 0) {
      setGameState(prev => ({
        ...prev,
        badges: [...prev.badges, ...newBadges.map(b => b.name)]
      }));

      newBadges.forEach(badge => {
        toast({
          title: `🎉 New Badge Earned! ${badge.name}`,
          description: `Congratulations! You're amazing! 🌟`,
          className: "border-success"
        });
      });
    }
  }, [gameState.totalTreesPlanted, gameState.oxygen, gameState.coins]);

  // Check for game over conditions
  useEffect(() => {
    if (gameState.oxygen <= 0 || gameState.trees <= 0) {
      toast({
        title: "Earth needs your help! 🌍💙",
        description: "Without trees, our planet suffers. Try again and save the forest! 🌲✨",
        className: "border-primary"
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
      toast({
        title: `Welcome ${loginForm.name}! 🎉`,
        description: "Ready to save the forest? Let's go! 🌲",
        className: "border-success"
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-primary shadow-eco">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🌲</div>
            <CardTitle className="text-3xl font-bold text-primary mb-2">
              Save the Forest! 🌍
            </CardTitle>
            <p className="text-muted-foreground">
              Join the adventure to save our planet! 🌱
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Your Name 😊
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 rounded-lg border-2 border-border focus:border-primary text-lg"
                value={loginForm.name}
                onChange={(e) => setLoginForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Your Class 📚
              </label>
              <select
                className="w-full p-3 rounded-lg border-2 border-border focus:border-primary text-lg"
                value={loginForm.class}
                onChange={(e) => setLoginForm(prev => ({ ...prev, class: e.target.value }))}
              >
                <option value="">Select your class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
              </select>
            </div>
            <Button 
              onClick={login}
              className="w-full text-lg py-6 bg-gradient-eco hover:scale-105 transition-all duration-300"
              size="lg"
            >
              Start Playing! 🚀
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showLeaderboard) {
    return (
      <div className="min-h-screen bg-gradient-subtle p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-primary">🏆 Leaderboard</h1>
            <Button 
              onClick={() => setShowLeaderboard(false)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Back to Game 🎮
            </Button>
          </div>

          <div className="grid gap-4">
            {leaderboard.map((player, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-primary/20">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{player.avatar}</div>
                    <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                    <div>
                      <div className="font-bold text-lg text-card-foreground">{player.name}</div>
                      <div className="text-muted-foreground">{player.class}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">{player.score}</div>
                    <div className="text-sm text-muted-foreground">points</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">🌲 Save the Forest!</h1>
            <p className="text-lg text-muted-foreground">Welcome back, {gameState.playerName} from {gameState.playerClass}! 🎉</p>
          </div>
          <Button 
            onClick={() => setShowLeaderboard(true)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Leaderboard 🏆
          </Button>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-success/30 card-interactive">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">🌲</div>
              <div className="text-3xl font-bold text-success mb-1">{gameState.trees}</div>
              <div className="text-sm text-muted-foreground">Trees in Forest</div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-yellow-500/30 card-interactive">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">💰</div>
              <div className="text-3xl font-bold text-yellow-600 mb-1">{gameState.coins}</div>
              <div className="text-sm text-muted-foreground">Eco Coins</div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-blue-500/30 card-interactive">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">🌍</div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{gameState.oxygen}</div>
              <div className="text-sm text-muted-foreground">Oxygen Level</div>
              <Progress value={Math.min(100, (gameState.oxygen / 100) * 100)} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Forest Visualization */}
        <Card className="bg-white/90 backdrop-blur-sm border-primary/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">🌳 Your Forest 🌳</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-8 bg-gradient-to-b from-blue-50 to-green-50 rounded-lg">
              <div className="text-6xl leading-relaxed">
                {Array.from({ length: Math.max(0, gameState.trees) }, (_, i) => (
                  <span key={i} className="inline-block animate-bounce-gentle" style={{ animationDelay: `${i * 0.2}s` }}>
                    🌲
                  </span>
                ))}
                {gameState.trees === 0 && (
                  <div className="text-4xl text-muted-foreground">
                    🏜️ No trees left! Plant some! 🌱
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Button
            onClick={plantTree}
            disabled={gameState.coins < 5}
            size="lg"
            className="h-24 text-xl bg-gradient-eco hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🌱</div>
              <div>Plant Tree</div>
              <div className="text-sm opacity-90">(Costs 5 coins)</div>
            </div>
          </Button>

          <Button
            onClick={cutTree}
            disabled={gameState.trees <= 0}
            size="lg"
            variant="destructive"
            className="h-24 text-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🪓</div>
              <div>Cut Tree</div>
              <div className="text-sm opacity-90">(+10 coins, -5 oxygen)</div>
            </div>
          </Button>
        </div>

        {/* Badges */}
        <Card className="bg-white/90 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <Award className="w-6 h-6 mr-2" />
              Your Badges 🏅
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge, index) => {
                const earned = gameState.badges.includes(badge.name);
                return (
                  <div key={index} className={`text-center p-4 rounded-lg border-2 transition-all duration-300 ${
                    earned 
                      ? 'border-success bg-success/10 scale-105' 
                      : 'border-muted bg-muted/50 grayscale'
                  }`}>
                    <div className="text-3xl mb-2">{badge.name.split(' ')[1]}</div>
                    <div className="text-sm font-medium">{badge.name.split(' ')[0]} {badge.name.split(' ')[2]}</div>
                    <div className="text-xs text-muted-foreground mt-1">{badge.requirement}</div>
                    {earned && <div className="text-xs text-success font-bold mt-1">✅ Earned!</div>}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <Badge variant="outline" className="text-sm">
                Total Trees Planted: {gameState.totalTreesPlanted} 🌲
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SaveTheForest;