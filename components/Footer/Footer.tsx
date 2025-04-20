import { IconBrandGithub, IconHeart } from '@tabler/icons-react';
import { Anchor, Button, Container, Flex, Group, Text } from '@mantine/core';

export function Footer() {
  return (
    <div className="mt-[120px] pt-20 pb-20 mb-10 bg-gray-50 dark:bg-gray-800 dark:border-transparent">
      <Container className="flex justify-between items-center pb-6 md:flex-row md:items-center sm:flex-col sm:items-center">
        <Text size="xl" fw={700} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
          LeetCode Learn
        </Text>

        <Group className="sm:mt-6 sm:mb-2">
          <Flex gap={2} className="flex items-center gap-1">
            Built with <IconHeart size={16} className="mx-1 text-red-500" /> by{' '}
            <Anchor
              href="https://www.linkedin.com/in/viethadev/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-blue-500 hover:underline"
            >
              Edward
            </Anchor>
          </Flex>
        </Group>

        <Anchor
          href="https://github.com/QuocVietHa08/leet-code-learn/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="light"
            size="xs"
            leftSection={<IconBrandGithub size={16} />}
            className="sm:mt-4"
          >
            Suggest Feature
          </Button>
        </Anchor>
      </Container>
    </div>
  );
}
