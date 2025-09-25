import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { businessIdea, targetMarket, uniqueValue } = await request.json();

    if (!businessIdea || !targetMarket || !uniqueValue) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const prompt = `
    You are an expert business strategist and AI business navigator. Based on the following inputs, generate a comprehensive business plan with sequential reasoning:

    Business Idea: ${businessIdea}
    Target Market: ${targetMarket}
    Unique Value Proposition: ${uniqueValue}

    Please generate a JSON response with the following structure:
    {
      "executiveSummary": {
        "title": "Business title",
        "mission": "Mission statement",
        "goals": ["Goal 1", "Goal 2", "Goal 3"]
      },
      "marketAnalysis": {
        "tam": "Total Addressable Market",
        "sam": "Serviceable Addressable Market", 
        "som": "Serviceable Obtainable Market",
        "growth": "Growth rate"
      },
      "keyFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      "timeline": [
        {
          "phase": "Phase name",
          "duration": "Duration",
          "progress": 0
        }
      ],
      "swotAnalysis": {
        "strengths": ["Strength 1", "Strength 2"],
        "weaknesses": ["Weakness 1", "Weakness 2"],
        "opportunities": ["Opportunity 1", "Opportunity 2"],
        "threats": ["Threat 1", "Threat 2"]
      },
      "actionTasks": [
        {
          "task": "Task description",
          "priority": "High|Medium|Low",
          "phase": "Phase name",
          "estimatedDuration": "Duration"
        }
      ]
    }

    Provide realistic market size estimates and growth rates based on the business idea. Make the action tasks specific and actionable.
    `;

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert business strategist providing comprehensive business planning guidance.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response
    let businessPlan;
    try {
      businessPlan = JSON.parse(responseContent);
    } catch (error) {
      // If JSON parsing fails, return the raw content
      businessPlan = {
        rawResponse: responseContent,
        executiveSummary: {
          title: "Generated Business Plan",
          mission: "AI-generated business mission",
          goals: ["Goal 1", "Goal 2", "Goal 3"]
        },
        marketAnalysis: {
          tam: "Estimated market size",
          sam: "Serviceable market",
          som: "Obtainable market",
          growth: "Growth rate"
        },
        keyFeatures: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
        timeline: [
          {
            phase: "Phase 1",
            duration: "3 months",
            progress: 0
          }
        ]
      };
    }

    return NextResponse.json(businessPlan);
  } catch (error) {
    console.error('Error generating business plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate business plan' },
      { status: 500 }
    );
  }
}