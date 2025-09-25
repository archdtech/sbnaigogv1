import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export class GeminiService {
  private model: any;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateAdvancedBusinessProtocol(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate advanced business protocol');
    }
  }

  async generateStrategicSolution(businessContext: string, challenge: string): Promise<string> {
    const prompt = `
    As an advanced business strategist and problem solver, analyze the following business context and challenge to provide a comprehensive strategic solution:

    Business Context: ${businessContext}
    Challenge: ${challenge}

    Please provide a detailed strategic solution that includes:
    1. Problem Analysis
    2. Strategic Approach
    3. Implementation Steps
    4. Risk Mitigation
    5. Success Metrics
    6. Resource Requirements
    7. Timeline Recommendations

    Format your response as a structured, actionable plan.
    `;

    return this.generateAdvancedBusinessProtocol(prompt);
  }

  async generateMarketInsights(industry: string, targetMarket: string): Promise<string> {
    const prompt = `
    As a market research expert, provide comprehensive market insights for:

    Industry: ${industry}
    Target Market: ${targetMarket}

    Please include:
    1. Current Market Trends
    2. Competitive Landscape Analysis
    3. Market Size and Growth Projections
    4. Key Success Factors
    5. Market Entry Barriers
    6. Opportunities and Threats
    7. Strategic Recommendations

    Provide data-driven insights with specific, actionable recommendations.
    `;

    return this.generateAdvancedBusinessProtocol(prompt);
  }

  async generateInnovationStrategy(businessIdea: string, uniqueValue: string): Promise<string> {
    const prompt = `
    As an innovation strategist, develop a comprehensive innovation strategy for:

    Business Idea: ${businessIdea}
    Unique Value Proposition: ${uniqueValue}

    Please provide:
    1. Innovation Framework
    2. Technology Integration Strategy
    3. Differentiation Approach
    4. Intellectual Property Considerations
    5. Innovation Timeline
    6. Resource Allocation
    7. Risk Assessment
    8. Competitive Advantage Building

    Focus on creating sustainable innovation that drives long-term value.
    `;

    return this.generateAdvancedBusinessProtocol(prompt);
  }

  async generateOperationalExcellencePlan(businessType: string, scale: string): Promise<string> {
    const prompt = `
    As an operations expert, create an operational excellence plan for:

    Business Type: ${businessType}
    Scale: ${scale}

    Include:
    1. Process Optimization Strategies
    2. Quality Management Systems
    3. Supply Chain Optimization
    4. Technology Infrastructure
    5. Team Structure and Roles
    6. Performance Metrics
    7. Continuous Improvement Plan
    8. Scalability Considerations

    Provide practical, implementable strategies for operational excellence.
    `;

    return this.generateAdvancedBusinessProtocol(prompt);
  }
}

export const geminiService = new GeminiService();