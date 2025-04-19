'use client';

import { Box, Code, Loader, Paper, Tabs, Text, Title } from '@mantine/core';

type SolutionType = {
  explanation: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
};

type SolutionDisplayProps = {
  loading: boolean;
  solution: {
    bruteForce: SolutionType;
    optimized: SolutionType;
  } | null;
};

export function SolutionDisplay({ loading, solution }: SolutionDisplayProps) {
  if (loading) {
    return (
      <Paper p="md" withBorder>
        <Box className="flex items-center justify-center" p="xl">
          <Loader size="md" />
          <Text ml="md" size="md" c="dimmed">
            Generating solution...
          </Text>
        </Box>
      </Paper>
    );
  }

  if (!solution) {
    return (
      <Paper p="md" withBorder>
        <Text ta="center" c="dimmed">
          Failed to generate solution. Please try again.
        </Text>
      </Paper>
    );
  }

  return (
    <Paper p="md" withBorder mih="calc(100vh - 4rem)">
      <Tabs defaultValue="bruteForce">
        <Tabs.List>
          <Tabs.Tab value="bruteForce">Brute Force Solution</Tabs.Tab>
          <Tabs.Tab value="optimized">Optimized Solution</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="bruteForce" pt="md">
          <SolutionPanel solution={solution.bruteForce} />
        </Tabs.Panel>

        <Tabs.Panel value="optimized" pt="md">
          <SolutionPanel solution={solution.optimized} />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}

function SolutionPanel({ solution }: { solution: SolutionType }) {
  return (
    <Paper p="md" withBorder>
      <Title order={3} size="h4" mb="md">
        Explanation
      </Title>
      <Text mb="lg" style={{ whiteSpace: 'pre-line' }}>
        {solution.explanation}
      </Text>

      <Title order={3} size="h4" mb="md">
        Solution
      </Title>
      <Code block mb="lg">
        {solution.code}
      </Code>

      <Title order={3} size="h4" mb="md">
        Complexity
      </Title>
      <Text mb="xs">
        <strong>Time Complexity:</strong> {solution.timeComplexity}
      </Text>
      <Text>
        <strong>Space Complexity:</strong> {solution.spaceComplexity}
      </Text>
    </Paper>
  );
}
