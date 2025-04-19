'use client';
import { Container, Group, Burger, Drawer, Stack, Text, UnstyledButton, Flex, Button, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

interface HeaderProps {
  links: { link: string; label: string }[];
}

export function Header({ links }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);

  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      className="block py-2 px-3 rounded text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={(event) => {
        event.preventDefault();
        close();
      }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <header className="h-[60px] pt-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-transparent sticky top-0 z-50">
      <Container size="lg" className="h-[60px] flex justify-between items-center">
        <Group justify="space-between"  w="100%">
          <Text size="xl" fw={700} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            LeetCode Learn
          </Text>
          <Flex gap="xs">

          {items}
          </Flex>
          <Group gap={5} visibleFrom="xs">
            <Button className="block py-2 px-3 rounded text-white text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              Sign Up
            </Button>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <Stack>
          {items}
          <UnstyledButton className="block py-2 px-3 rounded text-white text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            Sign Up
          </UnstyledButton>
          <Group justify="center">
            <ColorSchemeToggle />
          </Group>
        </Stack>
      </Drawer>
    </header>
  );
}
