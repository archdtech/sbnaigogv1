import { NextRequest, NextResponse } from 'next/server';

// GET /api/analytics - Retrieve analytics data
export async function GET(request: NextRequest) {
  try {
    // Mock analytics data
    const analyticsData = {
      marketMetrics: {
        tam: "$15.7B",
        sam: "$4.2B",
        som: "$120M",
        growthRate: "8.2%",
        marketTrends: [
          { name: "AI Adoption", value: 45, change: "+12%" },
          { name: "Remote Work", value: 74, change: "+8%" },
          { name: "Digital Transformation", value: 67, change: "+15%" }
        ]
      },
      businessMetrics: {
        successScore: 75,
        innovationPotential: 85,
        marketOpportunity: 72,
        competitiveAdvantage: 68,
        riskAssessment: {
          marketRisk: "Medium",
          technicalRisk: "Low",
          financialRisk: "Medium",
          operationalRisk: "Low"
        }
      },
      taskMetrics: {
        totalTasks: 10,
        completedTasks: 0,
        highPriorityTasks: 5,
        mediumPriorityTasks: 5,
        lowPriorityTasks: 0,
        completionRate: 0,
        averageCompletionTime: "0 days"
      },
      valueCreation: {
        shortTermImpact: 65,
        longTermStrategy: 80,
        resourceEfficiency: 70,
        balanceScore: "Good",
        recommendations: [
          "Focus on high-priority tasks first",
          "Allocate more resources to long-term strategy",
          "Monitor market trends regularly",
          "Build competitive differentiation"
        ]
      },
      competitiveAnalysis: {
        innovation: 4,
        marketFit: 4,
        scalability: 5,
        competitiveEdge: 3,
        topCompetitors: [
          { name: "Competitor A", marketShare: 25, strengths: ["Brand recognition", "Features"] },
          { name: "Competitor B", marketShare: 20, strengths: ["Pricing", "Customer base"] },
          { name: "Competitor C", marketShare: 15, strengths: ["Technology", "Innovation"] }
        ]
      }
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}