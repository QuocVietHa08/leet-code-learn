'use client';

import { Box, Paper, Skeleton, Text, Title } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import './ProblemDescription.css';

type ProblemDescriptionProps = {
  loading: boolean;
  problemData: {
    id: string;
    title: string;
    difficulty: string;
    content: string;
  };
};

export function ProblemDescription({ loading, problemData }: ProblemDescriptionProps) {
  return (
    <Paper p="md" withBorder mih="calc(100vh - 4rem)">
      {loading ? (
        <>
          <Skeleton height={30} width="70%" radius="xl" mb="md" />
          <Skeleton height={20} width="40%" radius="xl" mb="lg" />
          <Skeleton height={100} radius="md" mb="lg" />
          <Skeleton height={20} width="30%" radius="xl" mb="md" />
          <Skeleton height={80} radius="md" mb="md" />
          <Skeleton height={80} radius="md" mb="md" />
        </>
      ) : (
        <>
          <Title order={2} size="h3" mb="xs">
            {problemData.id}. {problemData.title}
          </Title>

          <Text size="sm" fw={500} c="dimmed" mb="md">
            Difficulty: {problemData.difficulty}
          </Text>

          <Box mb="lg" className="problem-content" style={{ lineHeight: 1.6 }}>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ inline, children, }: any) => {
                  return inline ? (
                    <code style={{
                      backgroundColor: '#000a2008',
                      borderColor: '#0000000d',
                      borderRadius: '5px',
                      borderWidth: '1px',
                      color: '#262626bf',
                      fontSize: '.75rem',
                      lineHeight: '1rem',
                      padding: '.125rem',
                      whiteSpace: 'pre-wrap'
                    }}>{children}</code>
                  ) : (
                    <code style={{
                      backgroundColor: '#000a2008',
                      borderColor: '#0000000d',
                      borderRadius: '5px',
                      borderWidth: '1px',
                      color: '#262626bf',
                      fontSize: '.75rem',
                      lineHeight: '1rem',
                      padding: '.125rem',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }: any) => <pre style={{
                  borderColor: '#0000000d',
                  borderLeftWidth: '2px',
                  color: '#262626bf',
                  fontFamily: 'Menlo, sans-serif',
                  fontSize: '.875rem',
                  lineHeight: '1.25rem',
                  marginBottom: '1rem',
                  marginTop: '1rem',
                  overflow: 'visible',
                  paddingLeft: '1rem',
                  whiteSpace: 'pre-wrap'
                }}>{children}</pre>,
                p: ({ children }: any) => <Text mb="md">{children}</Text>,
                strong: ({ children }: any) => <Text fw={700}>{children}</Text>,
                h1: ({ children }: any) => <Title order={1} mb="md">{children}</Title>,
                h2: ({ children }: any) => <Title order={2} mb="md">{children}</Title>,
                h3: ({ children }: any) => <Title order={3} mb="md">{children}</Title>,
                h4: ({ children }: any) => <Title order={4} mb="md">{children}</Title>,
                h5: ({ children }: any) => <Title order={5} mb="md">{children}</Title>,
                h6: ({ children }: any) => <Title order={6} mb="md">{children}</Title>,
                ul: ({ children }: any) => <Box component="ul" ml="md" mb="md">{children}</Box>,
                ol: ({ children }: any) => <Box component="ol" ml="md" mb="md">{children}</Box>,
                li: ({ children }: any) => <Box component="li" mb="xs">{children}</Box>,
                table: ({ children }: any) => (
                  <Paper withBorder p="xs" mb="md">
                    <Box component="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                      {children}
                    </Box>
                  </Paper>
                ),
                tr: ({ children }: any) => <Box component="tr">{children}</Box>,
                td: ({ children }: any) => <Box component="td" p="xs" style={{ border: '1px solid #eee' }}>{children}</Box>,
                th: ({ children }: any) => <Box component="th" p="xs" style={{ border: '1px solid #eee', background: '#f9f9f9' }}>{children}</Box>,
              }}
            >
              {problemData.content}
            </ReactMarkdown>
          </Box>
        </>
      )}
    </Paper>
  );
}
