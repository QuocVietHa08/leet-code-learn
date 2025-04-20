'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {  Flex, UnstyledButton} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ProblemDescription } from '@/app/components/ProblemDescription';
import { SolutionDisplay } from '@/app/components/SolutionDisplay';
import { IconArrowLeft } from '@tabler/icons-react';

export default function SolvePage() {
  const params = useParams();
  const problemName= params.problemName as string[];

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
          body: JSON.stringify({ problemName: problemName[0] }),
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
  const formattedProblemName = problemName[0]
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
        const response = await fetch(`/api/problem?problemName=${problemName[0]}`);

        if (!response.ok) {
          throw new Error('Failed to fetch problem data');
        }

        const data = await response.json();
        setProblemData(data);
      } catch (error) {
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


  return (
    <Flex direction="column" w="100vw" h="100vh" className="overflow-auto">
      <Flex className="bg-gray-100 dark:bg-gray-800" px="md" pt="xs" pb="xs">
        <UnstyledButton 
          className="flex items-center justify-start gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
          component="a" 
          href="/" 
          variant="unstyled" 
          p={0} 
          m={0}
        >
          <IconArrowLeft size={18} />
          <span>Return Home</span>
        </UnstyledButton>
      </Flex>
      
      <Flex 
        align="stretch" 
        w="100%" 
        p="md" 
        pt="xs" 
        gap="md" 
        className="overflow-auto flex-grow bg-gray-50 dark:bg-gray-900" 
        h="calc(100% - 40px)"
      >
        <Flex miw="50%" className="overflow-hidden rounded-xl h-full">
          <ProblemDescription loading={problemLoading} problemData={problemData} />
        </Flex>

        <Flex miw="50%" className="overflow-hidden rounded-xl h-full">
          <SolutionDisplay loading={loading} solution={solution} />
        </Flex>
      </Flex>
    </Flex>
  );
}
