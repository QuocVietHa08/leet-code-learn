'use client';

import { ActionIcon, Menu, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  
  // Determine which icon to show based on current color scheme
  const getToggleIcon = () => {
    switch (colorScheme) {
      case 'light': return <IconSun size={24} />;
      case 'dark': return <IconMoon size={24} />;
      default: return <IconDeviceDesktop size={24} />;
    }
  };

  return (
    <Menu position="bottom-end" withArrow shadow="md">
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          size="md"
          radius="xl"
          aria-label="Toggle color scheme"
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {getToggleIcon()}
        </ActionIcon>
      </Menu.Target>
      
      <Menu.Dropdown>
        <Menu.Label>Theme</Menu.Label>
        <Menu.Item
          leftSection={<IconSun size={16} />}
          onClick={() => setColorScheme('light')}
        >
          Light
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={16} />}
          onClick={() => setColorScheme('dark')}
        >
          Dark
        </Menu.Item>
        <Menu.Item
          leftSection={<IconDeviceDesktop size={16} />}
          onClick={() => setColorScheme('auto')}
        >
          System
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
