'use client';
import { useState } from 'react';
import { IconBrain, IconClock, IconCode, IconRocket } from '@tabler/icons-react';
import {
  Button,
  Container,
  Flex,
  Group,
  rem,
  SimpleGrid,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

export function LandingPage() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    // Validate the URL format
    if (!input.includes('leetcode.com/problems/')) {
      notifications.show({
        title: 'Invalid LeetCode URL format',
        message: 'Please enter a valid LeetCode problem URL',
        color: 'red',
      })
      return;
    }

    // Extract the problem name from the URL
    const problemUrlParts = input.split('leetcode.com/problems/');
    if (problemUrlParts.length < 2) {
      notifications.show({
        title: 'Invalid LeetCode URL format',
        message: 'Please enter a valid LeetCode problem URL',
        color: 'red',
      })
      return;
    }

    // Get the problem name and remove any trailing slashes or query parameters
    const problemName = problemUrlParts[1].split('/')[0].split('?')[0];
    
    // Navigate to the solve page with the problem name
    router.push(`/solve/${problemName}`)
  };
  return (
    <>
      <div className="relative bg-gray-50 dark:bg-gray-800 pt-20 pb-20">
        <Container size="lg" mt="xl">
          <div className="relative z-10">
            <div className="py-5 pb-30 mx-auto max-w-[900px] sm:pb-20">
              <Title className="font-extrabold text-4xl tracking-tight mb-2.5 text-black dark:text-white leading-tight text-center sm:text-2xl sm:text-left">
                Solve Coding Problems with AI Assistance
              </Title>
              <Text
                className="text-black dark:text-white text-center max-w-[600px] mx-auto sm:text-left sm:text-md"
                mt={30}
              >
                Paste your LeetCode problem link and get instant solutions, explanations, and
                learning resources. Master algorithms and ace your technical interviews with
                LeetCode Learn.
              </Text>

              <Group align="center" justify="center">
                <Container w="100%" size="lg" py="xl" className="py-20">
                  <Flex
                    gap="xs"
                    align="center"
                    justify="center"
                    className="w-full p-5 bg-white dark:bg-gray-800 rounded-md shadow-sm"
                  >
                    <TextInput
                      type="text"
                      placeholder="Paste LeetCode problem link"
                      className="w-[70%] rounded-md text-sm"
                      value={input}
                      onChange={handleInputChange}
                    />
                    <Button onClick={handleSubmit}>
                      Solve
                    </Button>
                  </Flex>
                </Container>
              </Group>
            </div>
          </div>
        </Container>
      </div>

      <Container size="lg" py="xl" className="py-20">
        <Title
          order={2}
          className="text-3xl font-extrabold mb-4 text-black dark:text-white text-center"
          ta="center"
          mt="sm"
        >
          Master LeetCode Problems Effortlessly
        </Title>

        <Text c="dimmed" className="max-w-[600px] mx-auto text-center" ta="center" mt="md">
          Stop struggling with difficult coding problems. Our platform helps you understand and
          solve them quickly.
        </Text>

        <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl" mt={50}>
          <FeatureCard
            icon={IconCode}
            title="Step-by-Step Solutions"
            description="Get detailed, easy-to-understand solutions for any LeetCode problem"
          />
          <FeatureCard
            icon={IconBrain}
            title="Learn Algorithms"
            description="Understand the core concepts and patterns behind each solution"
          />
          <FeatureCard
            icon={IconRocket}
            title="Ace Interviews"
            description="Prepare for technical interviews with confidence and expertise"
          />
          <FeatureCard
            icon={IconClock}
            title="Save Time"
            description="Focus on learning instead of getting stuck on difficult problems"
          />
        </SimpleGrid>
      </Container>
    </>
  );
}

interface FeatureCardProps {
  icon: React.FC<any>;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Flex direction="column" align="center" className="relative pt-2.5 pl-2.5 h-full">
      <ThemeIcon
        size={56}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <Icon size={rem(26)} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" fw={500} className="font-bold font-sans leading-tight" mt="sm">
        {title}
      </Text>
      <Text fz="sm" c="dimmed" mt="md" className="text-center">
        {description}
      </Text>
    </Flex>
  );
}
