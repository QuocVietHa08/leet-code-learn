import { NextRequest, NextResponse } from 'next/server';
import { Leetcode } from '@codingsnack/leetcode-api';

// Environment variables would be better for these in production
const CSRF_TOKEN = process.env.LEETCODE_CSRF_TOKEN || '';
const SESSION = process.env.LEETCODE_SESSION || '';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const problemName = searchParams.get('problemName');

    if (!problemName) {
      return NextResponse.json(
        { error: 'Problem name is required' },
        { status: 400 }
      );
    }

    // Initialize the LeetCode API client
    const lc = new Leetcode({ csrfToken: CSRF_TOKEN, session: SESSION });

    // Fetch problem data
    const problem = await lc.getProblem(problemName);
    console.log('Problem data:', problem.content);

    // Format the response
    const formattedProblem = {
      id: problem.questionFrontendId,
      title: problem.title,
      difficulty: problem.difficulty,
      content: problem.content
    };

    return NextResponse.json(formattedProblem);
  } catch (error) {
    // Error is logged in the response
    return NextResponse.json(
      { error: 'Failed to fetch problem data' },
      { status: 500 }
    );
  }
}

// Helper function to clean HTML content
// function cleanHtmlContent(content: string): string {
//   // Remove HTML tags but preserve line breaks and formatting
//   return content
//     .replace(/<\/p>/g, '\n')
//     .replace(/<\/pre>/g, '\n')
//     .replace(/<br\s*\/?>/g, '\n')
//     .replace(/<[^>]*>/g, '')
//     .replace(/&nbsp;/g, ' ')
//     .replace(/&quot;/g, '"')
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>')
//     .replace(/&amp;/g, '&')
//     .trim();
// }

// Helper function to extract examples from problem content
// function extractExamples(content: string) {
//   // Extract examples from the content
//   const examples = [];
  
//   // Clean the content first
//   const cleanedContent = cleanHtmlContent(content);
  
//   // Extract examples using regex patterns
//   const exampleBlocks = cleanedContent.split(/Example \d+:/g).filter(Boolean);
  
//   for (const block of exampleBlocks) {
//     const inputMatch = block.match(/Input:\s*([\s\S]+?)(?=\s*Output:|$)/);
//     const outputMatch = block.match(/Output:\s*([\s\S]+?)(?=\s*Explanation:|$)/);
//     const explanationMatch = block.match(/Explanation:\s*([\s\S]+?)$/);
    
//     examples.push({
//       input: inputMatch ? inputMatch[1].trim() : '',
//       output: outputMatch ? outputMatch[1].trim() : '',
//       explanation: explanationMatch ? explanationMatch[1].trim() : '',
//     });
//   }

//   return examples.length > 0 ? examples : [
//     { input: '', output: '', explanation: '' }
//   ];
// }
