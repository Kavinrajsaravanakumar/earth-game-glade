import { Button } from "@/components/ui/button";
import { Play, ArrowRight, TreePine, Award, Users } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="Environmental education background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        <div className="absolute inset-0 bg-background/20"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="badge-eco">
          <TreePine className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: "1s" }}>
        <div className="badge-eco">
          <Award className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: "2s" }}>
        <div className="badge-eco">
          <Users className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full text-accent font-medium text-sm">
            <Award className="w-4 h-4 mr-2" />
            Gamified Learning Platform
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold font-lato leading-tight">
            <span className="text-primary-foreground">Learn to Save</span>
            <br />
            <span className="bg-gradient-eco bg-clip-text text-transparent animate-glow">
              Our Planet
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of learners in our gamified environmental education platform. 
            Earn badges, track progress, and make a real impact on the world.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-primary-foreground/80">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">50K+</div>
              <div className="text-sm uppercase tracking-wider">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">200+</div>
              <div className="text-sm uppercase tracking-wider">Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">95%</div>
              <div className="text-sm uppercase tracking-wider">Success Rate</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="lg" className="group">
              Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-background/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-background/20">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;