import { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, MessageSquare, Download, Share2, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AnalysisResult {
  tldr: string;
  healthScore: number;
  clauses: Array<{
    id: string;
    text: string;
    summary: string;
    risk: "Green" | "Yellow" | "Red";
    category: string;
  }>;
  negotiation: string;
  impact: string;
}

interface ResultsDashboardProps {
  result: AnalysisResult;
}

const ResultsDashboard = ({ result }: ResultsDashboardProps) => {
  const [selectedClause, setSelectedClause] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"overview" | "clauses" | "chat">("overview");

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Green": return "text-success border-success/30 bg-success/10";
      case "Yellow": return "text-warning border-warning/30 bg-warning/10";
      case "Red": return "text-destructive border-destructive/30 bg-destructive/10";
      default: return "text-legal-text-muted border-border bg-card";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "Green": return <CheckCircle className="w-4 h-4" />;
      case "Yellow": return <AlertTriangle className="w-4 h-4" />;
      case "Red": return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-legal-text-primary">Document Analysis</h1>
            <p className="text-legal-text-secondary">AI-powered legal document breakdown and insights</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="legal" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Top Section - TL;DR and Health Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <Card className="lg:col-span-2 p-6 bg-gradient-card">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-legal-accent" />
                <h3 className="text-xl font-semibold text-legal-text-primary">Quick Summary</h3>
              </div>
              <p className="text-legal-text-secondary leading-relaxed">{result.tldr}</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card text-center">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-legal-text-primary">Document Health Score</h3>
              
              <div className="relative">
                <div className="mx-auto w-24 h-24 rounded-full border-4 border-border flex items-center justify-center">
                  <span className={`text-2xl font-bold ${getHealthScoreColor(result.healthScore)}`}>
                    {result.healthScore}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-full" 
                     style={{
                       background: `conic-gradient(hsl(var(--legal-accent)) ${result.healthScore * 3.6}deg, hsl(var(--border)) 0deg)`
                     }}
                />
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-legal-text-muted">Overall Risk Assessment</p>
                <Badge className={getRiskColor(result.healthScore >= 80 ? "Green" : result.healthScore >= 60 ? "Yellow" : "Red")}>
                  {result.healthScore >= 80 ? "Low Risk" : result.healthScore >= 60 ? "Medium Risk" : "High Risk"}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 bg-legal-dark rounded-lg p-1">
          {[
            { id: "overview", label: "Overview" },
            { id: "clauses", label: "Clause Analysis" },
            { id: "chat", label: "Q&A Chat" }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={viewMode === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode(tab.id as any)}
              className="flex-1"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content Based on View Mode */}
        {viewMode === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <Card className="p-6 bg-gradient-card">
              <h3 className="text-lg font-semibold text-legal-text-primary mb-4">Key Insights</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-legal-dark/50">
                  <h4 className="font-medium text-legal-accent mb-2">What This Means for You</h4>
                  <p className="text-legal-text-secondary text-sm">{result.impact}</p>
                </div>
                
                <div className="p-4 rounded-lg bg-legal-dark/50">
                  <h4 className="font-medium text-legal-accent mb-2">Negotiation Suggestions</h4>
                  <p className="text-legal-text-secondary text-sm">{result.negotiation}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <h3 className="text-lg font-semibold text-legal-text-primary mb-4">Risk Breakdown</h3>
              <div className="space-y-3">
                {["Green", "Yellow", "Red"].map((risk) => {
                  const count = result.clauses.filter(c => c.risk === risk).length;
                  const percentage = (count / result.clauses.length) * 100;
                  
                  return (
                    <div key={risk} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={`flex items-center space-x-2 ${getRiskColor(risk).split(' ')[0]}`}>
                          {getRiskIcon(risk)}
                          <span>{risk === "Green" ? "Safe" : risk === "Yellow" ? "Caution" : "High Risk"}</span>
                        </span>
                        <span className="text-legal-text-muted">{count} clauses ({percentage.toFixed(0)}%)</span>
                      </div>
                      <Progress 
                        value={percentage} 
                        className={`h-2 ${getRiskColor(risk).includes('success') ? '[&>div]:bg-success' : 
                                          getRiskColor(risk).includes('warning') ? '[&>div]:bg-warning' : 
                                          '[&>div]:bg-destructive'}`} 
                      />
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {viewMode === "clauses" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Clauses List */}
            <Card className="lg:col-span-1 p-4 bg-gradient-card">
              <h3 className="text-lg font-semibold text-legal-text-primary mb-4">Clauses</h3>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {result.clauses.map((clause) => (
                    <div
                      key={clause.id}
                      onClick={() => setSelectedClause(clause.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedClause === clause.id 
                          ? "bg-legal-accent/20 border border-legal-accent/30" 
                          : "bg-legal-dark/50 hover:bg-legal-dark border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {clause.category}
                        </Badge>
                        <div className={`flex items-center space-x-1 ${getRiskColor(clause.risk)}`}>
                          {getRiskIcon(clause.risk)}
                        </div>
                      </div>
                      <p className="text-sm text-legal-text-secondary line-clamp-2">
                        {clause.text.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Selected Clause Details */}
            <Card className="lg:col-span-2 p-6 bg-gradient-card">
              {selectedClause ? (
                <div className="space-y-6">
                  {(() => {
                    const clause = result.clauses.find(c => c.id === selectedClause);
                    if (!clause) return null;
                    
                    return (
                      <>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-legal-text-primary">Clause Analysis</h3>
                          <Badge className={getRiskColor(clause.risk)}>
                            {getRiskIcon(clause.risk)}
                            <span className="ml-1">{clause.risk} Risk</span>
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-legal-accent mb-2">Original Text</h4>
                            <div className="p-4 rounded-lg bg-legal-dark/30 border border-border">
                              <p className="text-legal-text-secondary text-sm leading-relaxed">
                                {clause.text}
                              </p>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h4 className="font-medium text-legal-accent mb-2">Simplified Summary</h4>
                            <div className="p-4 rounded-lg bg-legal-accent/5 border border-legal-accent/20">
                              <p className="text-legal-text-primary text-sm leading-relaxed">
                                {clause.summary}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-legal-text-muted mx-auto mb-4" />
                  <p className="text-legal-text-muted">Select a clause to see detailed analysis</p>
                </div>
              )}
            </Card>
          </div>
        )}

        {viewMode === "chat" && (
          <Card className="p-6 bg-gradient-card">
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-legal-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-legal-text-primary mb-2">Q&A Chat</h3>
              <p className="text-legal-text-muted mb-6">Ask questions about your document and get instant AI-powered answers</p>
              <Button variant="hero">
                Start Chat Session
              </Button>
            </div>
          </Card>
        )}

        {/* Footer Disclaimer */}
        <Card className="p-4 bg-warning/10 border-warning/30">
          <p className="text-center text-sm text-warning-foreground">
            <strong>Legal Disclaimer:</strong> This analysis is for informational purposes only and is not a substitute for professional legal advice. 
            Always consult with a qualified attorney for legal matters.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDashboard;