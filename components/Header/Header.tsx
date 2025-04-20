'use client';
import { Container, Group, Text, Anchor, Flex } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

export function Header() {
  return (
    <header className="h-[60px] pt-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-transparent sticky top-0 z-50">
      <Container size="lg" className="h-[60px] flex justify-between items-center">
        <Group justify="space-between" w="100%">
          <Text size="xl" fw={700} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            LeetCode Learn
          </Text>
          <Flex align="center" justify="center" gap={5} className="flex items-center">
            
              <IconBrandGithub onClick={() => window.open('https://github.com/QuocVietHa08/leet-code-learn', '_blank')} size={24} className="cursor-pointer text-gray-700 dark:text-gray-200" />
            <ColorSchemeToggle />
          </Flex>
        </Group>
      </Container>
    </header>
  );
}
