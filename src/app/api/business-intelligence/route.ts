import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get business metrics from database
    const userCount = await db.user.count();
    const planCount = await db.businessPlan.count();
    const taskCount = await db.task.count();
    const completedTasks = await db.task.count({ where: { completed: true } });
    
    // Get latest business plans
    const recentPlans = await db.businessPlan.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    // Get task statistics
    const highPriorityTasks = await db.task.count({ where: { priority: 'High' } });
    const mediumPriorityTasks = await db.task.count({ where: { priority: 'Medium' } });
    const lowPriorityTasks = await db.task.count({ where: { priority: 'Low' } });

    // Calculate completion rates
    const completionRate = taskCount > 0 ? (completedTasks / taskCount) * 100 : 0;
    const highPriorityCompletion = highPriorityTasks > 0 ? 
      (await db.task.count({ where: { priority: 'High', completed: true } }) / highPriorityTasks) * 100 : 0;

    // Generate business intelligence insights
    const insights = generateBusinessInsights({
      userCount,
      planCount,
      taskCount,
      completedTasks,
      completionRate,
      highPriorityTasks,
      mediumPriorityTasks,
      lowPriorityTasks,
      highPriorityCompletion
    });

    return NextResponse.json({
      overview: {
        totalUsers: userCount,
        totalBusinessPlans: planCount,
        totalTasks: taskCount,
        completedTasks,
        overallCompletionRate: Math.round(completionRate)
      },
      taskAnalytics: {
        highPriority: {
          total: highPriorityTasks,
          completed: await db.task.count({ where: { priority: 'High', completed: true } }),
          completionRate: Math.round(highPriorityCompletion)
        },
        mediumPriority: {
          total: mediumPriorityTasks,
          completed: await db.task.count({ where: { priority: 'Medium', completed: true } }),
          completionRate: mediumPriorityTasks > 0 ? 
            Math.round((await db.task.count({ where: { priority: 'Medium', completed: true } }) / mediumPriorityTasks) * 100) : 0
        },
        lowPriority: {
          total: lowPriorityTasks,
          completed: await db.task.count({ where: { priority: 'Low', completed: true } }),
          completionRate: lowPriorityTasks > 0 ? 
            Math.round((await db.task.count({ where: { priority: 'Low', completed: true } }) / lowPriorityTasks) * 100) : 0
        }
      },
      recentActivity: recentPlans.map(plan => ({
        id: plan.id,
        title: plan.title,
        businessIdea: plan.businessIdea,
        createdAt: plan.createdAt,
        user: plan.user.name || plan.user.email
      })),
      insights,
      recommendations: generateRecommendations({
        completionRate,
        highPriorityCompletion,
        taskCount,
        planCount
      }),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Business intelligence error:', error);
    return NextResponse.json(
      { error: 'Failed to generate business intelligence' },
      { status: 500 }
    );
  }
}

function generateBusinessInsights(data: any) {
  return {
    userEngagement: {
      activeUsers: data.userCount,
      engagementRate: data.userCount > 0 ? (data.planCount / data.userCount) * 100 : 0,
      averagePlansPerUser: data.userCount > 0 ? data.planCount / data.userCount : 0
    },
    productivity: {
      totalTasksGenerated: data.taskCount,
      completionRate: data.completionRate,
      highPriorityFocus: data.highPriorityTasks / data.taskCount * 100,
      efficiency: data.completedTasks > 0 ? data.taskCount / data.completedTasks : 0
    },
    businessHealth: {
      planningActivity: data.planCount,
      taskGenerationRate: data.planCount > 0 ? data.taskCount / data.planCount : 0,
      executionMomentum: data.completionRate > 70 ? 'High' : data.completionRate > 40 ? 'Medium' : 'Low'
    }
  };
}

function generateRecommendations(data: any) {
  const recommendations = [];

  if (data.completionRate < 50) {
    recommendations.push({
      type: 'productivity',
      priority: 'High',
      title: 'Improve Task Completion',
      description: 'Focus on completing high-priority tasks to maintain momentum',
      action: 'Review and prioritize pending tasks'
    });
  }

  if (data.highPriorityCompletion < 60) {
    recommendations.push({
      type: 'strategy',
      priority: 'High',
      title: 'Address High-Priority Items',
      description: 'High-priority tasks need immediate attention',
      action: 'Allocate resources to critical tasks'
    });
  }

  if (data.taskCount / data.planCount < 5) {
    recommendations.push({
      type: 'planning',
      priority: 'Medium',
      title: 'Enhance Task Planning',
      description: 'Consider breaking down plans into more actionable tasks',
      action: 'Review and expand task lists for each plan'
    });
  }

  if (data.completionRate > 80) {
    recommendations.push({
      type: 'growth',
      priority: 'Medium',
      title: 'Scale Operations',
      description: 'High completion rates indicate readiness for expansion',
      action: 'Consider new business initiatives or scaling existing ones'
    });
  }

  return recommendations;
}