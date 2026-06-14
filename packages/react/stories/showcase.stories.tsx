import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../src/Card";
import { Stack } from "../src/Stack";
import { Heading } from "../src/Heading";
import { Text } from "../src/Text";
import { Button } from "../src/Button";
import { Input } from "../src/Input";
import { Link } from "../src/Link";
import { Divider } from "../src/Divider";
import { Spinner } from "../src/Spinner";

const meta: Meta = {
  title: "Overview/Showcase",
};

export default meta;
type Story = StoryObj;

export const FormCard: Story = {
  render: () => (
    <Card padding="lg" shadow="md" style={{ width: 360 }}>
      <Stack gap="4">
        <Stack gap="1">
          <Heading level="4">Create account</Heading>
          <Text tone="muted" size="sm">
            Start with your email and a secure password.
          </Text>
        </Stack>
        <Stack gap="3">
          <Stack gap="1">
            <Text size="sm" weight="medium">
              Email
            </Text>
            <Input placeholder="you@example.com" type="email" />
          </Stack>
          <Stack gap="1">
            <Text size="sm" weight="medium">
              Password
            </Text>
            <Input placeholder="••••••••" type="password" />
          </Stack>
        </Stack>
        <Divider spacing="none" />
        <Stack direction="row" gap="2" justify="between" align="center">
          <Link href="#" tone="muted" size="sm">
            Need help?
          </Link>
          <Button>Continue</Button>
        </Stack>
      </Stack>
    </Card>
  ),
};

export const Loading: Story = {
  render: () => (
    <Stack direction="row" gap="3" align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Stack>
  ),
};
