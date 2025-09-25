import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/tasks - Retrieve all tasks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phase = searchParams.get('phase');
    const priority = searchParams.get('priority');

    // For now, return mock data since we don't have a database schema yet
    const mockTasks = [
      {
        id: 1,
        task: "Define core AI reasoning engine requirements",
        priority: "High",
        phase: "MVP Development",
        estimatedDuration: "2 weeks",
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        task: "Design user interface wireframes",
        priority: "High",
        phase: "MVP Development",
        estimatedDuration: "1 week",
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        task: "Set up development environment",
        priority: "Medium",
        phase: "MVP Development",
        estimatedDuration: "3 days",
        completed: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        task: "Develop marketing strategy",
        priority: "Medium",
        phase: "Market Launch",
        estimatedDuration: "2 weeks",
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 5,
        task: "Create landing page",
        priority: "High",
        phase: "Market Launch",
        estimatedDuration: "1 week",
        completed: false,
        createdAt: new Date().toISOString()
      }
    ];

    let filteredTasks = mockTasks;
    
    if (phase) {
      filteredTasks = filteredTasks.filter(task => task.phase === phase);
    }
    
    if (priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }

    return NextResponse.json(filteredTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const { task, priority, phase, estimatedDuration } = await request.json();

    if (!task || !priority || !phase) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For now, return mock created task
    const newTask = {
      id: Date.now(),
      task,
      priority,
      phase,
      estimatedDuration: estimatedDuration || "1 week",
      completed: false,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}