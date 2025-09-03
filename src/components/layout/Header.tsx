import { Scale, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-legal-text-primary">ClearClause</h1>
            <p className="text-xs text-legal-text-muted">Contracts Made Simple</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-legal-text-secondary hover:text-legal-accent transition-colors">
            Features
          </a>
          <a href="#about" className="text-legal-text-secondary hover:text-legal-accent transition-colors">
            About
          </a>
          <a href="#contact" className="text-legal-text-secondary hover:text-legal-accent transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="legal" size="sm" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;