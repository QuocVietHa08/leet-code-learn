import { Container, Group, Anchor, Text } from '@mantine/core';

interface FooterProps {
  links: { link: string; label: string }[];
}

export function Footer({ links }: FooterProps) {
  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      // onClick={(event) => event.()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className="mt-[120px] pt-20 pb-20 bg-gray-50 dark:bg-gray-800 dark:border-transparent">
      <Container className="flex justify-between items-center pb-6 md:flex-row md:items-center sm:flex-col sm:items-center">
        <Text size="xl" fw={700} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
          LeetCode Learn
        </Text>
        <Group className="sm:mt-6 sm:mb-2">{items}</Group>
        <Text size="sm" className="sm:mt-4">
          © {new Date().getFullYear()} LeetCode Learn. All rights reserved.
        </Text>
      </Container>
    </div>
  );
}
