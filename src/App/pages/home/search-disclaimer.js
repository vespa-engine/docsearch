import React from 'react';
import { Container, HoverCard, Stack, Text } from '@mantine/core';
import { Link } from 'App/libs/router';
import { fontWeightBold } from 'App/styles/common';

function DisclaimerDetails() {
  return (
    <HoverCard>
      <HoverCard.Target>
        <Text size="sm" underline span>
          privacy notice
        </Text>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Container size="sm">
          <Stack sx={(theme) => ({ color: theme.cr.getLowContrastText() })}>
            <Text align="left" weight={fontWeightBold}>
              Privacy notice
            </Text>
            <Text align="left">
              By entering a query, you consent to sharing it with OpenAI. The
              abstract you see is generated by an AI model, using your query and
              search results. Please be aware there might be potential
              inaccuracies or unintended bias in the abstracts. The abstracts
              are not a substitute for medical, legal, financial, or other
              professional advice. Familiarize yourself with OpenAI&apos;s{' '}
              <Link to="https://openai.com/policies/terms-of-use">
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link to="https://openai.com/policies/privacy-policy">
                Privacy Policy
              </Link>
              . Prefer a traditional search? Please check{' '}
              <Link to="https://docs.vespa.ai">docs.search.ai</Link>.
            </Text>
          </Stack>
        </Container>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
export function SearchDisclaimer() {
  return (
    <Stack px="lg" justify="c">
      <Text size="sm" color="dimmed" align="center">
        By querying, you consent to share data with OpenAI. The AI-generated
        abstract may have biases or inaccuracies. See <DisclaimerDetails /> for
        more details. For the traditional search{' '}
        <Link to="https://docs.vespa.ai">docs.search.ai</Link>.
      </Text>
    </Stack>
  );
}
