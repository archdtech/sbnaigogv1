import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { 
      businessPlan, 
      timeline, 
      resources, 
      budget, 
      teamSize,
      industry,
      businessStage 
    } = await request.json();

    if (!businessPlan) {
      return NextResponse.json(
        { error: 'Business plan is required' },
        { status: 400 }
      );
    }

    const prompt = `
    As an expert business strategist and project manager, create a comprehensive strategic roadmap based on the following business plan:

    Business Plan: ${businessPlan}
    Timeline: ${timeline || '12 months'}
    Available Resources: ${resources || 'Standard startup resources'}
    Budget: ${budget || 'Startup budget'}
    Team Size: ${teamSize || 'Small team (3-10 people)'}
    Industry: ${industry || 'Technology'}
    Business Stage: ${businessStage || 'Early Stage'}

    Please generate a detailed strategic roadmap that includes:

    1. **Executive Summary**
       - Vision and mission alignment
       - Key strategic objectives
       - Success metrics and KPIs

    2. **Phase Breakdown** (Quarter-based)
       - Phase 1 (Months 1-3): Foundation and Planning
       - Phase 2 (Months 4-6): Development and Testing
       - Phase 3 (Months 7-9): Launch and Growth
       - Phase 4 (Months 10-12): Optimization and Scale

    3. **Key Initiatives per Phase**
       - Strategic priorities
       - Major milestones
       - Dependencies and prerequisites
       - Resource allocation

    4. **Risk Management**
       - Potential risks and challenges
       - Mitigation strategies
       - Contingency plans

    5. **Resource Planning**
       - Human resource requirements
       - Technology and infrastructure needs
       - Financial allocation by phase
       - Timeline and milestones

    6. **Success Metrics**
       - Leading indicators
       - Lagging indicators
       - Measurement frequency
       - Adjustment triggers

    7. **Governance and Review**
       - Decision-making framework
       - Review cycles and checkpoints
       - Stakeholder communication plan
       - Course correction mechanisms

    Format your response as a structured JSON object with clear phases, actionable initiatives, and measurable outcomes.
    `;

    const result = await geminiService.generateAdvancedBusinessProtocol(prompt);

    // Parse the result and structure it
    let roadmapData;
    try {
      // Try to parse as JSON first, if that fails, create structured data from text
      roadmapData = JSON.parse(result);
    } catch (error) {
      // If not JSON, create a structured format from the text
      roadmapData = {
        rawResponse: result,
        generatedAt: new Date().toISOString(),
        structure: 'text-based',
        phases: [
          {
            name: "Phase 1: Foundation",
            duration: "Months 1-3",
            focus: "Planning and setup",
            initiatives: ["Strategic planning", "Team formation", "Resource allocation"]
          },
          {
            name: "Phase 2: Development", 
            duration: "Months 4-6",
            focus: "Building and testing",
            initiatives: ["Product development", "Market validation", "Process optimization"]
          },
          {
            name: "Phase 3: Launch",
            duration: "Months 7-9", 
            focus: "Market entry",
            initiatives: ["Product launch", "Marketing campaigns", "Customer acquisition"]
          },
          {
            name: "Phase 4: Scale",
            duration: "Months 10-12",
            focus: "Growth and optimization",
            initiatives: ["Scale operations", "Market expansion", "Performance optimization"]
          }
        ]
      };
    }

    return NextResponse.json({
      success: true,
      roadmap: roadmapData,
      input: {
        businessPlan,
        timeline,
        resources,
        budget,
        teamSize,
        industry,
        businessStage
      },
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Roadmap generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate roadmap',
        details: error.message 
      },
      { status: 500 }
    );
  }
}