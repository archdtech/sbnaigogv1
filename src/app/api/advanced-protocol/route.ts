import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { 
      businessContext, 
      challenge, 
      industry, 
      targetMarket, 
      businessIdea, 
      uniqueValue,
      businessType,
      scale,
      protocolType 
    } = await request.json();

    if (!protocolType) {
      return NextResponse.json(
        { error: 'Protocol type is required' },
        { status: 400 }
      );
    }

    let result: string;

    switch (protocolType) {
      case 'strategic-solution':
        if (!businessContext || !challenge) {
          return NextResponse.json(
            { error: 'Business context and challenge are required for strategic solution' },
            { status: 400 }
          );
        }
        result = await geminiService.generateStrategicSolution(businessContext, challenge);
        break;

      case 'market-insights':
        if (!industry || !targetMarket) {
          return NextResponse.json(
            { error: 'Industry and target market are required for market insights' },
            { status: 400 }
          );
        }
        result = await geminiService.generateMarketInsights(industry, targetMarket);
        break;

      case 'innovation-strategy':
        if (!businessIdea || !uniqueValue) {
          return NextResponse.json(
            { error: 'Business idea and unique value are required for innovation strategy' },
            { status: 400 }
          );
        }
        result = await geminiService.generateInnovationStrategy(businessIdea, uniqueValue);
        break;

      case 'operational-excellence':
        if (!businessType || !scale) {
          return NextResponse.json(
            { error: 'Business type and scale are required for operational excellence plan' },
            { status: 400 }
          );
        }
        result = await geminiService.generateOperationalExcellencePlan(businessType, scale);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid protocol type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      protocolType,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Advanced protocol generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate advanced protocol',
        details: error.message 
      },
      { status: 500 }
    );
  }
}