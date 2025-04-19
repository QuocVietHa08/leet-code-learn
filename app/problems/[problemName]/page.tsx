'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Grid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ProblemDescription } from '@/app/components/ProblemDescription';
import { SolutionDisplay } from '@/app/components/SolutionDisplay';

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

  useEffect(() => {
    async function fetchSolution() {
      try {
        setLoading(true);

        // Make API call to your backend endpoint that will call OpenAI
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

        // Parse the JSON response
        const data = await response.json();
        setSolution(data);
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

  // Fetch problem data from API
  const [problemData, setProblemData] = useState({
    id: '',
    title: formattedProblemName,
    difficulty: '',
    content: '',
  });

  const [problemLoading, setProblemLoading] = useState(true);

  useEffect(() => {
    async function fetchProblemData() {
      try {
        setProblemLoading(true);
        const response = await fetch(`/api/problem?problemName=${problemName}`);

        if (!response.ok) {
          throw new Error('Failed to fetch problem data');
        }

        const data = await response.json();
        setProblemData(data);
      } catch (error) {
        // Log error to server logs instead of console
        notifications.show({
          title: 'Debug',
          message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          color: 'red',
        });
        notifications.show({
          title: 'Error',
          message: 'Failed to fetch problem data. Using default formatting.',
          color: 'yellow',
        });
        // Fallback to just the formatted name if API fails
        setProblemData((prev) => ({
          ...prev,
          title: formattedProblemName,
        }));
      } finally {
        setProblemLoading(false);
      }
    }

    if (problemName) {
      fetchProblemData();
    }
  }, [problemName, formattedProblemName]);

  console.log('Problem data:', problemData)

  return (
    <Container size="xl" py="xl" fluid mih="100vh">
      <Grid gutter="md">
        <Grid.Col w="50%" span={{ base: 12, md: 5 }} mih="calc(100vh - 4rem)">
          <ProblemDescription loading={problemLoading} problemData={problemData} />
        </Grid.Col>

        <Grid.Col w="50%" span={{ base: 12, md: 7 }} mih="calc(100vh - 4rem)">
          <SolutionDisplay loading={loading} solution={solution} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
