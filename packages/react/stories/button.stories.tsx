import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/Button";
import { Stack } from "../src/Stack";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Save changes",
    size: "md",
    tone: "primary",
  },
  argTypes: {
    tone: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { tone: "secondary" },
};

export const Ghost: Story = {
  args: { tone: "ghost" },
};

export const Danger: Story = {
  args: { tone: "danger", children: "Delete" },
};

export const WithIcon: Story = {
  args: { icon: "✦", children: "Continue" },
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="3" align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
