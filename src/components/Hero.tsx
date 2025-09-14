import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  ArrowRight, 
  TreePine, 
  Award, 
  Users, 
  Leaf, 
  Trophy, 
  Target,
  BookOpen,
  Star,
  ChevronRight,
  Zap
} from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 pt-16">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top Navigation Stats */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-gray-600">Live Users: 12,450</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-600">Rewards Available</span>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
            <Leaf className="w-4 h-4 mr-2" />
            Environmental Education App
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Learn. Play. 
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Save the Planet
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform environmental learning into an exciting adventure. 
            Earn points, unlock achievements, and make a real difference for our planet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
              onClick={() => window.location.href = '/get-started'}
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-3">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Gamified Learning Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <TreePine className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gamified Learning</h3>
              <p className="text-gray-600 text-sm mb-4">
                Turn education into adventure with points, levels, and eco-achievements.
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">50+ Games</Badge>
                <ChevronRight className="w-4 h-4 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-cyan-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600 text-sm mb-4">
                Monitor your environmental impact with detailed analytics and insights.
              </p>
              <Progress value={75} className="mb-2" />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Progress: 75%</span>
                <span>Level 8</span>
              </div>
            </CardContent>
          </Card>

          {/* Rewards System Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-yellow-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Earn Rewards</h3>
              <p className="text-gray-600 text-sm mb-4">
                Unlock eco-badges, certificates, and real-world environmental rewards.
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">100+ Badges</Badge>
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Showcase */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-700">
                <Trophy className="w-4 h-4 mr-2" />
                Your Achievements
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Track Your Environmental Impact
              </h2>
              <p className="text-gray-600 mb-6">
                See your learning progress and environmental contributions in real-time.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <TreePine className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900">Tree Planter</span>
                      <span className="text-sm text-gray-500">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900">Energy Saver</span>
                      <span className="text-sm text-gray-500">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-500 p-6 rounded-xl text-white text-center">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">12.4K</div>
                <div className="text-sm opacity-90">Active Learners</div>
              </div>
              <div className="bg-cyan-500 p-6 rounded-xl text-white text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm opacity-90">Lessons</div>
              </div>
              <div className="bg-yellow-500 p-6 rounded-xl text-white text-center">
                <Award className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">2.3K</div>
                <div className="text-sm opacity-90">Badges Earned</div>
              </div>
              <div className="bg-purple-500 p-6 rounded-xl text-white text-center">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;