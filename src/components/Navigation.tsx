import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, Award, BookOpen, Users, Mail } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: Leaf },
    { name: "Features", path: "/features", icon: Award },
    { name: "About", path: "/about", icon: BookOpen },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-emerald-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              EcoLearn
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-emerald-50 ${
                    isActive 
                      ? "text-emerald-600 font-medium bg-emerald-50" 
                      : "text-gray-600 hover:text-emerald-600"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}
            <Button className="ml-4 bg-emerald-600 hover:bg-emerald-700 text-white" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg mt-2 border border-emerald-100 shadow-lg">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "text-emerald-600 font-medium bg-emerald-50" 
                        : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
              <div className="pt-2">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" size="sm">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;