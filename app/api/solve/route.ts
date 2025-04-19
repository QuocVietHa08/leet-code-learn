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

    // Use streaming for the OpenAI API response
    const stream = await openai.chat.completions.create({
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
      stream: true,
    });
    
    // Create a TransformStream to send chunks to the client
    const encoder = new TextEncoder();
    
    // Create a ReadableStream from the OpenAI stream
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });
    
    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

    // Note: This code is no longer used since we're using streaming
    // It's replaced by the streaming implementation above
  } catch (error) {
    // Log error for server-side debugging
    // console.error('Error generating solution:', error);
    return NextResponse.json({ error: 'Failed to generate solution' }, { status: 500 });
  }
}
