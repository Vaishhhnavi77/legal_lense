import { useState } from "react";
import Header from "@/components/layout/Header";
import FileUpload from "@/components/upload/FileUpload";
import ProcessingScreen from "@/components/analysis/ProcessingScreen";
import ResultsDashboard from "@/components/analysis/ResultsDashboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-legal.jpg";

// Mock data for demo
const mockAnalysisResult = {
  tldr: "This rental agreement contains several standard clauses with moderate risk factors. The landlord retains significant rights for property access and early termination. Security deposit terms are favorable, but late payment penalties are quite high.",
  healthScore: 72,
  clauses: [
    {
      id: "1",
      text: "Tenant must provide one (1) month written notice prior to vacating the premises. Failure to provide adequate notice will result in forfeiture of security deposit.",
      summary: "You need to give 1 month notice before leaving, or you'll lose your security deposit.",
      risk: "Yellow" as const,
      category: "Termination"
    },
    {
      id: "2", 
      text: "Landlord may enter the premises at any time for inspection, repairs, or showing to prospective tenants without prior notice.",
      summary: "Landlord can enter your apartment anytime without warning - this is unusual and risky.",
      risk: "Red" as const,
      category: "Privacy Rights"
    },
    {
      id: "3",
      text: "Security deposit of $2,500 will be returned within 30 days of lease termination, minus any damages or unpaid rent.",
      summary: "Standard security deposit terms - you'll get it back if there's no damage or unpaid rent.",
      risk: "Green" as const,
      category: "Security Deposit"
    },
    {
      id: "4",
      text: "Late rent payments will incur a fee of $150 plus 2% interest per day until paid in full.",
      summary: "Very high late fees - $150 plus daily interest can add up quickly.",
      risk: "Red" as const,
      category: "Payment Terms"
    }
  ],
  negotiation: "Request 2-week notice instead of 1 month. Demand 24-hour notice for landlord entry except emergencies. Negotiate lower late fees.",
  impact: "Early termination could cost you $2,500 security deposit. High late fees mean even 1 day late could cost $150+ extra."
};

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "processing" | "results">("landing");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Parsing Document");

  const handleFileUpload = (file: File) => {
    // Simulate upload process
    setCurrentView("processing");
    
    const steps = ["Parsing Document", "AI Analysis", "Risk Assessment", "Generating Report"];
    let stepIndex = 0;
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      setProcessingProgress(Math.min(progress, 100));
      
      if (progress > 25 * (stepIndex + 1) && stepIndex < steps.length - 1) {
        stepIndex++;
        setCurrentStep(steps[stepIndex]);
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentView("results");
        }, 1000);
      }
    }, 800);
  };

  const resetToLanding = () => {
    setCurrentView("landing");
    setUploadProgress(0);
    setProcessingProgress(0);
    setCurrentStep("Parsing Document");
  };

  if (currentView === "processing") {
    return <ProcessingScreen progress={processingProgress} currentStep={currentStep} />;
  }

  if (currentView === "results") {
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <Button variant="outline" onClick={resetToLanding}>
            ← New Analysis
          </Button>
        </div>
        <ResultsDashboard result={mockAnalysisResult} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-legal-text-primary leading-tight">
                Understand Legal
                <span className="text-transparent bg-gradient-primary bg-clip-text"> Documents</span>
                <br />in Seconds
              </h1>
              <p className="text-xl md:text-2xl text-legal-text-secondary max-w-2xl mx-auto leading-relaxed">
                Upload your contract, get AI-powered summaries, risk alerts, and negotiation insights instantly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button variant="hero" size="lg" className="px-8 py-4 text-lg">
                Start Free Analysis
              </Button>
              <Button variant="legal" size="lg" className="px-8 py-4 text-lg">
                View Demo
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-legal-text-muted">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>No Registration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-legal-text-primary mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-legal-text-secondary text-lg max-w-2xl mx-auto">
              Our AI analyzes your legal documents and provides clear, actionable insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { step: "01", title: "Upload Document", desc: "Drag & drop your PDF or Word file" },
              { step: "02", title: "AI Analysis", desc: "Our AI reviews every clause and identifies risks" },
              { step: "03", title: "Get Insights", desc: "Receive summary, risk assessment & negotiation tips" }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center bg-gradient-card hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-primary text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-legal-text-primary mb-2">{item.title}</h3>
                <p className="text-legal-text-secondary">{item.desc}</p>
              </Card>
            ))}
          </div>

          <FileUpload 
            onFileUpload={handleFileUpload}
            isUploading={false}
            uploadProgress={uploadProgress}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <p className="text-sm text-legal-text-muted">
              <strong>Legal Disclaimer:</strong> ClearClause provides AI-powered document analysis for informational purposes only. 
              This service is not a substitute for professional legal advice. Always consult with a qualified attorney for legal matters.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-legal-text-muted">
              <a href="#" className="hover:text-legal-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-legal-accent transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-legal-accent transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
