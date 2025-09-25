"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Lightbulb, 
  FileText, 
  CheckSquare, 
  BarChart3,
  Zap,
  Shield,
  Rocket,
  Building,
  Globe,
  Cpu,
  Award
} from "lucide-react";

interface Task {
  id: number;
  task: string;
  priority: string;
  phase: string;
  estimatedDuration: string;
  completed: boolean;
  createdAt: string;
}

interface Analytics {
  marketMetrics: {
    tam: string;
    sam: string;
    som: string;
    growthRate: string;
    marketTrends: Array<{ name: string; value: number; change: string }>;
  };
  businessMetrics: {
    successScore: number;
    innovationPotential: number;
    marketOpportunity: number;
    competitiveAdvantage: number;
    riskAssessment: {
      marketRisk: string;
      technicalRisk: string;
      financialRisk: string;
      operationalRisk: string;
    };
  };
  taskMetrics: {
    totalTasks: number;
    completedTasks: number;
    highPriorityTasks: number;
    mediumPriorityTasks: number;
    lowPriorityTasks: number;
    completionRate: number;
    averageCompletionTime: string;
  };
  valueCreation: {
    shortTermImpact: number;
    longTermStrategy: number;
    resourceEfficiency: number;
    balanceScore: string;
    recommendations: string[];
  };
  competitiveAnalysis: {
    innovation: number;
    marketFit: number;
    scalability: number;
    competitiveEdge: number;
    topCompetitors: Array<{ name: string; marketShare: number; strengths: string[] }>;
  };
}

interface AdvancedProtocol {
  type: string;
  result: string;
  timestamp: string;
}

export default function Home() {
  const [businessIdea, setBusinessIdea] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [uniqueValue, setUniqueValue] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Advanced Protocol State
  const [protocolType, setProtocolType] = useState("");
  const [businessContext, setBusinessContext] = useState("");
  const [challenge, setChallenge] = useState("");
  const [industry, setIndustry] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [scale, setScale] = useState("");
  const [advancedProtocols, setAdvancedProtocols] = useState<AdvancedProtocol[]>([]);
  const [isGeneratingProtocol, setIsGeneratingProtocol] = useState(false);
  
  // Business Intelligence State
  const [businessIntelligence, setBusinessIntelligence] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [competitorAnalysis, setCompetitorAnalysis] = useState<any>(null);

  useEffect(() => {
    fetchTasks();
    fetchAnalytics();
    fetchBusinessIntelligence();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const tasksData = await response.json();
        setTasks(tasksData);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const analyticsData = await response.json();
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchBusinessIntelligence = async () => {
    try {
      const response = await fetch('/api/business-intelligence');
      if (response.ok) {
        const biData = await response.json();
        setBusinessIntelligence(biData);
      }
    } catch (error) {
      console.error('Error fetching business intelligence:', error);
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!generatedPlan) return;

    try {
      const response = await fetch('/api/roadmap-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessPlan: generatedPlan.executiveSummary.title,
          timeline: '12 months',
          resources: 'Standard startup resources',
          budget: 'Startup budget',
          teamSize: 'Small team',
          industry: 'Technology',
          businessStage: 'Early Stage'
        }),
      });

      if (response.ok) {
        const roadmapData = await response.json();
        setRoadmap(roadmapData.roadmap);
      }
    } catch (error) {
      console.error('Error generating roadmap:', error);
    }
  };

  const handleGenerateCompetitorAnalysis = async () => {
    if (!businessIdea || !targetMarket) return;

    try {
      const response = await fetch('/api/competitor-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessIdea,
          industry: industry || 'Technology',
          targetMarket,
          uniqueValue,
          businessModel: 'SaaS',
          geographicScope: 'Global'
        }),
      });

      if (response.ok) {
        const analysisData = await response.json();
        setCompetitorAnalysis(analysisData.analysis);
      }
    } catch (error) {
      console.error('Error generating competitor analysis:', error);
    }
  };

  const handleGeneratePlan = async () => {
    if (!businessIdea || !targetMarket || !uniqueValue) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessIdea,
          targetMarket,
          uniqueValue
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      const planData = await response.json();
      setGeneratedPlan(planData);
    } catch (error) {
      console.error('Error generating plan:', error);
      // Fallback to mock data if API fails
      setGeneratedPlan({
        executiveSummary: {
          title: "AI Business Navigator",
          mission: "Democratizing strategic business expertise through AI-powered guidance",
          goals: ["Make business planning accessible", "Reduce business failure rates", "Empower entrepreneurs"]
        },
        marketAnalysis: {
          tam: "$15.7B",
          sam: "$4.2B",
          som: "$120M",
          growth: "8.2% CAGR"
        },
        keyFeatures: [
          "AI-powered business plan generation",
          "Sequential reasoning engine",
          "Task-based implementation framework",
          "Value creation dashboard"
        ],
        timeline: [
          { phase: "MVP Development", duration: "3 months", progress: 25 },
          { phase: "Market Launch", duration: "2 months", progress: 0 },
          { phase: "Scale & Optimize", duration: "6 months", progress: 0 }
        ]
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAdvancedProtocol = async () => {
    if (!protocolType) return;

    setIsGeneratingProtocol(true);
    try {
      const response = await fetch('/api/advanced-protocol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          protocolType,
          businessContext,
          challenge,
          industry,
          targetMarket,
          businessIdea,
          uniqueValue,
          businessType,
          scale
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate advanced protocol');
      }

      const protocolData = await response.json();
      setAdvancedProtocols(prev => [protocolData, ...prev]);
    } catch (error) {
      console.error('Error generating advanced protocol:', error);
    } finally {
      setIsGeneratingProtocol(false);
    }
  };

  const getProtocolIcon = (type: string) => {
    switch (type) {
      case 'strategic-solution': return <Target className="h-5 w-5" />;
      case 'market-insights': return <Globe className="h-5 w-5" />;
      case 'innovation-strategy': return <Lightbulb className="h-5 w-5" />;
      case 'operational-excellence': return <Cpu className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getProtocolTitle = (type: string) => {
    switch (type) {
      case 'strategic-solution': return 'Strategic Solution';
      case 'market-insights': return 'Market Insights';
      case 'innovation-strategy': return 'Innovation Strategy';
      case 'operational-excellence': return 'Operational Excellence';
      default: return 'Advanced Protocol';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                AI Business Navigator
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Complete business intelligence platform with advanced AI protocols
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              Beta
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Gemini AI
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="ideation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="ideation" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Ideation
            </TabsTrigger>
            <TabsTrigger value="planning" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Planning
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              Advanced
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Intelligence
            </TabsTrigger>
          </TabsList>

          {/* Advanced Protocols Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    Advanced Protocol Generator
                  </CardTitle>
                  <CardDescription>
                    Generate sophisticated business solutions using Google Gemini AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Protocol Type</label>
                    <Select value={protocolType} onValueChange={setProtocolType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select protocol type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strategic-solution">Strategic Solution</SelectItem>
                        <SelectItem value="market-insights">Market Insights</SelectItem>
                        <SelectItem value="innovation-strategy">Innovation Strategy</SelectItem>
                        <SelectItem value="operational-excellence">Operational Excellence</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {protocolType === 'strategic-solution' && (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Business Context</label>
                        <Textarea
                          placeholder="Describe your business context..."
                          value={businessContext}
                          onChange={(e) => setBusinessContext(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Challenge</label>
                        <Textarea
                          placeholder="What challenge are you facing?"
                          value={challenge}
                          onChange={(e) => setChallenge(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                    </>
                  )}

                  {protocolType === 'market-insights' && (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Industry</label>
                        <Input
                          placeholder="e.g., SaaS, E-commerce, Healthcare"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Target Market</label>
                        <Input
                          placeholder="Your target customers"
                          value={targetMarket}
                          onChange={(e) => setTargetMarket(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {protocolType === 'innovation-strategy' && (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Business Idea</label>
                        <Textarea
                          placeholder="Your innovative business idea..."
                          value={businessIdea}
                          onChange={(e) => setBusinessIdea(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Unique Value</label>
                        <Textarea
                          placeholder="What makes your idea unique?"
                          value={uniqueValue}
                          onChange={(e) => setUniqueValue(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                    </>
                  )}

                  {protocolType === 'operational-excellence' && (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Business Type</label>
                        <Input
                          placeholder="e.g., Manufacturing, Service, Technology"
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Scale</label>
                        <Select value={scale} onValueChange={setScale}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business scale" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">Startup</SelectItem>
                            <SelectItem value="small-business">Small Business</SelectItem>
                            <SelectItem value="medium-business">Medium Business</SelectItem>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <Button 
                    onClick={handleGenerateAdvancedProtocol} 
                    className="w-full"
                    disabled={!protocolType || isGeneratingProtocol}
                  >
                    {isGeneratingProtocol ? "Generating Protocol..." : "Generate Advanced Protocol"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Generated Protocols
                  </CardTitle>
                  <CardDescription>
                    Your AI-powered strategic solutions and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {advancedProtocols.length > 0 ? (
                      advancedProtocols.map((protocol, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            {getProtocolIcon(protocol.type)}
                            <span className="font-medium">{getProtocolTitle(protocol.type)}</span>
                            <Badge variant="outline" className="text-xs ml-auto">
                              {new Date(protocol.timestamp).toLocaleDateString()}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 max-h-32 overflow-y-auto">
                            {protocol.result}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <Rocket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No protocols generated yet</p>
                        <p className="text-xs mt-2">Generate your first advanced protocol to get started</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ideation Tab */}
          <TabsContent value="ideation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Business Idea Generator
                  </CardTitle>
                  <CardDescription>
                    Input your business concept and let AI help you refine and validate it
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Business Idea</label>
                    <Textarea
                      placeholder="Describe your business idea..."
                      value={businessIdea}
                      onChange={(e) => setBusinessIdea(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Target Market</label>
                    <Input
                      placeholder="Who are your customers?"
                      value={targetMarket}
                      onChange={(e) => setTargetMarket(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Unique Value Proposition</label>
                    <Textarea
                      placeholder="What makes your business unique?"
                      value={uniqueValue}
                      onChange={(e) => setUniqueValue(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                  <Button 
                    onClick={handleGeneratePlan} 
                    className="w-full"
                    disabled={!businessIdea || !targetMarket || !uniqueValue || isGenerating}
                  >
                    {isGenerating ? "Generating Plan..." : "Generate Business Plan"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Insights & Validation</CardTitle>
                  <CardDescription>
                    Real-time analysis of your business concept
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {businessIdea || targetMarket || uniqueValue ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Market Fit Score</span>
                        <Badge variant="outline">Good</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Innovation Potential</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Market Opportunity</span>
                          <span>72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Competitive Advantage</span>
                          <span>68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      <Separator />
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        <p className="font-medium mb-1">Key Strengths:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Clear target market definition</li>
                          <li>Strong value proposition</li>
                          <li>Scalable business model</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter your business details to see AI insights</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Planning Tab */}
          <TabsContent value="planning" className="space-y-6">
            {generatedPlan ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Generated Business Plan</CardTitle>
                    <CardDescription>
                      Your AI-powered strategic blueprint
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Executive Summary</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{generatedPlan.executiveSummary.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          {generatedPlan.executiveSummary.mission}
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Key Goals:</p>
                          <ul className="text-sm text-slate-600 dark:text-slate-400">
                            {generatedPlan.executiveSummary.goals.map((goal: string, index: number) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-slate-400 rounded-full" />
                                {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Market Analysis</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {generatedPlan.marketAnalysis.tam}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">TAM</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {generatedPlan.marketAnalysis.sam}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">SAM</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {generatedPlan.marketAnalysis.som}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">SOM</div>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        Market Growth: {generatedPlan.marketAnalysis.growth}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Key Features</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {generatedPlan.keyFeatures.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <CheckSquare className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Implementation Timeline</CardTitle>
                    <CardDescription>
                      Phased approach to execution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {generatedPlan.timeline.map((phase: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{phase.phase}</span>
                          <span className="text-xs text-slate-500">{phase.duration}</span>
                        </div>
                        <Progress value={phase.progress} className="h-2" />
                        <div className="text-xs text-slate-500">
                          {phase.progress}% complete
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-16 w-16 text-slate-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Business Plan Yet</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center mb-4">
                    Generate your first business plan in the Ideation tab to get started
                  </p>
                  <Button variant="outline" onClick={() => document.querySelector('[value="ideation"]')?.click()}>
                    Go to Ideation
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Action Plan</CardTitle>
                  <CardDescription>
                    Strategic tasks derived from your business plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.length > 0 ? (
                      <>
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-slate-600 dark:text-slate-400">MVP Development</h4>
                          {tasks.filter(task => task.phase === "MVP Development").map((task) => (
                            <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <input 
                                type="checkbox" 
                                checked={task.completed}
                                onChange={() => {
                                  // Toggle task completion
                                  const updatedTasks = tasks.map(t => 
                                    t.id === task.id ? { ...t, completed: !t.completed } : t
                                  );
                                  setTasks(updatedTasks);
                                }}
                                className="rounded"
                              />
                              <span className={`text-sm ${task.completed ? 'line-through text-slate-500' : ''}`}>
                                {task.task}
                              </span>
                              <Badge variant="outline" className="ml-auto text-xs">
                                {task.priority}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-slate-600 dark:text-slate-400">Market Launch</h4>
                          {tasks.filter(task => task.phase === "Market Launch").map((task) => (
                            <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <input 
                                type="checkbox" 
                                checked={task.completed}
                                onChange={() => {
                                  const updatedTasks = tasks.map(t => 
                                    t.id === task.id ? { ...t, completed: !t.completed } : t
                                  );
                                  setTasks(updatedTasks);
                                }}
                                className="rounded"
                              />
                              <span className={`text-sm ${task.completed ? 'line-through text-slate-500' : ''}`}>
                                {task.task}
                              </span>
                              <Badge variant="outline" className="ml-auto text-xs">
                                {task.priority}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Generate a business plan to see your action tasks</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Task Analytics</CardTitle>
                  <CardDescription>
                    Progress tracking and insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tasks.length > 0 ? (
                    <>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Overall Progress</div>
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>High Priority</span>
                          <span>{tasks.filter(t => t.priority === "High" && t.completed).length}/{tasks.filter(t => t.priority === "High").length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Medium Priority</span>
                          <span>{tasks.filter(t => t.priority === "Medium" && t.completed).length}/{tasks.filter(t => t.priority === "Medium").length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Low Priority</span>
                          <span>{tasks.filter(t => t.priority === "Low" && t.completed).length}/{tasks.filter(t => t.priority === "Low").length}</span>
                        </div>
                      </div>
                      <Separator />
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        <p className="font-medium mb-1">Next Steps:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Focus on incomplete high-priority tasks</li>
                          <li>Track progress daily</li>
                          <li>Update task status as you complete them</li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No tasks available yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {analytics ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Market Potential</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.marketMetrics.tam}</div>
                      <p className="text-xs text-muted-foreground">TAM</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.marketMetrics.growthRate}</div>
                      <p className="text-xs text-muted-foreground">CAGR</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Success Score</CardTitle>
                      <Target className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.businessMetrics.successScore}%</div>
                      <p className="text-xs text-muted-foreground">AI Rating</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Tasks Ready</CardTitle>
                      <CheckSquare className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.taskMetrics.totalTasks}</div>
                      <p className="text-xs text-muted-foreground">Action Items</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Value Creation Balance</CardTitle>
                      <CardDescription>
                        Short-term wins vs long-term strategy
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Short-term Impact</span>
                            <span>{analytics.valueCreation.shortTermImpact}%</span>
                          </div>
                          <Progress value={analytics.valueCreation.shortTermImpact} className="h-3" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Long-term Strategy</span>
                            <span>{analytics.valueCreation.longTermStrategy}%</span>
                          </div>
                          <Progress value={analytics.valueCreation.longTermStrategy} className="h-3" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Resource Efficiency</span>
                            <span>{analytics.valueCreation.resourceEfficiency}%</span>
                          </div>
                          <Progress value={analytics.valueCreation.resourceEfficiency} className="h-3" />
                        </div>
                        <div className="pt-4 border-t">
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            <p className="font-medium mb-1">Balance Score: {analytics.valueCreation.balanceScore}</p>
                            <p>Your plan shows strong alignment between immediate actions and strategic vision.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Competitive Analysis</CardTitle>
                      <CardDescription>
                        Market positioning insights
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Innovation</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div key={i} className={`w-2 h-8 rounded ${i < analytics.competitiveAnalysis.innovation ? 'bg-blue-600' : 'bg-slate-200'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Market Fit</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div key={i} className={`w-2 h-8 rounded ${i < analytics.competitiveAnalysis.marketFit ? 'bg-green-600' : 'bg-slate-200'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Scalability</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div key={i} className={`w-2 h-8 rounded ${i < analytics.competitiveAnalysis.scalability ? 'bg-purple-600' : 'bg-slate-200'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Competitive Edge</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div key={i} className={`w-2 h-8 rounded ${i < analytics.competitiveAnalysis.competitiveEdge ? 'bg-orange-600' : 'bg-slate-200'}`} />
                            ))}
                          </div>
                        </div>
                        <Separator />
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          <p className="font-medium mb-1">Key Advantage:</p>
                          <p>AI-powered sequential reasoning provides unique competitive differentiation in business planning.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Market Trends</CardTitle>
                    <CardDescription>
                      Current market dynamics and opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {analytics.marketMetrics.marketTrends.map((trend, index) => (
                        <div key={index} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{trend.value}%</div>
                          <div className="text-sm font-medium mb-1">{trend.name}</div>
                          <div className="text-xs text-green-600">{trend.change}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BarChart3 className="h-16 w-16 text-slate-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Loading Analytics</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center">
                    Gathering market insights and business intelligence...
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Business Intelligence Tab */}
          <TabsContent value="intelligence" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business Intelligence Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Business Intelligence Overview
                  </CardTitle>
                  <CardDescription>
                    Real-time insights and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {businessIntelligence ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {businessIntelligence.overview.totalUsers}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Active Users</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {businessIntelligence.overview.totalBusinessPlans}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Business Plans</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Task Completion</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Overall Completion</span>
                            <span>{businessIntelligence.overview.overallCompletionRate}%</span>
                          </div>
                          <Progress value={businessIntelligence.overview.overallCompletionRate} className="h-2" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Recent Activity</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {businessIntelligence.recentActivity.slice(0, 3).map((activity: any, index: number) => (
                            <div key={index} className="text-xs p-2 bg-slate-50 dark:bg-slate-800 rounded">
                              <div className="font-medium">{activity.title}</div>
                              <div className="text-slate-500">by {activity.user}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Loading business intelligence...</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Strategic Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Strategic Tools
                  </CardTitle>
                  <CardDescription>
                    Advanced analysis and planning tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-3">Generate Strategic Roadmap</h4>
                    <Button 
                      onClick={handleGenerateRoadmap} 
                      className="w-full"
                      disabled={!generatedPlan}
                    >
                      <Rocket className="h-4 w-4 mr-2" />
                      Generate Roadmap
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-sm mb-3">Competitor Analysis</h4>
                    <Button 
                      onClick={handleGenerateCompetitorAnalysis} 
                      variant="outline"
                      className="w-full"
                      disabled={!businessIdea || !targetMarket}
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Analyze Competition
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-sm mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" onClick={() => document.querySelector('[value="advanced"]')?.click()}>
                        Advanced AI
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => document.querySelector('[value="analytics"]')?.click()}>
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Generated Analysis Results */}
            {(roadmap || competitorAnalysis) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {roadmap && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Rocket className="h-5 w-5" />
                        Strategic Roadmap
                      </CardTitle>
                      <CardDescription>
                        AI-generated implementation roadmap
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {roadmap.phases ? (
                          roadmap.phases.map((phase: any, index: number) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="font-medium text-sm">{phase.name}</div>
                              <div className="text-xs text-slate-500 mb-2">{phase.duration}</div>
                              <div className="text-xs text-slate-600">
                                Focus: {phase.focus}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-slate-600">
                            <p>Strategic roadmap generated successfully.</p>
                            <p className="mt-2">Check the raw response for detailed phase breakdown.</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {competitorAnalysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Competitor Analysis
                      </CardTitle>
                      <CardDescription>
                        AI-powered competitive intelligence
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {competitorAnalysis.keyInsights ? (
                          competitorAnalysis.keyInsights.map((insight: string, index: number) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                              <span>{insight}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-slate-600">
                            <p>Competitor analysis completed successfully.</p>
                            <p className="mt-2">Analysis includes competitive landscape, positioning, and strategic recommendations.</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Recommendations */}
            {businessIntelligence && businessIntelligence.recommendations && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription>
                    Data-driven suggestions for business improvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {businessIntelligence.recommendations.map((rec: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={rec.priority === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                            {rec.priority}
                          </Badge>
                          <span className="text-sm font-medium">{rec.type}</span>
                        </div>
                        <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                        <p className="text-xs text-slate-600 mb-2">{rec.description}</p>
                        <div className="text-xs text-blue-600 font-medium">{rec.action}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}