import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "../src/Stack";
import { Text } from "../src/Text";
import { Heading } from "../src/Heading";
import { Box } from "../src/Box";

const meta: Meta<typeof Stack> = {
  title: "Primitives/Layout",
};

export default meta;
type Story = StoryObj;

export const StackExample: Story = {
  render: () => (
    <Stack gap="3" style={{ width: 280 }}>
      <Heading level="3">Stack layout</Heading>
      <Text tone="muted">Gap, direction, and alignment variants compose every screen.</Text>
      <Stack direction="row" gap="2">
        <Box padding="3" radius="md" background="raised">
          <Text size="sm">One</Text>
        </Box>
        <Box padding="3" radius="md" background="raised">
          <Text size="sm">Two</Text>
        </Box>
        <Box padding="3" radius="md" background="raised">
          <Text size="sm">Three</Text>
        </Box>
      </Stack>
    </Stack>
  ),
};

export const Typography: Story = {
  render: () => (
    <Stack gap="2" style={{ width: 320 }}>
      <Heading level="1">Heading 1</Heading>
      <Heading level="2">Heading 2</Heading>
      <Heading level="3">Heading 3</Heading>
      <Text>Body text at the default size.</Text>
      <Text tone="muted">Muted supporting copy.</Text>
      <Text tone="primary" weight="medium">
        Emphasized primary text.
      </Text>
    </Stack>
  ),
};
