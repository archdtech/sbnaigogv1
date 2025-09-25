import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { 
      businessIdea, 
      industry, 
      targetMarket, 
      uniqueValue,
      businessModel,
      geographicScope 
    } = await request.json();

    if (!businessIdea || !industry) {
      return NextResponse.json(
        { error: 'Business idea and industry are required' },
        { status: 400 }
      );
    }

    const prompt = `
    As a competitive intelligence expert, conduct a comprehensive competitor analysis for:

    Business Idea: ${businessIdea}
    Industry: ${industry}
    Target Market: ${targetMarket || 'General market'}
    Unique Value Proposition: ${uniqueValue || 'To be determined'}
    Business Model: ${businessModel || 'To be determined'}
    Geographic Scope: ${geographicScope || 'Global'}

    Please provide a detailed competitor analysis including:

    1. **Competitive Landscape Overview**
       - Market structure and concentration
       - Key player categories
       - Market share distribution
       - Competitive intensity assessment

    2. **Direct Competitors Analysis**
       - Top 5 direct competitors
       - Their strengths and weaknesses
       - Market positioning strategies
       - Product/service offerings comparison
       - Pricing strategies
       - Distribution channels

    3. **Indirect Competitors Analysis**
       - Alternative solutions providers
       - Substitute products/services
       - Emerging competitors
       - Potential disruptors

    4. **Competitive Advantage Assessment**
       - Your unique differentiators
       - Sustainable competitive advantages
       - Barriers to entry
       - Competitive gaps and opportunities

    5. **Market Positioning Strategy**
       - Recommended positioning
       - Target customer segments
       - Value proposition enhancement
       - Brand differentiation strategy

    6. **Competitive Response Scenarios**
       - Likely competitor reactions
       - Defensive strategies
       - Offensive opportunities
       - First-mover advantages

    7. **Strategic Recommendations**
       - Market entry strategies
       - Competitive positioning tactics
       - Partnership opportunities
       - Innovation roadmap
       - Risk mitigation strategies

    Provide actionable insights with specific, data-driven recommendations for gaining competitive advantage.
    `;

    const result = await geminiService.generateAdvancedBusinessProtocol(prompt);

    // Structure the analysis
    let analysisData;
    try {
      analysisData = JSON.parse(result);
    } catch (error) {
      analysisData = {
        rawAnalysis: result,
        generatedAt: new Date().toISOString(),
        structure: 'comprehensive-text-analysis',
        keyInsights: [
          "Competitive landscape analyzed",
          "Market positioning identified", 
          "Strategic recommendations provided"
        ]
      };
    }

    return NextResponse.json({
      success: true,
      analysis: analysisData,
      input: {
        businessIdea,
        industry,
        targetMarket,
        uniqueValue,
        businessModel,
        geographicScope
      },
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Competitor analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate competitor analysis',
        details: error.message 
      },
      { status: 500 }
    );
  }
}