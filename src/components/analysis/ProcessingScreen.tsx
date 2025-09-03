import { Scale, Brain, FileCheck, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface ProcessingScreenProps {
  progress: number;
  currentStep: string;
}

const ProcessingScreen = ({ progress, currentStep }: ProcessingScreenProps) => {
  const steps = [
    { icon: FileCheck, label: "Parsing Document", description: "Reading and structuring your legal document" },
    { icon: Brain, label: "AI Analysis", description: "Analyzing clauses and identifying risks" },
    { icon: Shield, label: "Risk Assessment", description: "Evaluating legal implications and risks" },
    { icon: Scale, label: "Generating Report", description: "Creating your personalized analysis" }
  ];

  const currentStepIndex = steps.findIndex(step => step.label === currentStep);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        
        {/* Main Processing Card */}
        <Card className="p-8 text-center bg-gradient-card border-legal-accent/20">
          <div className="space-y-6">
            
            {/* Animated Logo */}
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse">
              <Scale className="w-10 h-10 text-white animate-bounce" />
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-legal-text-primary">
                Analyzing Your Document
              </h2>
              <p className="text-legal-text-secondary text-lg">
                Our AI is reviewing your legal document with precision
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-legal-text-secondary">Processing...</span>
                <span className="text-legal-accent font-medium">{progress}%</span>
              </div>
            </div>

            {/* Current Step */}
            <div className="p-4 rounded-lg bg-legal-dark/50 border border-legal-accent/10">
              <p className="text-legal-accent font-medium">{currentStep}</p>
              {steps[currentStepIndex] && (
                <p className="text-sm text-legal-text-muted mt-1">
                  {steps[currentStepIndex].description}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Processing Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;
            
            return (
              <Card 
                key={step.label}
                className={`p-4 transition-all duration-500 ${
                  isCompleted 
                    ? "bg-success/10 border-success/30" 
                    : isActive 
                    ? "bg-legal-accent/10 border-legal-accent/30 shadow-glow" 
                    : "bg-gradient-card border-border"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isCompleted 
                      ? "bg-success/20 text-success" 
                      : isActive 
                      ? "bg-legal-accent/20 text-legal-accent" 
                      : "bg-legal-dark text-legal-text-muted"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      isCompleted || isActive 
                        ? "text-legal-text-primary" 
                        : "text-legal-text-muted"
                    }`}>
                      {step.label}
                    </h4>
                    <p className="text-sm text-legal-text-muted">
                      {step.description}
                    </p>
                  </div>
                  {isCompleted && (
                    <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                      <FileCheck className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-2">
          <p className="text-legal-text-muted text-sm">
            This usually takes 30-60 seconds depending on document size
          </p>
          <p className="text-legal-text-muted text-xs">
            Your document is processed securely and not stored on our servers
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;