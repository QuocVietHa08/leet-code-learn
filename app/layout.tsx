import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';

import './global.css';
import '@mantine/notifications/styles.css';

import { Analytics } from '@vercel/analytics/react';
import { Notifications } from '@mantine/notifications';

export const metadata = {
  title: 'LeetCode Learn - Solve Coding Problems with AI Assistance',
  description:
    'Paste your LeetCode problem link and get instant solutions, explanations, and learning resources. Master algorithms and ace your technical interviews with LeetCode Learn.',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta property="og:image" content="https://leetcode-learn.vercel.app/og.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://leetcode-learn.vercel.app/og.png" />
        <meta name="twitter:image:type" content="image/png" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
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
        <Analytics />
      </body>
    </html>
  );
}
