'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Code, Container, Grid, Loader, Paper, Tabs, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';

export default function SolvePage() {
  const params = useParams();
  const problemName = params.problemName as string;

  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState<{
    bruteForce: {
      explanation: string;
      code: string;
      timeComplexity: string;
      spaceComplexity: string;
    };
    optimized: {
      explanation: string;
      code: string;
      timeComplexity: string;
      spaceComplexity: string;
    };
  } | null>(null);
  const [partialSolution, setPartialSolution] = useState<string>('');

  useEffect(() => {
    async function fetchSolution() {
      try {
        setLoading(true);
        setPartialSolution('');

        // Make API call to your backend endpoint that will call OpenAI with streaming
        const response = await fetch('/api/solve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ problemName }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate solution');
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Response body is not readable');
        }

        const decoder = new TextDecoder();
        let accumulatedText = '';

        // Process the stream chunks
        while (true) {
          const { done, value } = await reader.read();
          if (done) { break; }
          
          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;
          setPartialSolution(accumulatedText);
          
          // Try to parse as JSON if it looks complete
          if (accumulatedText.trim().endsWith('}')) {
            try {
              const parsedData = JSON.parse(accumulatedText);
              if (parsedData.bruteForce && parsedData.optimized) {
                setSolution(parsedData);
              }
            } catch (e) {
              // Not valid JSON yet, continue accumulating
            }
          }
        }
        
        // Final decode
        const finalChunk = decoder.decode();
        if (finalChunk) {
          accumulatedText += finalChunk;
          setPartialSolution(accumulatedText);
        }
        
        // Try to parse the complete response
        try {
          const parsedData = JSON.parse(accumulatedText);
          setSolution(parsedData);
        } catch (e) {
          // Failed to parse the complete response
          throw new Error('Invalid response format');
        }
      } catch (error) {
        // Handle error fetching solution
        notifications.show({
          title: 'Error',
          message: 'Failed to generate solution. Please try again.',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    }

    if (problemName) {
      fetchSolution();
    }
  }, [problemName]);

  // Format the problem name for display (convert kebab-case to Title Case)
  const formattedProblemName = problemName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Mock problem data - in a real app, you would fetch this from an API
  const [problemData] = useState({
    id: '1768',
    title: formattedProblemName,
    difficulty: 'Easy',
    description: `You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.

Return the merged string.`,
    examples: [
      {
        input: 'word1 = "abc", word2 = "pqr"',
        output: '"apbqcr"',
        explanation: 'The merged string will be merged as so:\nword1:  a  b  c\nword2:    p  q  r\nmerged: a p b q c r'
      },
      {
        input: 'word1 = "ab", word2 = "pqrs"',
        output: '"apbqrs"',
        explanation: 'Notice that as word2 is longer, "rs" is appended to the end.'
      }
    ]
  });

  return (
    <Container size="xl" py="xl" fluid>
      <Grid gutter="md">
        {/* Left side - Problem Description */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Paper p="md" withBorder>
            <Title order={2} size="h3" mb="xs">
              {problemData.id}. {problemData.title}
            </Title>
            
            <Text size="sm" fw={500} c="dimmed" mb="md">
              Difficulty: {problemData.difficulty}
            </Text>
            
            <Text mb="lg" style={{ whiteSpace: 'pre-line' }}>
              {problemData.description}
            </Text>
            
            <Title order={3} size="h5" mb="xs">
              Examples:
            </Title>
            
            {problemData.examples.map((example, index) => (
              <Paper key={index} p="sm" withBorder mb="md" bg="gray.0">
                <Text fw={700}>Example {index + 1}:</Text>
                <Text><strong>Input:</strong> {example.input}</Text>
                <Text><strong>Output:</strong> {example.output}</Text>
                {example.explanation && (
                  <Text><strong>Explanation:</strong> {example.explanation}</Text>
                )}
              </Paper>
            ))}
          </Paper>
        </Grid.Col>
        
        {/* Right side - Solution */}
        <Grid.Col span={{ base: 12, md: 7 }}>

      {loading ? (
        <Box className="flex flex-col items-center justify-center py-20">
          <Loader size="xl" />
          <Text mt="md">Generating solution...</Text>
          {partialSolution && (
            <Box mt="xl" className="max-w-[800px] w-full">
              <Text size="sm" c="dimmed" mb="xs">
                Generating in progress...
              </Text>
              <Paper p="xs" withBorder style={{ maxHeight: '200px', overflow: 'auto' }}>
                <Text size="xs" style={{ whiteSpace: 'pre-wrap' }}>
                  {partialSolution}
                </Text>
              </Paper>
            </Box>
          )}
        </Box>
      ) : solution ? (
        <Paper p="md" withBorder>
          <Tabs defaultValue="bruteForce">
            <Tabs.List>
              <Tabs.Tab value="bruteForce">Brute Force Solution</Tabs.Tab>
              <Tabs.Tab value="optimized">Optimized Solution</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="bruteForce" pt="md">
              <Tabs defaultValue="explanation">
                <Tabs.List>
                  <Tabs.Tab value="explanation">Explanation</Tabs.Tab>
                  <Tabs.Tab value="solution">Code</Tabs.Tab>
                  <Tabs.Tab value="complexity">Complexity</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="explanation" pt="md">
                  <Paper p="md" withBorder>
                    <Text>{solution.bruteForce.explanation}</Text>
                  </Paper>
                </Tabs.Panel>

                <Tabs.Panel value="solution" pt="md">
                  <Paper p="md" withBorder>
                    <Code block>{solution.bruteForce.code}</Code>
                  </Paper>
                </Tabs.Panel>

                <Tabs.Panel value="complexity" pt="md">
                  <Paper p="md" withBorder>
                    <Text fw={700}>Time Complexity</Text>
                    <Text mb="md">{solution.bruteForce.timeComplexity}</Text>
                    <Text fw={700}>Space Complexity</Text>
                    <Text>{solution.bruteForce.spaceComplexity}</Text>
                  </Paper>
                </Tabs.Panel>
              </Tabs>
            </Tabs.Panel>

            <Tabs.Panel value="optimized" pt="md">
              <Tabs defaultValue="explanation">
                <Tabs.List>
                  <Tabs.Tab value="explanation">Explanation</Tabs.Tab>
                  <Tabs.Tab value="solution">Code</Tabs.Tab>
                  <Tabs.Tab value="complexity">Complexity</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="explanation" pt="md">
                  <Paper p="md" withBorder>
                    <Text>{solution.optimized.explanation}</Text>
                  </Paper>
                </Tabs.Panel>

                <Tabs.Panel value="solution" pt="md">
                  <Paper p="md" withBorder>
                    <Code block>{solution.optimized.code}</Code>
                  </Paper>
                </Tabs.Panel>

                <Tabs.Panel value="complexity" pt="md">
                  <Paper p="md" withBorder>
                    <Text fw={700}>Time Complexity</Text>
                    <Text mb="md">{solution.optimized.timeComplexity}</Text>
                    <Text fw={700}>Space Complexity</Text>
                    <Text>{solution.optimized.spaceComplexity}</Text>
                  </Paper>
                </Tabs.Panel>
              </Tabs>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      ) : (
        <Text>Failed to generate solution. Please try again.</Text>
      )}
        </Grid.Col>
      </Grid>
    </Container>
  );
}
