'use client';

import { Code, Paper, Skeleton, Tabs, Text, Title } from '@mantine/core';

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
      <Paper
        p="md"
        withBorder
        w="100%"
        h="100%"
        style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <Tabs
          defaultValue="bruteForce"
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Tabs.List style={{ flexShrink: 0 }}>
            <Tabs.Tab value="bruteForce">Brute Force Solution</Tabs.Tab>
            <Tabs.Tab value="optimized">Optimized Solution</Tabs.Tab>
          </Tabs.List>
          <div style={{ flexGrow: 1, overflow: 'auto', marginTop: '16px' }}>
            <Tabs.Panel value="bruteForce" pt="md">
              <Paper p="md" withBorder>
                <Title order={3} size="h4" mb="md">
                  Explanation
                </Title>
                <Skeleton height={20} radius="xl" mb="md" />
                <Skeleton height={20} radius="xl" mb="md" width="90%" />
                <Skeleton height={20} radius="xl" mb="md" width="95%" />
                <Skeleton height={20} radius="xl" mb="md" width="85%" />
                <Skeleton height={20} radius="xl" width="70%" mb="xl" />

                <Title order={3} size="h4" mb="md">
                  Solution
                </Title>
                <Skeleton height={200} radius="md" mb="xl" />

                <Title order={3} size="h4" mb="md">
                  Complexity
                </Title>
                <Skeleton height={20} width="40%" radius="xl" mb="sm" />
                <Skeleton height={20} width="70%" radius="xl" mb="xl" />
                <Skeleton height={20} width="40%" radius="xl" mb="sm" />
                <Skeleton height={20} width="70%" radius="xl" />
              </Paper>
            </Tabs.Panel>

            <Tabs.Panel value="optimized" pt="md">
              <Paper p="md" withBorder>
                <Title order={3} size="h4" mb="md">
                  Explanation
                </Title>
                <Skeleton height={20} radius="xl" mb="md" />
                <Skeleton height={20} radius="xl" mb="md" width="90%" />
                <Skeleton height={20} radius="xl" mb="md" width="95%" />
                <Skeleton height={20} radius="xl" mb="md" width="85%" />
                <Skeleton height={20} radius="xl" width="70%" mb="xl" />

                <Title order={3} size="h4" mb="md">
                  Solution
                </Title>
                <Skeleton height={200} radius="md" mb="xl" />

                <Title order={3} size="h4" mb="md">
                  Complexity
                </Title>
                <Skeleton height={20} width="40%" radius="xl" mb="sm" />
                <Skeleton height={20} width="70%" radius="xl" mb="xl" />
                <Skeleton height={20} width="40%" radius="xl" mb="sm" />
                <Skeleton height={20} width="70%" radius="xl" />
              </Paper>
            </Tabs.Panel>
          </div>
        </Tabs>
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
    <Paper
      p="md"
      withBorder
      h="100%"
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <Tabs
        defaultValue="bruteForce"
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Tabs.List style={{ flexShrink: 0 }}>
          <Tabs.Tab value="bruteForce">Brute Force Solution</Tabs.Tab>
          <Tabs.Tab value="optimized">Optimized Solution</Tabs.Tab>
        </Tabs.List>

        <div style={{ flexGrow: 1, overflow: 'auto', marginTop: '16px' }}>
          <Tabs.Panel value="bruteForce" style={{ height: '100%' }}>
            <SolutionPanel solution={solution.bruteForce} />
          </Tabs.Panel>

          <Tabs.Panel value="optimized" style={{ height: '100%' }}>
            <SolutionPanel solution={solution.optimized} />
          </Tabs.Panel>
        </div>
      </Tabs>
    </Paper>
  );
}

function SolutionPanel({ solution }: { solution: SolutionType }) {
  return (
    <Paper p="md" withBorder style={{ height: 'auto', overflow: 'visible' }}>
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
