import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import './global.css'
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

export const metadata = {
  title: 'LeetCode Learn - Solve Coding Problems with AI Assistance',
  description: 'Paste your LeetCode problem link and get instant solutions, explanations, and learning resources. Master algorithms and ace your technical interviews with LeetCode Learn.',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
        <Notifications />
          {children}
          </MantineProvider>
      </body>
    </html>
  );
}
