import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await db.$connect();
    
    // Test basic queries
    const userCount = await db.user.count();
    const planCount = await db.businessPlan.count();
    const taskCount = await db.task.count();
    const analyticsCount = await db.analytics.count();
    
    // Create a test user if none exist
    if (userCount === 0) {
      await db.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User'
        }
      });
    }
    
    // Create a test business plan if none exist
    if (planCount === 0) {
      const user = await db.user.findFirst();
      if (user) {
        await db.businessPlan.create({
          data: {
            title: 'Test Business Plan',
            businessIdea: 'AI Business Navigator',
            targetMarket: 'Entrepreneurs and Business Teams',
            uniqueValue: 'AI-powered business planning and task management',
            executiveSummary: {
              title: 'AI Business Navigator',
              mission: 'Democratizing strategic business expertise',
              goals: ['Make planning accessible', 'Reduce failure rates', 'Empower entrepreneurs']
            },
            marketAnalysis: {
              tam: '$15.7B',
              sam: '$4.2B',
              som: '$120M',
              growth: '8.2% CAGR'
            },
            userId: user.id
          }
        });
      }
    }
    
    // Create test tasks if none exist
    if (taskCount === 0) {
      const user = await db.user.findFirst();
      const plan = await db.businessPlan.findFirst();
      
      if (user) {
        await db.task.createMany({
          data: [
            {
              title: 'Define core AI reasoning engine requirements',
              priority: 'High',
              phase: 'MVP Development',
              estimatedDuration: '2 weeks',
              userId: user.id,
              businessPlanId: plan?.id
            },
            {
              title: 'Design user interface wireframes',
              priority: 'High',
              phase: 'MVP Development',
              estimatedDuration: '1 week',
              userId: user.id,
              businessPlanId: plan?.id
            },
            {
              title: 'Set up development environment',
              priority: 'Medium',
              phase: 'MVP Development',
              estimatedDuration: '3 days',
              userId: user.id,
              businessPlanId: plan?.id,
              completed: true
            },
            {
              title: 'Develop marketing strategy',
              priority: 'Medium',
              phase: 'Market Launch',
              estimatedDuration: '2 weeks',
              userId: user.id,
              businessPlanId: plan?.id
            }
          ]
        });
      }
    }
    
    // Create test analytics if none exist
    if (analyticsCount === 0) {
      await db.analytics.create({
        data: {
          marketMetrics: {
            tam: '$15.7B',
            sam: '$4.2B',
            som: '$120M',
            growthRate: '8.2%',
            marketTrends: [
              { name: 'AI Adoption', value: 45, change: '+12%' },
              { name: 'Remote Work', value: 74, change: '+8%' },
              { name: 'Digital Transformation', value: 67, change: '+15%' }
            ]
          },
          businessMetrics: {
            successScore: 75,
            innovationPotential: 85,
            marketOpportunity: 72,
            competitiveAdvantage: 68,
            riskAssessment: {
              marketRisk: 'Medium',
              technicalRisk: 'Low',
              financialRisk: 'Medium',
              operationalRisk: 'Low'
            }
          },
          taskMetrics: {
            totalTasks: 10,
            completedTasks: 0,
            highPriorityTasks: 5,
            mediumPriorityTasks: 5,
            lowPriorityTasks: 0,
            completionRate: 0,
            averageCompletionTime: '0 days'
          },
          valueCreation: {
            shortTermImpact: 65,
            longTermStrategy: 80,
            resourceEfficiency: 70,
            balanceScore: 'Good',
            recommendations: [
              'Focus on high-priority tasks first',
              'Allocate more resources to long-term strategy',
              'Monitor market trends regularly',
              'Build competitive differentiation'
            ]
          },
          competitiveAnalysis: {
            innovation: 4,
            marketFit: 4,
            scalability: 5,
            competitiveEdge: 3,
            topCompetitors: [
              { name: 'Competitor A', marketShare: 25, strengths: ['Brand recognition', 'Features'] },
              { name: 'Competitor B', marketShare: 20, strengths: ['Pricing', 'Customer base'] },
              { name: 'Competitor C', marketShare: 15, strengths: ['Technology', 'Innovation'] }
            ]
          }
        }
      });
    }
    
    // Get updated counts
    const updatedUserCount = await db.user.count();
    const updatedPlanCount = await db.businessPlan.count();
    const updatedTaskCount = await db.task.count();
    const updatedAnalyticsCount = await db.analytics.count();
    
    // Get sample data
    const users = await db.user.findMany({ take: 3 });
    const tasks = await db.task.findMany({ take: 5 });
    const plans = await db.businessPlan.findMany({ take: 2 });
    
    await db.$disconnect();
    
    return NextResponse.json({
      status: 'Database connected successfully',
      counts: {
        users: updatedUserCount,
        businessPlans: updatedPlanCount,
        tasks: updatedTaskCount,
        analytics: updatedAnalyticsCount
      },
      sampleData: {
        users,
        tasks,
        plans
      },
      databaseInfo: {
        type: 'SQLite',
        url: process.env.DATABASE_URL,
        tables: ['User', 'BusinessPlan', 'Task', 'Analytics']
      }
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}