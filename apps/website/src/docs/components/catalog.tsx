import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Heading,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
} from "@arviahq/ui-react";
import { LivePreview } from "../../components/LivePreview";
import type { ComponentDoc, PropDefinition } from "./types";

const htmlAttrs = (element: string): PropDefinition => ({
  name: "...htmlProps",
  type: `${element}HTMLAttributes`,
  description: `Standard ${element} attributes (id, style, aria-*, event handlers, etc.) are forwarded.`,
});

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    slug: "button",
    title: "Button",
    description: "Primary interactive control with tone and size variants, optional icon slot, and full button semantics.",
    importName: "Button",
    props: [
      { name: "tone", type: '"primary" | "secondary" | "ghost" | "danger"', default: '"primary"', description: "Visual style of the button." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Padding and font size." },
      { name: "icon", type: "ReactNode", description: "Optional leading icon rendered in the icon slot." },
      { name: "children", type: "ReactNode", description: "Button label content." },
      { name: "disabled", type: "boolean", description: "Disables interaction and applies disabled styles." },
      { name: "type", type: '"button" | "submit" | "reset"', default: '"button"', description: "Native button type." },
      { name: "className", type: "string", description: "Additional CSS class merged onto the root element." },
      htmlAttrs("Button"),
    ],
    usage: `import { Button } from "@arviahq/ui-react";

<Button tone="primary" size="md" icon="✦">
  Save changes
</Button>`,
    Preview: () => <Button tone="primary">Save changes</Button>,
    Examples: () => (
      <>
        <LivePreview label="Tones">
          <Stack direction="row" gap="2" wrap="yes">
            <Button tone="primary">Primary</Button>
            <Button tone="secondary">Secondary</Button>
            <Button tone="ghost">Ghost</Button>
            <Button tone="danger">Danger</Button>
          </Stack>
        </LivePreview>
        <LivePreview label="Sizes">
          <Stack direction="row" gap="2" align="center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Stack>
        </LivePreview>
      </>
    ),
  },
  {
    slug: "badge",
    title: "Badge",
    description: "Compact label for status, counts, and categories.",
    importName: "Badge",
    props: [
      { name: "tone", type: '"neutral" | "primary" | "success" | "warning" | "danger"', default: '"neutral"', description: "Semantic color of the badge." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Font size and padding." },
      { name: "children", type: "ReactNode", description: "Badge label text." },
      { name: "className", type: "string", description: "Additional CSS class on the root span." },
      htmlAttrs("HTML"),
    ],
    usage: `import { Badge } from "@arviahq/ui-react";

<Badge tone="success">Active</Badge>`,
    Preview: () => <Badge tone="primary">New</Badge>,
    Examples: () => (
      <LivePreview label="Tones">
        <Stack direction="row" gap="2" wrap="yes">
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="primary">Primary</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
        </Stack>
      </LivePreview>
    ),
  },
  {
    slug: "box",
    title: "Box",
    description: "Universal layout primitive — a polymorphic container with padding, radius, and background variants.",
    importName: "Box",
    props: [
      { name: "padding", type: '"none" | "1" | "2" | "3" | "4" | "5" | "6"', default: '"none"', description: "Inner padding from the space scale." },
      { name: "radius", type: '"none" | "sm" | "md" | "lg" | "xl" | "full"', default: '"none"', description: "Border radius token." },
      { name: "background", type: '"transparent" | "surface" | "raised" | "muted"', default: '"transparent"', description: "Background color token." },
      { name: "as", type: "ElementType", default: '"div"', description: "Polymorphic element to render." },
      { name: "children", type: "ReactNode", description: "Child content." },
      { name: "className", type: "string", description: "Additional CSS class on the root element." },
      htmlAttrs("HTML"),
    ],
    usage: `import { Box } from "@arviahq/ui-react";

<Box padding="4" radius="md" background="raised">
  Content
</Box>`,
    Preview: () => (
      <Box padding="4" radius="md" background="raised">
        <Text size="sm">Raised surface</Text>
      </Box>
    ),
  },
  {
    slug: "stack",
    title: "Stack",
    description: "Flexbox layout primitive for vertical or horizontal stacks with gap, alignment, and wrap control.",
    importName: "Stack",
    props: [
      { name: "direction", type: '"row" | "column"', default: '"column"', description: "Flex direction." },
      { name: "gap", type: '"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"', default: '"3"', description: "Gap between children from the space scale." },
      { name: "align", type: '"start" | "center" | "end" | "stretch" | "baseline"', default: '"stretch"', description: "align-items value." },
      { name: "justify", type: '"start" | "center" | "end" | "between" | "around"', default: '"start"', description: "justify-content value." },
      { name: "wrap", type: '"yes" | "no"', default: '"no"', description: "Whether flex items wrap." },
      { name: "as", type: "ElementType", default: '"div"', description: "Polymorphic element to render." },
      { name: "children", type: "ReactNode", description: "Child elements." },
      { name: "className", type: "string", description: "Additional CSS class on the root element." },
      htmlAttrs("HTML"),
    ],
    usage: `import { Stack } from "@arviahq/ui-react";

<Stack direction="column" gap="4">
  <Text>One</Text>
  <Text>Two</Text>
</Stack>`,
    Preview: () => (
      <Stack gap="2" style={{ width: 200 }}>
        <Box padding="2" radius="sm" background="muted"><Text size="sm">Item 1</Text></Box>
        <Box padding="2" radius="sm" background="muted"><Text size="sm">Item 2</Text></Box>
        <Box padding="2" radius="sm" background="muted"><Text size="sm">Item 3</Text></Box>
      </Stack>
    ),
    Examples: () => (
      <LivePreview label="Horizontal">
        <Stack direction="row" gap="2">
          <Box padding="2" radius="sm" background="raised"><Text size="sm">A</Text></Box>
          <Box padding="2" radius="sm" background="raised"><Text size="sm">B</Text></Box>
          <Box padding="2" radius="sm" background="raised"><Text size="sm">C</Text></Box>
        </Stack>
      </LivePreview>
    ),
  },
  {
    slug: "text",
    title: "Text",
    description: "Typography primitive with size, weight, and tone variants.",
    importName: "Text",
    props: [
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Font size token." },
      { name: "weight", type: '"regular" | "medium" | "semibold" | "bold"', default: '"regular"', description: "Font weight." },
      { name: "tone", type: '"default" | "muted" | "subtle" | "primary" | "danger" | "success"', default: '"default"', description: "Text color token." },
      { name: "as", type: "ElementType", default: '"p"', description: "Polymorphic element (p, span, label, etc.)." },
      { name: "children", type: "ReactNode", description: "Text content." },
      { name: "className", type: "string", description: "Additional CSS class on the root element." },
      htmlAttrs("HTML"),
    ],
    usage: `import { Text } from "@arviahq/ui-react";

<Text size="md" tone="muted">Supporting copy</Text>`,
    Preview: () => <Text>Body text at the default size.</Text>,
    Examples: () => (
      <LivePreview label="Tones">
        <Stack gap="2">
          <Text tone="default">Default text</Text>
          <Text tone="muted">Muted text</Text>
          <Text tone="primary">Primary text</Text>
          <Text tone="danger">Danger text</Text>
        </Stack>
      </LivePreview>
    ),
  },
  {
    slug: "heading",
    title: "Heading",
    description: "Semantic heading styles mapped to h1–h6 elements via the level variant.",
    importName: "Heading",
    props: [
      { name: "level", type: '"1" | "2" | "3" | "4" | "5" | "6"', default: '"2"', description: "Heading level — renders the matching h1–h6 element." },
      { name: "tone", type: '"default" | "muted" | "primary"', default: '"default"', description: "Text color token." },
      { name: "children", type: "ReactNode", description: "Heading text." },
      { name: "className", type: "string", description: "Additional CSS class on the heading element." },
    ],
    usage: `import { Heading } from "@arviahq/ui-react";

<Heading level="2">Page title</Heading>`,
    Preview: () => <Heading level="2">Page title</Heading>,
    Examples: () => (
      <LivePreview label="Levels">
        <Stack gap="2">
          <Heading level="1">Heading 1</Heading>
          <Heading level="2">Heading 2</Heading>
          <Heading level="3">Heading 3</Heading>
        </Stack>
      </LivePreview>
    ),
  },
  {
    slug: "link",
    title: "Link",
    description: "Inline navigation link with tone and size variants.",
    importName: "Link",
    props: [
      { name: "tone", type: '"primary" | "muted" | "danger"', default: '"primary"', description: "Link color style." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Font size." },
      { name: "href", type: "string", description: "Destination URL." },
      { name: "children", type: "ReactNode", description: "Link text." },
      { name: "className", type: "string", description: "Additional CSS class on the anchor." },
      htmlAttrs("Anchor"),
    ],
    usage: `import { Link } from "@arviahq/ui-react";

<Link href="/docs" tone="primary">Read the docs</Link>`,
    Preview: () => <Link href="#">Primary link</Link>,
    Examples: () => (
      <LivePreview label="Tones">
        <Stack direction="row" gap="3">
          <Link href="#">Primary</Link>
          <Link href="#" tone="muted">Muted</Link>
          <Link href="#" tone="danger">Danger</Link>
        </Stack>
      </LivePreview>
    ),
  },
  {
    slug: "card",
    title: "Card",
    description: "Raised surface container with configurable padding and shadow.",
    importName: "Card",
    props: [
      { name: "padding", type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: "Inner padding." },
      { name: "shadow", type: '"none" | "sm" | "md" | "lg"', default: '"sm"', description: "Box shadow elevation." },
      { name: "children", type: "ReactNode", description: "Card content." },
      { name: "className", type: "string", description: "Additional CSS class on the root div." },
      htmlAttrs("HTML"),
    ],
    usage: `import { Card, Text } from "@arviahq/ui-react";

<Card padding="lg" shadow="md">
  <Text>Card content</Text>
</Card>`,
    Preview: () => (
      <Card padding="lg" shadow="md" style={{ width: 280 }}>
        <Stack gap="2">
          <Text weight="semibold">Card title</Text>
          <Text size="sm" tone="muted">Supporting description text.</Text>
        </Stack>
      </Card>
    ),
  },
  {
    slug: "input",
    title: "Input",
    description: "Text field with size variants and built-in focus, disabled, and invalid states.",
    importName: "Input",
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height and font size. Named size — not the native HTML size attribute." },
      { name: "placeholder", type: "string", description: "Placeholder text." },
      { name: "disabled", type: "boolean", description: "Disables the input." },
      { name: "aria-invalid", type: '"true" | "false"', description: 'Set to "true" for error styling.' },
      { name: "type", type: "string", default: '"text"', description: "Native input type (text, email, password, etc.)." },
      { name: "className", type: "string", description: "Additional CSS class on the input element." },
      { name: "...inputProps", type: "InputHTMLAttributes", description: "Standard input attributes are forwarded." },
    ],
    usage: `import { Input } from "@arviahq/ui-react";

<Input placeholder="you@example.com" type="email" size="md" />`,
    Preview: () => <Input placeholder="Email address" type="email" style={{ width: 280 }} />,
    Examples: () => (
      <>
        <LivePreview label="States">
          <Stack gap="3" style={{ width: 280 }}>
            <Input placeholder="Default" />
            <Input placeholder="Disabled" disabled />
            <Input placeholder="Invalid" aria-invalid="true" />
          </Stack>
        </LivePreview>
      </>
    ),
  },
  {
    slug: "divider",
    title: "Divider",
    description: "Horizontal rule for separating content sections.",
    importName: "Divider",
    props: [
      { name: "spacing", type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: "Vertical margin around the rule." },
      { name: "className", type: "string", description: "Additional CSS class on the hr element." },
      htmlAttrs("HTML"),
    ],
    usage: `import { Divider } from "@arviahq/ui-react";

<Divider spacing="md" />`,
    Preview: () => (
      <div style={{ width: 280 }}>
        <Text size="sm">Above</Text>
        <Divider spacing="md" />
        <Text size="sm">Below</Text>
      </div>
    ),
  },
  {
    slug: "spinner",
    title: "Spinner",
    description: "Loading indicator with accessible status role and configurable size.",
    importName: "Spinner",
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Spinner dimensions." },
      { name: "label", type: "string", default: '"Loading"', description: "Accessible label via aria-label." },
      { name: "className", type: "string", description: "Additional CSS class on the span." },
      htmlAttrs("HTML"),
    ],
    usage: `import { Spinner } from "@arviahq/ui-react";

<Spinner size="md" label="Loading results" />`,
    Preview: () => <Spinner size="md" />,
    Examples: () => (
      <LivePreview label="Sizes">
        <Stack direction="row" gap="3" align="center">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </Stack>
      </LivePreview>
    ),
  },
];

export const componentBySlug = Object.fromEntries(
  COMPONENT_DOCS.map((doc) => [doc.slug, doc]),
) as Record<string, ComponentDoc>;

export const COMPONENT_SLUGS = COMPONENT_DOCS.map((doc) => doc.slug);
