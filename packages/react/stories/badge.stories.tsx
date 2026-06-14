import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../src/Badge";
import { Stack } from "../src/Stack";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: {
    children: "New",
    tone: "neutral",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {};

export const Tones: Story = {
  render: () => (
    <Stack direction="row" gap="2" wrap="yes">
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="primary">Primary</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
    </Stack>
  ),
};
