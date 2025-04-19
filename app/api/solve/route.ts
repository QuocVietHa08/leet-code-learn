import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { problemName } = await request.json();

    if (!problemName) {
      return NextResponse.json({ error: 'Problem name is required' }, { status: 400 });
    }

    // Format the problem name for the prompt (convert kebab-case to readable format)
    const formattedProblemName = problemName
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Create the prompt for OpenAI
    const prompt = `
      I need detailed solutions for the LeetCode problem "${formattedProblemName}".
      
      Please provide TWO different solutions:
      
      1. A BRUTE FORCE solution that is straightforward but may not be optimal
      2. An OPTIMIZED solution that has better time/space complexity
      
      For EACH solution, include:
      - A clear explanation of the approach and algorithm
      - The complete code solution in JavaScript
      - Time complexity analysis
      - Space complexity analysis
      
      Format your response as JSON with the following structure:
      {
        "bruteForce": {
          "explanation": "...",
          "code": "...",
          "timeComplexity": "...",
          "spaceComplexity": "..."
        },
        "optimized": {
          "explanation": "...",
          "code": "...",
          "timeComplexity": "...",
          "spaceComplexity": "..."
        }
      }
    `;

    // Call OpenAI API for completion
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a coding expert specializing in algorithms and data structures. You provide clear, efficient solutions to programming problems.',
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
    });
    
    // Get the response content
    const responseContent = completion.choices[0].message.content;
    
    if (!responseContent) {
      throw new Error('No response from OpenAI');
    }
    
    // Parse the JSON response
    const solutionData = JSON.parse(responseContent);
    
    // Return the solution data as JSON
    return NextResponse.json(solutionData);
  } catch (error) {
    // Log error for server-side debugging
    // console.error('Error generating solution:', error);
    return NextResponse.json({ error: 'Failed to generate solution' }, { status: 500 });
  }
}
